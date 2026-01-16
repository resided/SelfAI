'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu, Zap, Shield, Users, TrendingUp,
  ArrowRight, ArrowUpRight, Menu, X,
  BarChart3, Search, Plus, Check, Trash2,
  Sparkles, Copy, LogOut, Loader2
} from 'lucide-react';
import { useAppStore, Agent, PendingPost } from './store';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isConnected, username, connect, disconnect } = useAppStore();

  const handleConnect = () => {
    // Simulate Farcaster auth - in production use @farcaster/auth-kit
    const mockFid = Math.floor(Math.random() * 100000) + 1;
    const mockUsername = `user${mockFid}`;
    connect(mockFid, mockUsername);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-8">
              <span className="text-lg font-bold tracking-tight">SELFAI</span>
              <div className="hidden md:flex items-center gap-6">
                {['Home', 'Create', 'Dashboard'].map((item) => (
                  <button
                    key={item}
                    onClick={() => setActiveSection(item.toLowerCase())}
                    className={`text-sm tracking-wide transition-colors ${
                      activeSection === item.toLowerCase() ? 'text-white' : 'text-neutral-500 hover:text-white'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              {isConnected ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-neutral-400">@{username}</span>
                  <button
                    onClick={disconnect}
                    className="p-2 text-neutral-500 hover:text-white transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleConnect}
                  className="px-4 py-2 text-sm font-medium bg-white text-black hover:bg-neutral-200 transition-colors"
                >
                  Connect
                </button>
              )}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-neutral-900 bg-black"
            >
              <div className="px-6 py-4">
                {['Home', 'Create', 'Dashboard'].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setActiveSection(item.toLowerCase());
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-3 text-sm text-neutral-400 hover:text-white border-b border-neutral-900 last:border-0"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-14">
        <AnimatePresence mode="wait">
          {activeSection === 'home' && <HomeSection key="home" onGetStarted={() => setActiveSection('create')} />}
          {activeSection === 'create' && <CreateSection key="create" onComplete={() => setActiveSection('dashboard')} />}
          {activeSection === 'dashboard' && <DashboardSection key="dashboard" onCreate={() => setActiveSection('create')} />}
        </AnimatePresence>
      </main>
    </div>
  );
}

function HomeSection({ onGetStarted }: { onGetStarted: () => void }) {
  const stats = [
    { value: '12,847', label: 'ACTIVE AGENTS' },
    { value: '2.4M', label: 'POSTS CREATED' },
    { value: '8.7%', label: 'AVG ENGAGEMENT' },
    { value: '48.2K', label: 'TOTAL USERS' },
  ];

  const features = [
    { icon: Cpu, title: 'INTELLIGENCE', desc: 'AI-powered content generation that matches your voice and expertise.' },
    { icon: Zap, title: 'SPEED', desc: 'Generate posts instantly. Review and approve in seconds.' },
    { icon: Shield, title: 'CONTROL', desc: 'Nothing posts without your approval. You stay in control.' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Hero */}
      <section className="min-h-[90vh] flex items-center border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 mb-8">
                <span className="status-dot" />
                <span className="text-xs tracking-widest text-neutral-500 uppercase">Live on Base</span>
              </div>

              <h1 className="text-[clamp(3rem,10vw,7rem)] font-bold leading-[0.9] tracking-tighter mb-8">
                YOUR<br />
                AI AGENT<br />
                <span className="text-neutral-600">THAT WORKS</span>
              </h1>

              <p className="text-neutral-500 text-lg max-w-md mb-10 leading-relaxed">
                Create an AI agent. Generate posts. Approve before publishing. Stay authentic at scale.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={onGetStarted}
                  className="group px-8 py-4 bg-white text-black font-medium text-sm tracking-wide hover:bg-neutral-200 transition-colors flex items-center gap-2"
                >
                  CREATE AGENT
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="aspect-square bg-neutral-950 border border-neutral-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl font-bold tracking-tighter text-neutral-800">AI</div>
                  <div className="text-xs tracking-widest text-neutral-600 mt-4">POWERED BY SELF SYSTEMS</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div key={i} className="p-8 md:p-12 border-r border-neutral-900 last:border-r-0">
                <div className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{stat.value}</div>
                <div className="text-[10px] tracking-widest text-neutral-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-16">
            <div className="text-xs tracking-widest text-neutral-600 mb-4">HOW IT WORKS</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">SIMPLE. POWERFUL.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-neutral-900">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="bg-black p-8">
                  <div className="text-5xl font-bold text-neutral-900 mb-4">0{i + 1}</div>
                  <Icon className="w-6 h-6 mb-4 text-white" />
                  <h3 className="text-sm font-bold tracking-wider mb-3">{feature.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
            READY?
          </h2>
          <button
            onClick={onGetStarted}
            className="px-12 py-5 bg-white text-black font-medium text-sm tracking-wide hover:bg-neutral-200 transition-colors"
          >
            CREATE YOUR AGENT
          </button>
        </div>
      </section>
    </motion.div>
  );
}

function CreateSection({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    personality: '',
    expertise: [] as string[],
  });
  const { isConnected, addAgent, connect } = useAppStore();

  const personalities = ['HELPFUL', 'WITTY', 'ANALYTICAL', 'BOLD'];
  const expertises = ['WEB3', 'DEFI', 'AI', 'CRYPTO', 'GAMING', 'NFTS'];

  const handleCreate = () => {
    if (!isConnected) {
      const mockFid = Math.floor(Math.random() * 100000) + 1;
      connect(mockFid, `user${mockFid}`);
    }

    addAgent({
      name: formData.name,
      personality: formData.personality,
      expertise: formData.expertise,
    });

    onComplete();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen">
      <div className="max-w-xl mx-auto px-6 py-24">
        <div className="flex gap-2 mb-16">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`h-0.5 flex-1 ${i <= step ? 'bg-white' : 'bg-neutral-800'}`} />
          ))}
        </div>

        <div className="text-xs tracking-widest text-neutral-600 mb-4">STEP {step + 1} OF 4</div>

        {step === 0 && (
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-8">NAME YOUR AGENT</h2>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter name"
              className="w-full bg-transparent border-b border-neutral-800 py-4 text-2xl focus:border-white outline-none transition-colors placeholder:text-neutral-700"
            />
            <div className="flex justify-end mt-12">
              <button
                onClick={() => setStep(1)}
                disabled={formData.name.length < 2}
                className="px-8 py-3 bg-white text-black text-sm font-medium disabled:opacity-20"
              >
                CONTINUE
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-8">CHOOSE PERSONALITY</h2>
            <div className="grid grid-cols-2 gap-2">
              {personalities.map((p) => (
                <button
                  key={p}
                  onClick={() => setFormData({ ...formData, personality: p })}
                  className={`p-6 text-left text-sm tracking-wide border transition-colors ${
                    formData.personality === p ? 'border-white bg-white text-black' : 'border-neutral-800 hover:border-neutral-600'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-12">
              <button onClick={() => setStep(0)} className="text-sm text-neutral-500 hover:text-white">BACK</button>
              <button
                onClick={() => setStep(2)}
                disabled={!formData.personality}
                className="px-8 py-3 bg-white text-black text-sm font-medium disabled:opacity-20"
              >
                CONTINUE
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-8">SELECT EXPERTISE</h2>
            <div className="flex flex-wrap gap-2">
              {expertises.map((e) => (
                <button
                  key={e}
                  onClick={() => {
                    const newExp = formData.expertise.includes(e)
                      ? formData.expertise.filter((x) => x !== e)
                      : [...formData.expertise, e];
                    setFormData({ ...formData, expertise: newExp });
                  }}
                  className={`px-4 py-2 text-xs tracking-wide border transition-colors ${
                    formData.expertise.includes(e) ? 'border-white bg-white text-black' : 'border-neutral-800 hover:border-neutral-600'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-12">
              <button onClick={() => setStep(1)} className="text-sm text-neutral-500 hover:text-white">BACK</button>
              <button
                onClick={() => setStep(3)}
                disabled={formData.expertise.length === 0}
                className="px-8 py-3 bg-white text-black text-sm font-medium disabled:opacity-20"
              >
                CONTINUE
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-8">REVIEW</h2>
            <div className="space-y-6 mb-12">
              <div className="border-b border-neutral-900 pb-4">
                <div className="text-[10px] tracking-widest text-neutral-600 mb-2">NAME</div>
                <div className="text-xl">{formData.name}</div>
              </div>
              <div className="border-b border-neutral-900 pb-4">
                <div className="text-[10px] tracking-widest text-neutral-600 mb-2">PERSONALITY</div>
                <div className="text-xl">{formData.personality}</div>
              </div>
              <div>
                <div className="text-[10px] tracking-widest text-neutral-600 mb-2">EXPERTISE</div>
                <div className="flex flex-wrap gap-2">
                  {formData.expertise.map((e) => (
                    <span key={e} className="px-3 py-1 bg-neutral-900 text-xs">{e}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <button onClick={() => setStep(2)} className="text-sm text-neutral-500 hover:text-white">BACK</button>
              <button onClick={handleCreate} className="px-8 py-3 bg-white text-black text-sm font-medium">
                CREATE AGENT
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function DashboardSection({ onCreate }: { onCreate: () => void }) {
  const { agents, pendingPosts, isGenerating, generatePost, approvePost, rejectPost, removeAgent } = useAppStore();
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = (content: string, id: number) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const totalPosts = agents.reduce((sum, a) => sum + a.totalPosts, 0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-16">
          <div>
            <div className="text-xs tracking-widest text-neutral-600 mb-4">OVERVIEW</div>
            <h1 className="text-4xl font-bold tracking-tighter">DASHBOARD</h1>
          </div>
          <button
            onClick={onCreate}
            className="px-6 py-3 bg-white text-black text-sm font-medium flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            NEW AGENT
          </button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-px bg-neutral-900 mb-16">
          <div className="bg-black p-8">
            <div className="text-4xl font-bold mb-2">{agents.length}</div>
            <div className="text-[10px] tracking-widest text-neutral-600">AGENTS</div>
          </div>
          <div className="bg-black p-8">
            <div className="text-4xl font-bold mb-2">{totalPosts}</div>
            <div className="text-[10px] tracking-widest text-neutral-600">POSTS APPROVED</div>
          </div>
          <div className="bg-black p-8">
            <div className="text-4xl font-bold mb-2">{pendingPosts.length}</div>
            <div className="text-[10px] tracking-widest text-neutral-600">PENDING REVIEW</div>
          </div>
        </div>

        {agents.length === 0 ? (
          <div className="border border-neutral-900 p-12 text-center">
            <div className="text-6xl font-bold text-neutral-900 mb-4">0</div>
            <div className="text-xs tracking-widest text-neutral-600 mb-6">AGENTS</div>
            <p className="text-neutral-600 mb-8">Create your first AI agent to get started</p>
            <button onClick={onCreate} className="px-8 py-3 bg-white text-black text-sm font-medium">
              CREATE AGENT
            </button>
          </div>
        ) : (
          <>
            {/* Agents */}
            <div className="mb-16">
              <div className="text-xs tracking-widest text-neutral-600 mb-6">YOUR AGENTS</div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-900">
                {agents.map((agent) => (
                  <AgentCard
                    key={agent.id}
                    agent={agent}
                    isGenerating={isGenerating}
                    onGenerate={() => generatePost(agent.id)}
                    onDelete={() => removeAgent(agent.id)}
                  />
                ))}
              </div>
            </div>

            {/* Pending Posts */}
            {pendingPosts.length > 0 && (
              <div>
                <div className="text-xs tracking-widest text-neutral-600 mb-6">PENDING APPROVAL</div>
                <div className="space-y-2">
                  {pendingPosts.map((post) => {
                    const agent = agents.find((a) => a.id === post.agentId);
                    return (
                      <div key={post.id} className="p-6 bg-neutral-950 border border-neutral-900">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="text-xs tracking-widest text-neutral-600">
                            FROM {agent?.name.toUpperCase() || 'AGENT'}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleCopy(post.content, post.id)}
                              className="p-2 text-neutral-600 hover:text-white transition-colors"
                            >
                              {copiedId === post.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => rejectPost(post.id)}
                              className="p-2 text-neutral-600 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <p className="text-lg mb-6 leading-relaxed">{post.content}</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => approvePost(post.id)}
                            className="px-6 py-2 bg-white text-black text-sm font-medium flex items-center gap-2"
                          >
                            <Check className="w-4 h-4" />
                            APPROVE
                          </button>
                          <button
                            onClick={() => rejectPost(post.id)}
                            className="px-6 py-2 border border-neutral-800 text-sm font-medium hover:border-neutral-600 transition-colors"
                          >
                            REJECT
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}

function AgentCard({
  agent,
  isGenerating,
  onGenerate,
  onDelete,
}: {
  agent: Agent;
  isGenerating: boolean;
  onGenerate: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="bg-black p-6 group">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="font-bold mb-1">{agent.name}</div>
          <div className="text-[10px] tracking-widest text-neutral-600">{agent.personality}</div>
        </div>
        <button onClick={onDelete} className="p-1 text-neutral-700 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <div className="flex flex-wrap gap-1 mb-4">
        {agent.expertise.map((e) => (
          <span key={e} className="text-[10px] tracking-wide px-2 py-1 bg-neutral-900">{e}</span>
        ))}
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-neutral-900">
        <div className="text-xs text-neutral-600">{agent.totalPosts} posts</div>
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className="px-4 py-2 bg-white text-black text-xs font-medium flex items-center gap-2 disabled:opacity-50"
        >
          {isGenerating ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <Sparkles className="w-3 h-3" />
          )}
          GENERATE
        </button>
      </div>
    </div>
  );
}
