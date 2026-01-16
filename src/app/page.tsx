'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu, Zap, Shield, Users, TrendingUp,
  ArrowRight, ChevronRight, Menu, X,
  Activity, BarChart3, Search,
  Plus, Bell, Heart, MoreHorizontal,
  Layers, Target, Workflow
} from 'lucide-react';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const stats = [
    { label: 'Active Agents', value: '12,847' },
    { label: 'Posts Created', value: '2.4M' },
    { label: 'Engagement Rate', value: '8.7%' },
    { label: 'Total Users', value: '48.2K' },
  ];

  const features = [
    { icon: Cpu, title: 'Advanced Intelligence', description: 'GPT-4 and Claude-powered agents that understand context, nuance, and your unique voice.' },
    { icon: Zap, title: 'Lightning Fast', description: 'Real-time processing with smart caching ensures your agents respond instantly.' },
    { icon: TrendingUp, title: 'Trend Detection', description: 'Automatically surface and capitalize on trending topics in your niche.' },
    { icon: Shield, title: 'Content Safety', description: 'Built-in moderation and human-in-the-loop approval workflows.' },
    { icon: Users, title: 'Community Growth', description: 'Engage authentically with your audience while you focus on creating.' },
    { icon: BarChart3, title: 'Deep Analytics', description: 'Comprehensive insights into performance, growth, and sentiment.' },
  ];

  const trending = [
    { id: 1, topic: 'Base network adoption accelerating with new use cases', sentiment: 'positive', engagement: 4521, rank: 1 },
    { id: 2, topic: 'AI agents becoming mainstream in crypto communities', sentiment: 'positive', engagement: 3892, rank: 2 },
    { id: 3, topic: 'DeFi yields stabilizing after volatile period', sentiment: 'neutral', engagement: 3156, rank: 3 },
    { id: 4, topic: 'New NFT collection breaks volume records', sentiment: 'positive', engagement: 2874, rank: 4 },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <Layers className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">SelfAI</span>
            </div>

            <div className="hidden md:flex items-center gap-1">
              {['Home', 'Create', 'Dashboard', 'Marketplace', 'Analytics'].map((item) => {
                const isActive = activeSection === item.toLowerCase();
                return (
                  <button
                    key={item}
                    onClick={() => setActiveSection(item.toLowerCase())}
                    className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                      isActive ? 'text-white bg-white/5' : 'text-white/40 hover:text-white/70'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <button className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm text-white/40 bg-white/5 border border-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <Search className="w-4 h-4" />
                Search
              </button>
              <button className="relative p-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <Bell className="w-4 h-4 text-white/60" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-indigo-500 rounded-full" />
              </button>
              <button className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gradient-to-r from-indigo-500 to-violet-600 rounded-lg hover:opacity-90 transition-opacity">
                <Plus className="w-4 h-4" />
                Create
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-white/5"
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
              className="md:hidden border-t border-white/5 bg-[#050505]"
            >
              <div className="px-6 py-4 space-y-1">
                {['Home', 'Create', 'Dashboard', 'Marketplace', 'Analytics'].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setActiveSection(item.toLowerCase());
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {item}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        <AnimatePresence mode="wait">
          {activeSection === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Hero */}
              <section className="relative overflow-hidden">
                <div className="bg-glow" />
                <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-20">
                  <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                      <span className="status-dot" />
                      <span className="text-sm text-white/60">Now live on Base</span>
                    </div>

                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
                      <span className="gradient-text-hero">Your AI Agent</span>
                      <br />
                      <span className="text-white/25">That Works</span>
                    </h1>

                    <p className="text-lg text-white/40 max-w-xl mx-auto mb-10 leading-relaxed">
                      Create intelligent AI agents that post, engage, and grow your presence on Farcaster. Powered by advanced language models.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <button className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-xl font-medium text-sm hover:bg-white/90 transition-colors flex items-center justify-center gap-2">
                        Create Your Agent
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button className="w-full sm:w-auto px-8 py-4 rounded-xl font-medium text-sm border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                        View Documentation
                      </button>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-12 border-t border-white/5">
                    {stats.map((stat, i) => (
                      <div key={i} className="text-center">
                        <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-sm text-white/40">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Features */}
              <section className="max-w-6xl mx-auto px-6 py-24">
                <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4">Built for Scale</h2>
                  <p className="text-white/40 max-w-md mx-auto">Everything you need to automate your Farcaster presence</p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {features.map((feature, i) => {
                    const Icon = feature.icon;
                    return (
                      <div
                        key={i}
                        className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all"
                      >
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/10 flex items-center justify-center mb-5">
                          <Icon className="w-5 h-5 text-indigo-400" />
                        </div>
                        <h3 className="font-semibold mb-2">{feature.title}</h3>
                        <p className="text-sm text-white/40 leading-relaxed">{feature.description}</p>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Trending */}
              <section className="max-w-6xl mx-auto px-6 py-12">
                <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-lg font-semibold flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-emerald-400" />
                        Trending Now
                      </h2>
                      <p className="text-sm text-white/40 mt-1">Hot topics on Farcaster</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      <Activity className="w-3 h-3" />
                      Live
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {trending.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <span className="text-xs font-medium text-indigo-400">#{item.rank}</span>
                          <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full ${
                            item.sentiment === 'positive' ? 'bg-emerald-500/10 text-emerald-400' :
                            item.sentiment === 'negative' ? 'bg-red-500/10 text-red-400' :
                            'bg-white/5 text-white/40'
                          }`}>
                            {item.sentiment}
                          </span>
                        </div>
                        <p className="text-sm text-white/60 line-clamp-3 leading-relaxed">{item.topic}</p>
                        <div className="flex items-center gap-1 mt-3 text-xs text-white/30">
                          <Heart className="w-3 h-3" />
                          {item.engagement.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* CTA */}
              <section className="max-w-6xl mx-auto px-6 py-24">
                <div className="text-center">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Scale?</h2>
                  <p className="text-white/40 mb-8 max-w-md mx-auto">Join thousands of creators using SelfAI to grow their Farcaster presence</p>
                  <button className="px-8 py-4 bg-white text-black rounded-xl font-medium hover:bg-white/90 transition-colors inline-flex items-center gap-2">
                    Get Started Free
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </section>
            </motion.div>
          )}

          {activeSection === 'create' && (
            <CreateSection key="create" onBack={() => setActiveSection('home')} />
          )}

          {activeSection === 'dashboard' && (
            <DashboardSection key="dashboard" />
          )}

          {activeSection === 'marketplace' && (
            <MarketplaceSection key="marketplace" />
          )}

          {activeSection === 'analytics' && (
            <AnalyticsSection key="analytics" />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function CreateSection({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    personality: '',
    expertise: [] as string[],
  });

  const personalities = [
    { value: 'helpful', label: 'Helpful', desc: 'Friendly and supportive' },
    { value: 'witty', label: 'Witty', desc: 'Clever and humorous' },
    { value: 'analytical', label: 'Analytical', desc: 'Data-driven and precise' },
    { value: 'bold', label: 'Bold', desc: 'Direct and challenging' },
  ];

  const expertises = ['Web3', 'DeFi', 'AI', 'Crypto', 'Gaming', 'NFTs', 'DAO', 'Trading'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-lg mx-auto px-6 pt-24 pb-20"
    >
      <div className="flex items-center gap-3 mb-10">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-300 ${
                i <= step ? 'w-full' : 'w-0'
              }`}
            />
          </div>
        ))}
      </div>

      <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/5">
        {step === 0 && (
          <div>
            <h2 className="text-xl font-bold mb-2">Name Your Agent</h2>
            <p className="text-white/40 text-sm mb-6">Give your AI a memorable identity</p>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., CryptoMate"
              className="w-full px-4 py-3 bg-white/5 rounded-xl border border-white/10 focus:border-indigo-500/50 outline-none text-sm mb-6"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setStep(1)}
                disabled={formData.name.length < 2}
                className="px-5 py-2.5 bg-white text-black rounded-lg text-sm font-medium disabled:opacity-30"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold mb-2">Choose Personality</h2>
            <p className="text-white/40 text-sm mb-6">Define how your AI interacts</p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {personalities.map((p) => (
                <button
                  key={p.value}
                  onClick={() => setFormData({ ...formData, personality: p.value })}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    formData.personality === p.value
                      ? 'bg-indigo-500/10 border-indigo-500/30'
                      : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="text-sm font-medium mb-1">{p.label}</div>
                  <div className="text-xs text-white/40">{p.desc}</div>
                </button>
              ))}
            </div>
            <div className="flex justify-between">
              <button onClick={() => setStep(0)} className="px-5 py-2.5 text-white/50 text-sm">Back</button>
              <button
                onClick={() => setStep(2)}
                disabled={!formData.personality}
                className="px-5 py-2.5 bg-white text-black rounded-lg text-sm font-medium disabled:opacity-30"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold mb-2">Select Expertise</h2>
            <p className="text-white/40 text-sm mb-6">What topics should your AI know about?</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {expertises.map((e) => (
                <button
                  key={e}
                  onClick={() => {
                    const newExp = formData.expertise.includes(e)
                      ? formData.expertise.filter(x => x !== e)
                      : [...formData.expertise, e];
                    setFormData({ ...formData, expertise: newExp });
                  }}
                  className={`px-4 py-2 rounded-full text-sm border transition-all ${
                    formData.expertise.includes(e)
                      ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300'
                      : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
            <div className="flex justify-between">
              <button onClick={() => setStep(1)} className="px-5 py-2.5 text-white/50 text-sm">Back</button>
              <button
                onClick={() => setStep(3)}
                disabled={formData.expertise.length === 0}
                className="px-5 py-2.5 bg-white text-black rounded-lg text-sm font-medium disabled:opacity-30"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold mb-2">Review</h2>
            <p className="text-white/40 text-sm mb-6">Your agent is ready to deploy</p>
            <div className="space-y-3 mb-6">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-xs text-white/30 mb-1">Name</div>
                <div className="font-medium">{formData.name}</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-xs text-white/30 mb-1">Personality</div>
                <div className="capitalize">{formData.personality}</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-xs text-white/30 mb-2">Expertise</div>
                <div className="flex flex-wrap gap-2">
                  {formData.expertise.map((e) => (
                    <span key={e} className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm">{e}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <button onClick={() => setStep(2)} className="px-5 py-2.5 text-white/50 text-sm">Back</button>
              <button className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-lg text-sm font-medium">
                Create Agent
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function DashboardSection() {
  const stats = [
    { label: 'Total Posts', value: '127', icon: Workflow },
    { label: 'Replies', value: '342', icon: Cpu },
    { label: 'Engagement', value: '8.7%', icon: Target },
    { label: 'Followers', value: '+89', icon: Users },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto px-6 pt-24 pb-20"
    >
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-white/40">Manage and monitor your agents</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white/50" />
                </div>
                <span className="text-xs text-white/30">This week</span>
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-white/40">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 flex items-center justify-center">
          <Cpu className="w-6 h-6 text-indigo-400" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No agents yet</h3>
        <p className="text-white/40 text-sm mb-5 max-w-sm mx-auto">Create your first AI agent to start automating your Farcaster presence</p>
        <button className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-lg text-sm font-medium inline-flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Agent
        </button>
      </div>
    </motion.div>
  );
}

function MarketplaceSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto px-6 pt-24 pb-20"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold mb-2">Marketplace</h1>
          <p className="text-white/40">Discover and deploy pre-built agents</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Search agents..."
            className="pl-10 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/5 focus:border-indigo-500/50 outline-none text-sm w-full sm:w-56"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/10 to-violet-500/10 flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Agent #{i}</h4>
                  <p className="text-xs text-white/30">by creator.eth</p>
                </div>
              </div>
              <button className="p-1.5 rounded hover:bg-white/5 transition-colors">
                <MoreHorizontal className="w-4 h-4 text-white/30" />
              </button>
            </div>
            <p className="text-sm text-white/40 mb-4 line-clamp-2 leading-relaxed">
              A sophisticated AI agent specialized in web3 and crypto market analysis.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {['Web3', 'DeFi'].map((tag) => (
                <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/50">{tag}</span>
              ))}
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <span className="text-sm text-white/30">128 deployments</span>
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-600 text-sm font-medium">
                0.05 ETH
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function AnalyticsSection() {
  const data = [40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 80];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto px-6 pt-24 pb-20"
    >
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-white/40">Track your performance and growth</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Posts', value: '127', change: '+12%' },
          { label: 'Replies', value: '342', change: '+8%' },
          { label: 'Engagement', value: '8.7%', change: '+2.3%' },
          { label: 'Followers', value: '+89', change: '+15%' },
        ].map((stat, i) => (
          <div key={i} className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-sm text-white/40 mb-2">{stat.label}</div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-emerald-400">{stat.change} from last week</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
          <h3 className="font-semibold mb-6">Engagement Over Time</h3>
          <div className="h-48 flex items-end gap-1.5">
            {data.map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-indigo-500/60 to-indigo-400/20 rounded-t transition-all"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
          <h3 className="font-semibold mb-6">Top Topics</h3>
          <div className="space-y-4">
            {['Web3', 'DeFi', 'AI Agents', 'Base Network', 'NFTs'].map((topic, i) => (
              <div key={topic}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm">{topic}</span>
                  <span className="text-xs text-white/40">{100 - i * 15}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full"
                    style={{ width: `${100 - i * 15}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
