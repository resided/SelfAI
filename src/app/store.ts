import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Agent {
  id: number;
  name: string;
  personality: string;
  expertise: string[];
  totalPosts: number;
  createdAt: string;
}

export interface PendingPost {
  id: number;
  agentId: number;
  content: string;
  createdAt: string;
}

interface AppState {
  // User
  isConnected: boolean;
  userFid: number | null;
  username: string | null;

  // Agents
  agents: Agent[];
  pendingPosts: PendingPost[];
  isGenerating: boolean;

  // Actions
  connect: (fid: number, username: string) => void;
  disconnect: () => void;
  addAgent: (agent: Omit<Agent, 'id' | 'totalPosts' | 'createdAt'>) => Agent;
  removeAgent: (id: number) => void;
  generatePost: (agentId: number, context?: string) => Promise<PendingPost | null>;
  approvePost: (postId: number) => Promise<boolean>;
  rejectPost: (postId: number) => void;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      isConnected: false,
      userFid: null,
      username: null,
      agents: [],
      pendingPosts: [],
      isGenerating: false,

      connect: (fid, username) => {
        set({ isConnected: true, userFid: fid, username });
      },

      disconnect: () => {
        set({ isConnected: false, userFid: null, username: null, agents: [], pendingPosts: [] });
      },

      addAgent: (agentData) => {
        const newAgent: Agent = {
          id: Date.now(),
          ...agentData,
          totalPosts: 0,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ agents: [...state.agents, newAgent] }));
        return newAgent;
      },

      removeAgent: (id) => {
        set((state) => ({
          agents: state.agents.filter((a) => a.id !== id),
          pendingPosts: state.pendingPosts.filter((p) => p.agentId !== id),
        }));
      },

      generatePost: async (agentId, context) => {
        const state = get();
        const agent = state.agents.find((a) => a.id === agentId);
        if (!agent) return null;

        set({ isGenerating: true });

        try {
          const response = await fetch(`${API_BASE}/api/interact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              token_id: agentId,
              user_fid: state.userFid,
              action_type: 1, // POST
              context: context || `Generate a post about ${agent.expertise.join(', ')}`,
            }),
          });

          const data = await response.json();

          if (data.content) {
            const pendingPost: PendingPost = {
              id: Date.now(),
              agentId,
              content: data.content,
              createdAt: new Date().toISOString(),
            };
            set((state) => ({ pendingPosts: [...state.pendingPosts, pendingPost] }));
            return pendingPost;
          }

          // Fallback: generate locally if API fails
          const fallbackPost: PendingPost = {
            id: Date.now(),
            agentId,
            content: generateFallbackPost(agent),
            createdAt: new Date().toISOString(),
          };
          set((state) => ({ pendingPosts: [...state.pendingPosts, fallbackPost] }));
          return fallbackPost;
        } catch (error) {
          // Generate fallback post on error
          const fallbackPost: PendingPost = {
            id: Date.now(),
            agentId,
            content: generateFallbackPost(agent),
            createdAt: new Date().toISOString(),
          };
          set((state) => ({ pendingPosts: [...state.pendingPosts, fallbackPost] }));
          return fallbackPost;
        } finally {
          set({ isGenerating: false });
        }
      },

      approvePost: async (postId) => {
        const state = get();
        const post = state.pendingPosts.find((p) => p.id === postId);
        if (!post) return false;

        const agent = state.agents.find((a) => a.id === post.agentId);
        if (!agent) return false;

        // Update agent stats
        set((state) => ({
          agents: state.agents.map((a) =>
            a.id === post.agentId ? { ...a, totalPosts: a.totalPosts + 1 } : a
          ),
          pendingPosts: state.pendingPosts.filter((p) => p.id !== postId),
        }));

        return true;
      },

      rejectPost: (postId) => {
        set((state) => ({
          pendingPosts: state.pendingPosts.filter((p) => p.id !== postId),
        }));
      },
    }),
    {
      name: 'selfai-storage',
      partialize: (state) => ({
        isConnected: state.isConnected,
        userFid: state.userFid,
        username: state.username,
        agents: state.agents,
      }),
    }
  )
);

function generateFallbackPost(agent: Agent): string {
  const templates = [
    `Exploring the intersection of ${agent.expertise[0] || 'tech'} and innovation. The future is being built right now.`,
    `Hot take: ${agent.expertise[0] || 'Web3'} adoption is accelerating faster than most realize. Here's why that matters...`,
    `Been diving deep into ${agent.expertise.slice(0, 2).join(' and ') || 'crypto'}. The signal-to-noise ratio is improving.`,
    `What most people miss about ${agent.expertise[0] || 'DeFi'}: it's not just technology, it's coordination at scale.`,
    `The ${agent.expertise[0] || 'AI'} space is moving fast. Building in public, learning in public.`,
  ];
  return templates[Math.floor(Math.random() * templates.length)];
}
