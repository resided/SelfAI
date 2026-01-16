'use client';

import { useState, useEffect, useRef, createContext, useContext, ReactNode } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { create } from 'zustand';
import { 
  Sparkles, Zap, Shield, Users, TrendingUp, Clock, Globe, Cpu, 
  Brain, MessageSquare, BarChart3, Settings, Plus, Search, Filter,
  ChevronRight, X, Check, Star, Flame, Target, Lightbulb,
  Share2, Heart, MessageCircle, Repeat, MoreHorizontal, ArrowUpRight
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// ============================================
// TYPES
// ============================================

interface Companion {
  token_id: number;
  name: string;
  personality: string;
  system_prompt: string;
  total_interactions: number;
  access_tier: number;
  expertise: string[];
  owner_fid: number;
  created_at: string;
  is_approved?: boolean;
}

interface TrendingTopic {
  id: string;
  topic: string;
  engagement_count: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  trending_score: number;
  cast_preview: string;
}

interface User {
  fid: number;
  username: string;
  avatar?: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

// ============================================
// STATE MANAGEMENT (Zustand)
// ============================================

interface SelfAIStore {
  companions: Companion[];
  activeCompanion: Companion | null;
  setActiveCompanion: (companion: Companion | null) => void;
  addCompanion: (companion: Companion) => void;
  updateCompanion: (id: number, updates: Partial<Companion>) => void;
  
  view: 'landing' | 'create' | 'dashboard' | 'marketplace' | 'analytics' | 'settings';
  setView: (view: SelfAIStore['view']) => void;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  
  mintForm: {
    name: string;
    personality: string;
    expertise: string[];
    access_tier: number;
    goals: string[];
  };
  setMintForm: (form: Partial<SelfAIStore['mintForm']>) => void;
  resetMintForm: () => void;
  
  metrics: {
    total_posts: number;
    total_replies: number;
    engagement_rate: number;
    followers_gained: number;
  };
  updateMetrics: (metrics: Partial<SelfAIStore['metrics']>) => void;
}

const defaultMintForm = {
  name: '',
  personality: 'helpful',
  expertise: [] as string[],
  access_tier: 1 as 1 | 2 | 3,
  goals: [] as string[],
};

export const useSelfAI = create<SelfAIStore>((set) => ({
  companions: [],
  activeCompanion: null,
  setActiveCompanion: (companion) => set({ activeCompanion: companion }),
  addCompanion: (companion) => set((state) => ({ 
    companions: [...state.companions, companion],
    activeCompanion: companion 
  })),
  updateCompanion: (id, updates) => set((state) => ({
    companions: state.companions.map(c => c.token_id === id ? { ...c, ...updates } : c)
  })),
  
  view: 'landing',
  setView: (view) => set({ view }),
  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  
  mintForm: defaultMintForm,
  setMintForm: (form) => set((state) => ({ 
    mintForm: { ...state.mintForm, ...form } 
  })),
  resetMintForm: () => set({ mintForm: defaultMintForm }),
  
  metrics: {
    total_posts: 0,
    total_replies: 0,
    engagement_rate: 0,
    followers_gained: 0,
  },
  updateMetrics: (metrics) => set((state) => ({
    metrics: { ...state.metrics, ...metrics }
  })),
}));

// ============================================
// API HOOKS (TanStack Query)
// ============================================

function useTrendingTopics() {
  return useQuery({
    queryKey: ['trending'],
    queryFn: async () => {
      const res = await fetch('/api/trending');
      return res.json() as Promise<TrendingTopic[]>;
    },
    refetchInterval: 30000,
  });
}

function useCompanions() {
  return useQuery({
    queryKey: ['companions'],
    queryFn: async () => {
      const res = await fetch('/api/companions');
      return res.json() as Promise<Companion[]>;
    },
  });
}

function useMintCompanion() {
  const queryClient = useQueryClient();
  const { resetMintForm } = useSelfAI();
  
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch('/api/companions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companions'] });
      resetMintForm();
    },
  });
}

function useAIInteraction() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: { token_id: number; action_type: number; context?: string }) => {
      const res = await fetch('/api/interact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companions'] });
    },
  });
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function Home() {
  const { view, setView, sidebarOpen, toggleSidebar, metrics, updateMetrics } = useSelfAI();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  
  useEffect(() => {
    updateMetrics({
      total_posts: 127,
      total_replies: 342,
      engagement_rate: 8.7,
      followers_gained: 89,
    });
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen animated-bg relative overflow-x-hidden">
      <div className="noise-overlay" />
      
      <div className="mesh-bg">
        <div className="mesh-blob mesh-blob-1" />
        <div className="mesh-blob mesh-blob-2" />
        <div className="mesh-blob mesh-blob-3" />
      </div>

      <motion.div 
        className="fixed inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-full bg-gradient-to-b from-transparent via-purple-500/10 to-transparent"
            style={{ left: `${15 + i * 17}%` }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      <Navigation toggleSidebar={toggleSidebar} />

      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {view === 'landing' && <LandingView key="landing" onCreate={() => setView('create')} onMarketplace={() => setView('marketplace')} />}
          {view === 'create' && <CreateView key="create" onBack={() => setView('landing')} />}
          {view === 'dashboard' && <DashboardView key="dashboard" />}
          {view === 'marketplace' && <MarketplaceView key="marketplace" />}
          {view === 'analytics' && <AnalyticsView key="analytics" />}
          {view === 'settings' && <SettingsView key="settings" />}
        </AnimatePresence>
      </div>
    </main>
  );
}

// ============================================
// NAVIGATION
// ============================================

function Navigation({ toggleSidebar }: { toggleSidebar: () => void }) {
  const { view, setView, companions, sidebarOpen } = useSelfAI();
  
  const navItems = [
    { key: 'landing', label: 'Home', icon: Sparkles },
    { key: 'create', label: 'Create', icon: Plus },
    { key: 'dashboard', label: 'Dashboard', icon: Cpu },
    { key: 'marketplace', label: 'Market', icon: Globe },
    { key: 'analytics', label: 'Analytics', icon: BarChart3 },
    { key: 'settings', label: 'Settings', icon: Settings },
  ] as const;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setView('landing')}
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center border border-white/10">
                <img src="/logo.svg" alt="SelfAI" className="w-6 h-6" />
              </div>
              <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/30 to-cyan-500/30 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold tracking-tight">SelfAI</h1>
              <p className="text-xs text-white/40">AI Agent</p>
            </div>
          </motion.div>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = view === item.key;
              return (
                <motion.button
                  key={item.key}
                  onClick={() => setView(item.key)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all rounded-lg ${
                    isActive ? 'text-white' : 'text-white/50 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 bg-white/10 rounded-lg border border-white/10"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </span>
                </motion.button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {companions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20"
              >
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-green-400">{companions.length} Active</span>
              </motion.div>
            )}
            
            <motion.button
              onClick={() => setView('create')}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="w-4 h-4" />
              Create AI
            </motion.button>

            <motion.button
              onClick={toggleSidebar}
              className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10"
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-5 h-5 flex flex-col gap-1.5">
                <span className="h-0.5 w-full bg-white/60 rounded" />
                <span className="h-0.5 w-2/3 bg-white/60 rounded" />
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="fixed inset-y-0 left-0 w-72 glass border-r border-white/10 z-50 md:hidden"
          >
            <div className="p-6 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.key}
                    onClick={() => {
                      setView(item.key);
                      toggleSidebar();
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      view === item.key 
                        ? 'bg-purple-500/20 text-purple-300' 
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// ============================================
// LANDING VIEW
// ============================================

function LandingView({ onCreate, onMarketplace }: { onCreate: () => void; onMarketplace: () => void }) {
  const { data: trending } = useTrendingTopics();
  const { companions } = useSelfAI();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      className="space-y-20"
    >
      <section className="text-center max-w-4xl mx-auto pt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass border border-white/10 mb-8"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500" />
          </span>
          <span className="text-sm text-white/70">Now on Base Network</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
        >
          <span className="gradient-text">Your AI Agent</span>
          <br />
          <span className="text-white/40">That Actually Works</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Create intelligent AI agents that post, engage, and grow your presence on 
          Faracster. Powered by advanced language models with full customization.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            onClick={onCreate}
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-lg overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Create Your AI
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>
          <motion.button
            onClick={onMarketplace}
            className="px-8 py-4 rounded-xl font-medium text-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Globe className="w-5 h-5" />
            Explore Marketplace
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-8 sm:gap-12 mt-12 pt-8 border-t border-white/5"
        >
          {[
            { value: '10K+', label: 'Active Agents' },
            { value: '2.5M', label: 'Posts Made' },
            { value: '98%', label: 'Uptime' },
            { value: '50K+', label: 'Users' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs sm:text-sm text-white/40 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[
          { icon: Brain, title: 'Advanced AI Models', description: 'GPT-4, Claude, and custom models optimized for social engagement.', gradient: 'from-purple-500 to-pink-500' },
          { icon: Target, title: 'Smart Scheduling', description: 'Post at optimal times based on your audience activity patterns.', gradient: 'from-cyan-500 to-blue-500' },
          { icon: TrendingUp, title: 'Trend Detection', description: 'Automatically surface trending topics relevant to your niche.', gradient: 'from-orange-500 to-red-500' },
          { icon: Shield, title: 'Content Safety', description: 'Built-in moderation and human approval workflows.', gradient: 'from-green-500 to-emerald-500' },
          { icon: Users, title: 'Community Building', description: 'Engage with your community automatically and authentically.', gradient: 'from-indigo-500 to-purple-500' },
          { icon: BarChart3, title: 'Deep Analytics', description: 'Track engagement, growth, and sentiment in real-time.', gradient: 'from-pink-500 to-rose-500' },
        ].map((feature, i) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="group p-6 sm:p-8 rounded-3xl glass-light border border-white/5 hover:border-white/15 transition-all cursor-pointer card-hover"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 opacity-80 group-hover:opacity-100 transition-opacity`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-white/50 leading-relaxed">{feature.description}</p>
            </motion.div>
          );
        })}
      </section>

      <section className="glass rounded-3xl p-8 border border-white/10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Flame className="w-6 h-6 text-orange-500" />
              Trending Now
            </h2>
            <p className="text-white/40 mt-1">Hot topics on Faracster right now</p>
          </div>
          <div className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            Live
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trending?.slice(0, 8).map((topic, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
              className="group p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/15 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-medium text-purple-400">#{i + 1}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  topic.sentiment === 'positive' ? 'bg-green-500/20 text-green-400' :
                  topic.sentiment === 'negative' ? 'bg-red-500/20 text-red-400' :
                  'bg-white/10 text-white/50'
                }`}>
                  {topic.sentiment}
                </span>
              </div>
              <p className="text-sm text-white/70 line-clamp-3 mb-3">{topic.topic}</p>
              <div className="flex items-center justify-between text-xs text-white/30">
                <span className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  {topic.engagement_count}
                </span>
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        <p className="text-white/40 mb-12 max-w-xl mx-auto">Create your AI agent in three simple steps</p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: '01', title: 'Customize', desc: 'Choose personality, expertise, and goals for your AI' },
            { step: '02', title: 'Train', desc: 'AI learns your style and preferences over time' },
            { step: '03', title: 'Scale', desc: 'Watch your presence grow while AI handles engagement' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * i }}
              className="relative"
            >
              {i < 2 && (
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-px bg-gradient-to-r from-purple-500/50 to-transparent" />
              )}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl glass border border-white/10 flex items-center justify-center text-2xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-white/40 text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl p-12 text-center"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-cyan-600/20" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-4">Ready to Scale?</h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto">
            Join thousands of creators who are using SelfAI to grow their Faracster presence
          </p>
          <motion.button
            onClick={onCreate}
            className="px-8 py-4 bg-white text-black rounded-xl font-semibold text-lg hover:bg-white/90 transition-colors inline-flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started Free
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.section>
    </motion.div>
  );
}

// ============================================
// CREATE VIEW
// ============================================

function CreateView({ onBack }: { onBack: () => void }) {
  const { mintForm, setMintForm, resetMintForm } = useSelfAI();
  const mintMutation = useMintCompanion();
  const [step, setStep] = useState(0);
  
  const personalities = [
    { value: 'helpful', label: 'Helpful', desc: 'Friendly & supportive', color: 'green' },
    { value: 'witty', label: 'Witty', desc: 'Clever & humorous', color: 'yellow' },
    { value: 'analytical', label: 'Analytical', desc: 'Data-driven & precise', color: 'blue' },
    { value: 'bold', label: 'Bold', desc: 'Direct & challenging', color: 'red' },
    { value: 'creative', label: 'Creative', desc: 'Artistic & inspiring', color: 'purple' },
  ] as const;

  const expertises = ['Web3', 'DeFi', 'AI', 'Crypto', 'Gaming', 'NFTs', 'DAO', 'Trading', 'Memes', 'News', 'Tech', 'Finance'];
  const goals = ['Grow Audience', 'Engage Community', 'Share Insights', 'Automate Posts', 'Build Brand', 'Drive Traffic'];

  const canProceed = () => {
    if (step === 0) return mintForm.name.length >= 2;
    if (step === 1) return mintForm.personality && mintForm.expertise.length > 0;
    if (step === 2) return mintForm.goals.length > 0;
    return true;
  };

  const handleMint = async () => {
    const result = await mintMutation.mutateAsync({
      ...mintForm,
      system_prompt: `You are ${mintForm.name}, a ${mintForm.personality} AI agent. Expertise: ${mintForm.expertise.join(', ')}. Goals: ${mintForm.goals.join(', ')}.`,
      fid: 12345,
    });
    if (result.success) {
      resetMintForm();
      onBack();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      className="max-w-3xl mx-auto"
    >
      <div className="flex items-center gap-2 mb-8">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex-1 h-1 rounded-full overflow-hidden bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ width: '0%' }}
              animate={{ width: i <= step ? '100%' : '0%' }}
              transition={{ duration: 0.3 }}
            />
          </div>
        ))}
      </div>

      <motion.button
        onClick={step === 0 ? onBack : () => setStep(s => s - 1)}
        className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-8"
        whileHover={{ x: -5 }}
      >
        <ChevronRight className="w-4 h-4 rotate-180" />
        Back
      </motion.button>

      <div className="glass rounded-3xl p-8 sm:p-10 border border-white/10">
        {step === 0 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-3xl font-bold mb-2">Name Your AI</h2>
            <p className="text-white/40 mb-8">Give your AI agent a memorable name</p>
            
            <div className="relative mb-8">
              <input
                type="text"
                value={mintForm.name}
                onChange={(e) => setMintForm({ name: e.target.value })}
                placeholder="e.g., CryptoMate, DeFi Wizard, Web3 Insights"
                className="w-full px-6 py-4 text-lg bg-white/5 rounded-2xl border border-white/10 focus:border-purple-500/50 outline-none transition-all"
                autoFocus
              />
              {mintForm.name && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-400" />
                  </div>
                </motion.div>
              )}
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-sm text-white/50">
                <span className="text-purple-400">Tip:</span> Choose a name that reflects your AI's purpose and expertise
              </p>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-3xl font-bold mb-2">Choose Personality</h2>
            <p className="text-white/40 mb-8">Define how your AI interacts with others</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
              {personalities.map((p) => (
                <motion.button
                  key={p.value}
                  onClick={() => setMintForm({ personality: p.value })}
                  className={`p-4 rounded-xl text-left transition-all border ${
                    mintForm.personality === p.value
                      ? `bg-${p.color}-500/20 border-${p.color}-500/50`
                      : 'bg-white/5 border-white/10 hover:border-white/30'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-sm font-medium mb-1">{p.label}</div>
                  <div className="text-xs text-white/40">{p.desc}</div>
                </motion.button>
              ))}
            </div>

            <h3 className="text-sm font-medium text-white/70 mb-4">Expertise Areas</h3>
            <div className="flex flex-wrap gap-2">
              {expertises.map((e) => (
                <motion.button
                  key={e}
                  onClick={() => {
                    const newExp = mintForm.expertise.includes(e)
                      ? mintForm.expertise.filter(x => x !== e)
                      : [...mintForm.expertise, e];
                    setMintForm({ expertise: newExp });
                  }}
                  className={`px-4 py-2 rounded-full text-sm transition-all border ${
                    mintForm.expertise.includes(e)
                      ? 'bg-purple-500/20 border-purple-500/50 text-purple-300'
                      : 'bg-white/5 border-white/10 hover:border-white/30'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {e}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-3xl font-bold mb-2">Set Goals</h2>
            <p className="text-white/40 mb-8">What do you want your AI to achieve?</p>
            
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {goals.map((g) => (
                <motion.button
                  key={g}
                  onClick={() => {
                    const newGoals = mintForm.goals.includes(g)
                      ? mintForm.goals.filter(x => x !== g)
                      : [...mintForm.goals, g];
                    setMintForm({ goals: newGoals });
                  }}
                  className={`p-4 rounded-xl text-left transition-all border ${
                    mintForm.goals.includes(g)
                      ? 'bg-cyan-500/20 border-cyan-500/50'
                      : 'bg-white/5 border-white/10 hover:border-white/30'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                      mintForm.goals.includes(g)
                        ? 'bg-cyan-500 border-cyan-500'
                        : 'border-white/30'
                    }`}>
                      {mintForm.goals.includes(g) && <Check className="w-3 h-3 text-black" />}
                    </div>
                    <span className="text-sm font-medium">{g}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            <h3 className="text-sm font-medium text-white/70 mb-4">Access Tier</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: 1, label: 'Private', desc: 'Only you' },
                { value: 2, label: 'Token', desc: 'SELFAI holders' },
                { value: 3, label: 'Public', desc: 'Everyone' },
              ].map((t) => (
                <motion.button
                  key={t.value}
                  onClick={() => setMintForm({ access_tier: t.value as 1 | 2 | 3 })}
                  className={`p-4 rounded-xl text-center transition-all border ${
                    mintForm.access_tier === t.value
                      ? 'bg-purple-500/20 border-purple-500/50'
                      : 'bg-white/5 border-white/10 hover:border-white/30'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="font-medium">{t.label}</div>
                  <div className="text-xs text-white/40 mt-1">{t.desc}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-3xl font-bold mb-2">Review & Create</h2>
            <p className="text-white/40 mb-8">Your AI is ready to be minted</p>
            
            <div className="space-y-4 mb-8">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-xs text-white/40 mb-1">Name</div>
                <div className="text-xl font-semibold">{mintForm.name}</div>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-xs text-white/40 mb-1">Personality</div>
                <div className="text-lg capitalize">{mintForm.personality}</div>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-xs text-white/40 mb-2">Expertise</div>
                <div className="flex flex-wrap gap-2">
                  {mintForm.expertise.map((e) => (
                    <span key={e} className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm">{e}</span>
                  ))}
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-xs text-white/40 mb-2">Goals</div>
                <div className="flex flex-wrap gap-2">
                  {mintForm.goals.map((g) => (
                    <span key={g} className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-sm">{g}</span>
                  ))}
                </div>
              </div>
            </div>

            <motion.button
              onClick={handleMint}
              disabled={mintMutation.isPending}
              className="w-full py-4 rounded-xl font-semibold text-lg relative overflow-hidden"
              style={{
                background: mintMutation.isPending ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, #c084fc, #a855f7)',
              }}
              whileHover={!mintMutation.isPending ? { scale: 1.02 } : {}}
              whileTap={!mintMutation.isPending ? { scale: 0.98 } : {}}
            >
              <span className="relative z-10">{mintMutation.isPending ? 'Creating...' : 'Mint Your AI Agent'}</span>
              {!mintMutation.isPending && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
              )}
            </motion.button>
          </motion.div>
        )}

        {step < 3 && (
          <div className="flex justify-end mt-8 pt-8 border-t border-white/10">
            <motion.button
              onClick={() => setStep(s => s + 1)}
              disabled={!canProceed()}
              className="px-8 py-3 rounded-xl font-medium bg-white text-black disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={canProceed() ? { scale: 1.02 } : {}}
              whileTap={canProceed() ? { scale: 0.98 } : {}}
            >
              Continue
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ============================================
// DASHBOARD VIEW
// ============================================

function DashboardView() {
  const { companions, activeCompanion, setActiveCompanion } = useSelfAI();
  const { data: companionsList } = useCompanions();
  const allCompanions = companionsList || companions;

  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <p className="text-white/40">Manage your AI agents</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-white/40">{allCompanions.length} agent{allCompanions.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Posts', value: '127', icon: MessageSquare, color: 'purple' },
          { label: 'Replies', value: '342', icon: MessageCircle, color: 'cyan' },
          { label: 'Engagement', value: '8.7%', icon: TrendingUp, color: 'green' },
          { label: 'Followers', value: '+89', icon: Users, color: 'pink' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="p-6 rounded-2xl glass border border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl bg-${stat.color}-500/20 flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 text-${stat.color}-400`} />
                </div>
                <span className="text-xs text-white/30">This week</span>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-white/40">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      {allCompanions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-3xl p-12 text-center border border-white/10"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
            <Brain className="w-10 h-10 text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold mb-3">No AI agents yet</h3>
          <p className="text-white/40 mb-8 max-w-md mx-auto">Create your first AI agent to start automating your Faracster presence</p>
          <motion.button
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-medium inline-flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-5 h-5" />
            Create AI Agent
          </motion.button>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {allCompanions.map((companion, i) => (
            <CompanionCard key={companion.token_id || i} companion={companion} />
          ))}
        </div>
      )}
    </motion.div>
  );
}

function CompanionCard({ companion }: { companion: Companion }) {
  const [showMenu, setShowMenu] = useState(false);
  const interactionMutation = useAIInteraction();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="group p-6 rounded-2xl glass border border-white/10 hover:border-white/20 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
            <img src="/logo.svg" alt={companion.name} className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{companion.name}</h3>
            <p className="text-sm text-white/40 capitalize">{companion.personality}</p>
          </div>
        </div>
        <div className="relative">
          <motion.button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <MoreHorizontal className="w-5 h-5 text-white/40" />
          </motion.button>
          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute right-0 top-full mt-2 w-40 p-2 rounded-xl glass border border-white/10 z-10"
              >
                {['Edit', 'Settings', 'Archive', 'Delete'].map((action) => (
                  <button key={action} className="w-full px-3 py-2 text-sm text-left hover:bg-white/5 rounded-lg transition-colors">{action}</button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {companion.expertise?.slice(0, 4).map((e: string) => (
          <span key={e} className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-white/50">{e}</span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex items-center gap-4 text-sm text-white/30">
          <span className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            {companion.total_interactions}
          </span>
          <span className={`px-2 py-0.5 rounded-full text-xs ${
            companion.access_tier === 1 ? 'bg-white/10 text-white/40' :
            companion.access_tier === 2 ? 'bg-cyan-500/20 text-cyan-400' :
            'bg-green-500/20 text-green-400'
          }`}>
            {companion.access_tier === 1 ? 'Private' : companion.access_tier === 2 ? 'Holders' : 'Public'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            onClick={() => interactionMutation.mutate({ token_id: companion.token_id, action_type: 1, context: 'Generate a post' })}
            className="p-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 transition-colors"
            whileTap={{ scale: 0.95 }}
            title="Generate Post"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
          </motion.button>
          <motion.button
            onClick={() => interactionMutation.mutate({ token_id: companion.token_id, action_type: 2, context: 'Reply to mention' })}
            className="p-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 transition-colors"
            whileTap={{ scale: 0.95 }}
            title="Reply"
          >
            <MessageSquare className="w-4 h-4 text-cyan-400" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// MARKETPLACE VIEW
// ============================================

function MarketplaceView() {
  const { data: companions } = useCompanions();

  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold">Marketplace</h2>
          <p className="text-white/40">Discover and trade AI agents</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search agents..."
              className="pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none text-sm w-64"
            />
          </div>
          <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <Filter className="w-4 h-4 text-white/40" />
          </button>
        </div>
      </div>

      <section className="mb-12">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          Featured Agents
        </h3>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {(companions || [...Array(6)]).map((companion, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="group relative overflow-hidden rounded-2xl glass border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                      <Brain className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{companion?.name || `AI Agent #${i + 1}`}</h4>
                      <p className="text-xs text-white/40">Created {companion?.created_at || '2 days ago'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm">4.9</span>
                  </div>
                </div>
                <p className="text-sm text-white/50 mb-4 line-clamp-2">
                  {companion?.personality || 'A sophisticated AI agent specialized in web3 and crypto discussions.'}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(companion?.expertise || ['Web3', 'DeFi', 'Crypto']).map((e: string) => (
                    <span key={e} className="text-xs px-2 py-1 rounded-full bg-white/5">{e}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-sm text-white/30">{companion?.total_interactions || 128} interactions</span>
                  <motion.button
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-sm font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Buy for 0.05 ETH
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}

// ============================================
// ANALYTICS VIEW
// ============================================

function AnalyticsView() {
  const { metrics } = useSelfAI();

  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }}>
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Analytics</h2>
        <p className="text-white/40">Track your AI's performance</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Posts', value: metrics.total_posts, change: '+12%', positive: true },
          { label: 'Total Replies', value: metrics.total_replies, change: '+8%', positive: true },
          { label: 'Engagement Rate', value: `${metrics.engagement_rate}%`, change: '+2.3%', positive: true },
          { label: 'Followers Gained', value: metrics.followers_gained, change: '+15%', positive: true },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className="p-6 rounded-2xl glass border border-white/10"
          >
            <div className="text-sm text-white/40 mb-2">{stat.label}</div>
            <div className="text-3xl font-bold mb-2">{stat.value}</div>
            <div className={`text-sm ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>{stat.change} from last week</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl glass border border-white/10">
          <h3 className="font-semibold mb-6">Engagement Over Time</h3>
          <div className="h-64 flex items-center justify-center">
            <div className="w-full h-full flex items-end gap-2">
              {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 80].map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-purple-500/50 to-purple-300/50 rounded-t-lg"
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="p-6 rounded-2xl glass border border-white/10">
          <h3 className="font-semibold mb-6">Top Topics</h3>
          <div className="space-y-4">
            {['Web3', 'DeFi', 'AI Agents', 'Base Network', 'NFTs'].map((topic, i) => (
              <div key={topic} className="flex items-center gap-4">
                <span className="text-sm text-white/40 w-6">{i + 1}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{topic}</span>
                    <span className="text-xs text-white/40">{100 - i * 15}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${100 - i * 15}%` }}
                      transition={{ delay: 0.2 + 0.1 * i, duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// SETTINGS VIEW
// ============================================

function SettingsView() {
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} className="max-w-2xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Settings</h2>
        <p className="text-white/40">Manage your account and preferences</p>
      </div>

      <div className="space-y-6">
        <div className="p-6 rounded-2xl glass border border-white/10">
          <h3 className="font-semibold mb-6">Profile</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-white/50 mb-2">Display Name</label>
              <input
                type="text"
                defaultValue="Your Name"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-white/50 mb-2">Bio</label>
              <textarea
                rows={3}
                defaultValue="Building on Faracster"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none resize-none"
              />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl glass border border-white/10">
          <h3 className="font-semibold mb-6">API Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-white/50 mb-2">OpenAI API Key</label>
              <input
                type="password"
                placeholder="sk-..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-white/50 mb-2">Neynar API Key</label>
              <input
                type="password"
                placeholder="..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none font-mono text-sm"
              />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl glass border border-white/10">
          <h3 className="font-semibold mb-6">Notifications</h3>
          <div className="space-y-4">
            {[
              { label: 'AI posts published', defaultChecked: true },
              { label: 'New followers', defaultChecked: true },
              { label: 'Weekly analytics report', defaultChecked: false },
              { label: 'Marketing updates', defaultChecked: false },
            ].map((item) => (
              <label key={item.label} className="flex items-center justify-between cursor-pointer">
                <span className="text-sm">{item.label}</span>
                <div className={`w-12 h-6 rounded-full relative transition-colors ${item.defaultChecked ? 'bg-purple-500' : 'bg-white/10'}`}>
                  <motion.div
                    className="absolute top-1 w-4 h-4 rounded-full bg-white"
                    animate={{ left: item.defaultChecked ? 'calc(100% - 20px)' : '4px' }}
                    transition={{ type: 'spring', bounce: 0.2 }}
                  />
                </div>
              </label>
            ))}
          </div>
        </div>

        <motion.button
          className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-purple-600 to-pink-600"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Save Changes
        </motion.button>
      </div>
    </motion.div>
  );
}
