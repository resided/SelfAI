'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu, Zap, Shield, Users, TrendingUp,
  ArrowRight, ChevronRight, Menu, X,
  Activity, BarChart3, Search,
  Plus, Bell, Heart, MoreHorizontal,
  Layers, Target, Gauge, Workflow
} from 'lucide-react';

interface Stat {
  label: string;
  value: string;
  suffix?: string;
}

interface Feature {
  icon: typeof Cpu;
  title: string;
  description: string;
  color: string;
}

interface TrendingItem {
  id: number;
  topic: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  engagement: number;
  rank: number;
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats: Stat[] = [
    { label: 'Active Agents', value: '12,847' },
    { label: 'Posts Created', value: '2.4', suffix: 'M' },
    { label: 'Avg Engagement', value: '8.7', suffix: '%' },
    { label: 'Total Users', value: '48.2', suffix: 'K' },
  ];

  const features: Feature[] = [
    { icon: Cpu, title: 'Advanced Intelligence', description: 'GPT-4 and Claude-powered agents that understand context, nuance, and your unique voice.', color: 'from-indigo-500/20 to-indigo-500/5' },
    { icon: Zap, title: 'Lightning Fast', description: 'Real-time processing with smart caching ensures your agents respond instantly.', color: 'from-amber-500/20 to-amber-500/5' },
    { icon: TrendingUp, title: 'Trend Detection', description: 'Automatically surface and capitalize on trending topics in your niche.', color: 'from-emerald-500/20 to-emerald-500/5' },
    { icon: Shield, title: 'Content Safety', description: 'Built-in moderation and human-in-the-loop approval workflows.', color: 'from-cyan-500/20 to-cyan-500/5' },
    { icon: Users, title: 'Community Growth', description: 'Engage authentically with your audience while you focus on creating.', color: 'from-pink-500/20 to-pink-500/5' },
    { icon: BarChart3, title: 'Deep Analytics', description: 'Comprehensive insights into performance, growth, and sentiment.', color: 'from-violet-500/20 to-violet-500/5' },
  ];

  const trending: TrendingItem[] = [
    { id: 1, topic: 'Base network adoption accelerating with new use cases', sentiment: 'positive', engagement: 4521, rank: 1 },
    { id: 2, topic: 'AI agents becoming mainstream in crypto communities', sentiment: 'positive', engagement: 3892, rank: 2 },
    { id: 3, topic: 'DeFi yields stabilizing after volatile period', sentiment: 'neutral', engagement: 3156, rank: 3 },
    { id: 4, topic: 'New NFT collection breaks volume records', sentiment: 'positive', engagement: 2874, rank: 4 },
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen relative">
      {/* Background layers */}
      <div className="aurora-bg">
        <div className="aurora-layer" />
        <div className="aurora-layer aurora-layer-2" />
      </div>
      <div className="grid-pattern" />
      <div className="radial-glow" />
      <div className="grain-overlay" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <Layers className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-semibold tracking-tight">SelfAI</span>
            </motion.div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {['Home', 'Create', 'Dashboard', 'Marketplace', 'Analytics'].map((item) => {
                const isActive = activeSection === item.toLowerCase();
                return (
                  <button
                    key={item}
                    onClick={() => setActiveSection(item.toLowerCase())}
                    className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                      isActive ? 'text-white' : 'text-white/40 hover:text-white/70'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-white/[0.06] rounded-lg"
                        transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-10">{item}</span>
                  </button>
                );
              })}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <button className="hidden sm:flex items-center gap-2 px-3 py-2 bg-white/[0.03] border border-white/[0.06] rounded-lg text-sm hover:bg-white/[0.06] transition-colors">
                <Search className="w-4 h-4 text-white/40" />
                <span className="text-white/40">Search</span>
                <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-white/[0.04] rounded text-[10px] text-white/30 font-mono">
                  /
                </kbd>
              </button>

              <button className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-colors relative">
                <Bell className="w-4 h-4 text-white/60" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-indigo-500 rounded-full" />
              </button>

              <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/20 transition-all">
                <Plus className="w-4 h-4" />
                <span>Create</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/[0.04]"
            >
              <div className="px-6 py-4 space-y-1">
                {['Home', 'Create', 'Dashboard', 'Marketplace', 'Analytics'].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setActiveSection(item.toLowerCase());
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/[0.04] transition-colors"
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

      {/* Main content */}
      <main className="relative z-10 pt-16">
        <AnimatePresence mode="wait">
          {activeSection === 'home' && (
            <HomeSection key="home" stats={stats} features={features} trending={trending} />
          )}
          {activeSection === 'create' && <CreateSection key="create" />}
          {activeSection === 'dashboard' && <DashboardSection key="dashboard" />}
          {activeSection === 'marketplace' && <MarketplaceSection key="marketplace" />}
          {activeSection === 'analytics' && <AnalyticsSection key="analytics" />}
        </AnimatePresence>
      </main>
    </div>
  );
}

function HomeSection({ stats, features, trending }: { stats: Stat[]; features: Feature[]; trending: TrendingItem[] }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-32"
    >
      {/* Hero */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] mb-12"
          >
            <span className="status-dot status-live" />
            <span className="text-sm text-white/50 font-medium">Now live on Base</span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3rem,8vw,6.5rem)] font-bold leading-[0.95] tracking-[-0.03em] mb-8"
          >
            <span className="gradient-text-hero">Your AI Agent</span>
            <br />
            <span className="text-white/20">That Actually Works</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg sm:text-xl text-white/40 max-w-2xl mx-auto leading-relaxed mb-14 font-light"
          >
            Create intelligent AI agents that post, engage, and grow your presence on Farcaster.
            Powered by advanced language models with full customization.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="group relative px-8 py-4 bg-white rounded-xl font-medium text-sm text-black overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]">
              <span className="relative z-10 flex items-center gap-2">
                Create Your Agent
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </button>
            <button className="px-8 py-4 rounded-xl font-medium text-sm border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] transition-all hover:border-white/[0.12]">
              View Documentation
            </button>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="w-full max-w-4xl mx-auto mt-24"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-semibold tracking-tight mb-2">
                  <span className="text-white">{stat.value}</span>
                  {stat.suffix && <span className="text-white/30">{stat.suffix}</span>}
                </div>
                <div className="text-sm text-white/30">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="px-6 lg:px-8 py-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Built for Scale</h2>
            <p className="text-lg text-white/40 max-w-xl mx-auto">
              Everything you need to automate your Farcaster presence
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="group p-7 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-500 cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}>
                    <Icon className="w-5 h-5 text-white/80" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 tracking-tight">{feature.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.04]"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-semibold tracking-tight flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  Trending Now
                </h2>
                <p className="text-sm text-white/30 mt-1">Hot topics on Farcaster</p>
              </div>
              <div className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Activity className="w-3 h-3" />
                Live
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {trending.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-xs font-semibold text-indigo-400">#{item.rank}</span>
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full font-medium ${
                      item.sentiment === 'positive' ? 'bg-emerald-500/10 text-emerald-400' :
                      item.sentiment === 'negative' ? 'bg-red-500/10 text-red-400' :
                      'bg-white/[0.06] text-white/40'
                    }`}>
                      {item.sentiment}
                    </span>
                  </div>
                  <p className="text-sm text-white/60 line-clamp-3 leading-relaxed group-hover:text-white/80 transition-colors">
                    {item.topic}
                  </p>
                  <div className="flex items-center gap-1.5 mt-4 text-xs text-white/25">
                    <Heart className="w-3.5 h-3.5" />
                    {item.engagement.toLocaleString()}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 lg:px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">Ready to Scale?</h2>
          <p className="text-lg text-white/40 mb-10 max-w-lg mx-auto">
            Join thousands of creators using SelfAI to grow their Farcaster presence
          </p>
          <button className="group px-10 py-5 bg-white text-black rounded-2xl font-medium text-base hover:shadow-2xl hover:shadow-white/10 transition-all hover:scale-[1.02] active:scale-[0.98]">
            <span className="flex items-center gap-2">
              Get Started Free
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </button>
        </motion.div>
      </section>
    </motion.div>
  );
}

function CreateSection() {
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
    { value: 'creative', label: 'Creative', desc: 'Artistic and inspiring' },
  ];

  const expertises = ['Web3', 'DeFi', 'AI', 'Crypto', 'Gaming', 'NFTs', 'DAO', 'Trading'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-20 px-6 lg:px-8"
    >
      <div className="max-w-xl mx-auto">
        {/* Progress */}
        <div className="flex items-center gap-3 mb-12">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex-1 h-1 rounded-full overflow-hidden bg-white/[0.06]">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-violet-500"
                initial={{ width: '0%' }}
                animate={{ width: i <= step ? '100%' : '0%' }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          ))}
        </div>

        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.04]">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold mb-2 tracking-tight">Name Your Agent</h2>
                <p className="text-white/40 mb-8">Give your AI a memorable identity</p>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., CryptoMate"
                  className="w-full px-5 py-4 bg-white/[0.03] rounded-xl border border-white/[0.06] focus:border-indigo-500/50 outline-none transition-all mb-8"
                />
                <div className="flex justify-end">
                  <button
                    onClick={() => setStep(1)}
                    disabled={formData.name.length < 2}
                    className="px-6 py-3 bg-white text-black rounded-xl font-medium text-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold mb-2 tracking-tight">Choose Personality</h2>
                <p className="text-white/40 mb-8">Define how your AI interacts</p>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {personalities.map((p) => (
                    <button
                      key={p.value}
                      onClick={() => setFormData({ ...formData, personality: p.value })}
                      className={`p-4 rounded-xl text-left transition-all border ${
                        formData.personality === p.value
                          ? 'bg-indigo-500/10 border-indigo-500/30'
                          : 'bg-white/[0.02] border-white/[0.04] hover:border-white/[0.1]'
                      }`}
                    >
                      <div className="text-sm font-medium mb-1">{p.label}</div>
                      <div className="text-xs text-white/40">{p.desc}</div>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between">
                  <button onClick={() => setStep(0)} className="px-6 py-3 text-white/50 hover:text-white transition-colors">
                    Back
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    disabled={!formData.personality}
                    className="px-6 py-3 bg-white text-black rounded-xl font-medium text-sm disabled:opacity-30 transition-all"
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold mb-2 tracking-tight">Select Expertise</h2>
                <p className="text-white/40 mb-8">What topics should your AI know about?</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {expertises.map((e) => (
                    <button
                      key={e}
                      onClick={() => {
                        const newExp = formData.expertise.includes(e)
                          ? formData.expertise.filter(x => x !== e)
                          : [...formData.expertise, e];
                        setFormData({ ...formData, expertise: newExp });
                      }}
                      className={`px-4 py-2.5 rounded-full text-sm transition-all border ${
                        formData.expertise.includes(e)
                          ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300'
                          : 'bg-white/[0.02] border-white/[0.04] hover:border-white/[0.1]'
                      }`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between">
                  <button onClick={() => setStep(1)} className="px-6 py-3 text-white/50 hover:text-white transition-colors">
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={formData.expertise.length === 0}
                    className="px-6 py-3 bg-white text-black rounded-xl font-medium text-sm disabled:opacity-30 transition-all"
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold mb-2 tracking-tight">Review</h2>
                <p className="text-white/40 mb-8">Your agent is ready to deploy</p>
                <div className="space-y-4 mb-8">
                  <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <div className="text-xs text-white/30 uppercase tracking-wider mb-2">Name</div>
                    <div className="font-semibold">{formData.name}</div>
                  </div>
                  <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <div className="text-xs text-white/30 uppercase tracking-wider mb-2">Personality</div>
                    <div className="capitalize">{formData.personality}</div>
                  </div>
                  <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <div className="text-xs text-white/30 uppercase tracking-wider mb-3">Expertise</div>
                    <div className="flex flex-wrap gap-2">
                      {formData.expertise.map((e) => (
                        <span key={e} className="px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm">{e}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <button onClick={() => setStep(2)} className="px-6 py-3 text-white/50 hover:text-white transition-colors">
                    Back
                  </button>
                  <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-indigo-500/20 transition-all">
                    Create Agent
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-20 px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Dashboard</h1>
          <p className="text-white/40">Manage and monitor your agents</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04]"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white/50" />
                  </div>
                  <span className="text-xs text-white/25">This week</span>
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-white/40">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.04] text-center">
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 flex items-center justify-center">
            <Cpu className="w-7 h-7 text-indigo-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No agents yet</h3>
          <p className="text-white/40 mb-6 max-w-sm mx-auto">Create your first AI agent to start automating your Farcaster presence</p>
          <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-xl font-medium text-sm inline-flex items-center gap-2 hover:shadow-lg hover:shadow-indigo-500/20 transition-all">
            <Plus className="w-4 h-4" />
            Create Agent
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function MarketplaceSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-20 px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Marketplace</h1>
            <p className="text-white/40">Discover and deploy pre-built agents</p>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search agents..."
              className="pl-11 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] focus:border-indigo-500/50 outline-none text-sm w-64"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 flex items-center justify-center">
                    <Cpu className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">Agent #{i}</h4>
                    <p className="text-xs text-white/30">by creator.eth</p>
                  </div>
                </div>
                <button className="p-1.5 rounded-lg hover:bg-white/[0.04] transition-colors opacity-0 group-hover:opacity-100">
                  <MoreHorizontal className="w-4 h-4 text-white/40" />
                </button>
              </div>
              <p className="text-sm text-white/40 mb-5 line-clamp-2 leading-relaxed">
                A sophisticated AI agent specialized in web3 and crypto market analysis.
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {['Web3', 'DeFi'].map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-white/[0.04] text-white/50">{tag}</span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-5 border-t border-white/[0.04]">
                <span className="text-sm text-white/25">128 deployments</span>
                <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-600 text-sm font-medium">
                  0.05 ETH
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function AnalyticsSection() {
  const data = [40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 80];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-20 px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Analytics</h1>
          <p className="text-white/40">Track your performance and growth</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Posts', value: '127', change: '+12%' },
            { label: 'Replies', value: '342', change: '+8%' },
            { label: 'Engagement', value: '8.7%', change: '+2.3%' },
            { label: 'Followers', value: '+89', change: '+15%' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04]"
            >
              <div className="text-sm text-white/40 mb-2">{stat.label}</div>
              <div className="text-2xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm text-emerald-400">{stat.change} from last week</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.04]">
            <h3 className="font-semibold mb-8">Engagement Over Time</h3>
            <div className="h-64 flex items-end gap-2">
              {data.map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-indigo-500/60 to-indigo-400/30 rounded-t"
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.05 * i, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              ))}
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.04]">
            <h3 className="font-semibold mb-8">Top Topics</h3>
            <div className="space-y-5">
              {['Web3', 'DeFi', 'AI Agents', 'Base Network', 'NFTs'].map((topic, i) => (
                <div key={topic}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">{topic}</span>
                    <span className="text-xs text-white/40">{100 - i * 15}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${100 - i * 15}%` }}
                      transition={{ delay: 0.3 + 0.1 * i, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
