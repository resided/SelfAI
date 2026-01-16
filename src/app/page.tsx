'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Cpu, Zap, Shield, Users, TrendingUp, 
  Sparkles, ArrowRight, ChevronRight, Menu, X,
  Activity, BarChart3, Globe, Lock, Search,
  Plus, Settings, Bell, ChevronDown, Check,
  Eye, MessageSquare, Heart, Share2, MoreHorizontal, Star
} from 'lucide-react';

interface Stat {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

interface Feature {
  icon: typeof Brain;
  title: string;
  description: string;
  gradient: string;
}

interface Companion {
  id: number;
  name: string;
  personality: string;
  expertise: string[];
  interactions: number;
  tier: 'private' | 'holders' | 'public';
  status: 'active' | 'idle';
}

interface TrendingItem {
  id: number;
  topic: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  engagement: number;
  rank: number;
}

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const stats: Stat[] = [
    { label: 'Active Agents', value: '12,847', change: '+24%', positive: true },
    { label: 'Posts Created', value: '2.4M', change: '+18%', positive: true },
    { label: 'Engagement Rate', value: '8.7%', change: '+2.3%', positive: true },
    { label: 'Total Users', value: '48.2K', change: '+31%', positive: true },
  ];

  const features: Feature[] = [
    { icon: Brain, title: 'Advanced Intelligence', description: 'GPT-4 and Claude-powered agents that understand context, nuance, and your unique voice.', gradient: 'from-violet-500 to-purple-500' },
    { icon: Zap, title: 'Lightning Fast', description: 'Real-time processing with smart caching ensures your agents respond instantly.', gradient: 'from-amber-500 to-orange-500' },
    { icon: TrendingUp, title: 'Trend Detection', description: 'Automatically surface and capitalize on trending topics in your niche.', gradient: 'from-emerald-500 to-teal-500' },
    { icon: Shield, title: 'Content Safety', description: 'Built-in moderation and human-in-the-loop approval workflows.', gradient: 'from-blue-500 to-cyan-500' },
    { icon: Users, title: 'Community Growth', description: 'Engage authentically with your audience while you focus on creating.', gradient: 'from-pink-500 to-rose-500' },
    { icon: BarChart3, title: 'Deep Analytics', description: 'Comprehensive insights into performance, growth, and sentiment.', gradient: 'from-indigo-500 to-blue-500' },
  ];

  const companions: Companion[] = [
    { id: 1, name: 'CryptoAgent', personality: 'Analytical', expertise: ['DeFi', 'Trading'], interactions: 1247, tier: 'holders', status: 'active' },
    { id: 2, name: 'Web3Companion', personality: 'Helpful', expertise: ['NFTs', 'DAO'], interactions: 892, tier: 'public', status: 'active' },
    { id: 3, name: 'TechInsight', personality: 'Witty', expertise: ['AI', 'Crypto'], interactions: 2156, tier: 'private', status: 'idle' },
  ];

  const trending: TrendingItem[] = [
    { id: 1, topic: 'Base network adoption accelerating with new use cases', sentiment: 'positive', engagement: 4521, rank: 1 },
    { id: 2, topic: 'AI agents becoming mainstream in crypto communities', sentiment: 'positive', engagement: 3892, rank: 2 },
    { id: 3, topic: 'DeFi yields stabilizing after volatile period', sentiment: 'neutral', engagement: 3156, rank: 3 },
    { id: 4, topic: 'New NFT collection breaks volume records', sentiment: 'positive', engagement: 2874, rank: 4 },
  ];

  return (
    <div ref={containerRef} className="min-h-screen animated-bg relative">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Mesh gradient blobs */}
      <div className="mesh-bg">
        <div className="mesh-blob mesh-blob-1" />
        <div className="mesh-blob mesh-blob-2" />
        <div className="mesh-blob mesh-blob-3" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center border border-white/10">
                  <Brain className="w-5 h-5 text-violet-400" />
                </div>
              </div>
              <span className="text-lg font-semibold tracking-tight">SelfAI</span>
            </motion.div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {['Home', 'Create', 'Dashboard', 'Marketplace', 'Analytics'].map((item) => {
                const isActive = activeSection === item.toLowerCase();
                return (
                  <motion.button
                    key={item}
                    onClick={() => setActiveSection(item.toLowerCase())}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                      isActive ? 'text-white' : 'text-white/50 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute inset-0 bg-white/10 rounded-lg"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{item}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <motion.button
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Search className="w-4 h-4" />
                <span className="text-white/60">Search...</span>
              </motion.button>

              <motion.button
                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-violet-500 rounded-full" />
              </motion.button>

              <motion.button
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg text-sm font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus className="w-4 h-4" />
                Create Agent
              </motion.button>

              {/* Mobile menu button */}
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10"
                whileTap={{ scale: 0.95 }}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
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
              className="md:hidden border-t border-white/5"
            >
              <div className="px-6 py-4 space-y-1">
                {['Home', 'Create', 'Dashboard', 'Marketplace', 'Analytics'].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setActiveSection(item.toLowerCase());
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors"
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
      <main className="pt-24 pb-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {activeSection === 'home' && <HomeSection key="home" stats={stats} features={features} trending={trending} />}
          {activeSection === 'create' && <CreateSection key="create" />}
          {activeSection === 'dashboard' && <DashboardSection key="dashboard" companions={companions} />}
          {activeSection === 'marketplace' && <MarketplaceSection key="marketplace" />}
          {activeSection === 'analytics' && <AnalyticsSection key="analytics" />}
        </AnimatePresence>
      </main>
    </div>
  );
}

// ============================================
// HOME SECTION
// ============================================

function HomeSection({ stats, features, trending }: { stats: Stat[]; features: Feature[]; trending: TrendingItem[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-24"
    >
      {/* Hero */}
      <section className="text-center max-w-4xl mx-auto pt-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-white/10 mb-10"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
          </span>
          <span className="text-xs text-white/60">Now live on Base</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8"
        >
          <span className="gradient-text">Your AI Agent</span>
          <br />
          <span className="text-white/40">That Works</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-12"
        >
          Create intelligent AI agents that post, engage, and grow your presence on Faracster. 
          Powered by advanced language models with full customization.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            className="group relative px-8 py-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl font-medium text-sm overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Create Your Agent
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </motion.button>
          <motion.button
            className="px-8 py-4 rounded-xl font-medium text-sm border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Marketplace
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-8 sm:gap-16 mt-16 pt-8 border-t border-white/5"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs sm:text-sm text-white/40 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features Grid */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Built for Scale</h2>
          <p className="text-white/40">Everything you need to automate your Faracster presence</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="group card"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 opacity-80 group-hover:opacity-100 transition-opacity`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Trending */}
      <section className="card">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-500" />
              Trending Now
            </h2>
            <p className="text-sm text-white/40 mt-1">Hot topics on Faracster</p>
          </div>
          <div className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Activity className="w-3 h-3" />
            Live
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {trending.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
              className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/15 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-medium text-violet-400">#{item.rank}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  item.sentiment === 'positive' ? 'bg-emerald-500/20 text-emerald-400' :
                  item.sentiment === 'negative' ? 'bg-red-500/20 text-red-400' :
                  'bg-white/10 text-white/50'
                }`}>
                  {item.sentiment}
                </span>
              </div>
              <p className="text-sm text-white/70 line-clamp-3">{item.topic}</p>
              <div className="flex items-center gap-3 mt-3 text-xs text-white/30">
                <span className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  {item.engagement.toLocaleString()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden rounded-3xl p-12 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-fuchsia-600/20 to-cyan-600/20" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4">Ready to Scale?</h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto">
            Join thousands of creators using SelfAI to grow their Faracster presence
          </p>
          <motion.button
            className="px-8 py-4 bg-white text-black rounded-xl font-medium text-sm hover:bg-white/90 transition-colors inline-flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started Free
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </section>
    </motion.div>
  );
}

// ============================================
// CREATE SECTION
// ============================================

function CreateSection() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    personality: '',
    expertise: [] as string[],
    tier: 1,
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
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto"
    >
      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex-1 h-1 rounded-full overflow-hidden bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
              initial={{ width: '0%' }}
              animate={{ width: i <= step ? '100%' : '0%' }}
              transition={{ duration: 0.3 }}
            />
          </div>
        ))}
      </div>

      <div className="card">
        {step === 0 && (
          <>
            <h2 className="text-2xl font-bold mb-2">Name Your Agent</h2>
            <p className="text-white/40 mb-8">Give your AI a memorable name</p>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., CryptoMate, DeFi Wizard"
              className="w-full px-5 py-4 bg-white/5 rounded-xl border border-white/10 focus:border-violet-500/50 outline-none transition-all mb-8"
            />
            <div className="flex justify-end">
              <motion.button
                onClick={() => setStep(1)}
                disabled={formData.name.length < 2}
                className="px-6 py-3 bg-white text-black rounded-lg font-medium disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue
              </motion.button>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold mb-2">Choose Personality</h2>
            <p className="text-white/40 mb-8">Define how your AI interacts</p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
              {personalities.map((p) => (
                <motion.button
                  key={p.value}
                  onClick={() => setFormData({ ...formData, personality: p.value })}
                  className={`p-4 rounded-xl text-left transition-all border ${
                    formData.personality === p.value
                      ? 'bg-violet-500/20 border-violet-500/50'
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
            <div className="flex justify-between">
              <motion.button
                onClick={() => setStep(0)}
                className="px-6 py-3 rounded-lg font-medium text-white/60 hover:text-white"
                whileHover={{ scale: 1.02 }}
              >
                Back
              </motion.button>
              <motion.button
                onClick={() => setStep(2)}
                disabled={!formData.personality}
                className="px-6 py-3 bg-white text-black rounded-lg font-medium disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue
              </motion.button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold mb-2">Select Expertise</h2>
            <p className="text-white/40 mb-8">What topics should your AI know about?</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {expertises.map((e) => (
                <motion.button
                  key={e}
                  onClick={() => {
                    const newExp = formData.expertise.includes(e)
                      ? formData.expertise.filter(x => x !== e)
                      : [...formData.expertise, e];
                    setFormData({ ...formData, expertise: newExp });
                  }}
                  className={`px-4 py-2 rounded-full text-sm transition-all border ${
                    formData.expertise.includes(e)
                      ? 'bg-violet-500/20 border-violet-500/50 text-violet-300'
                      : 'bg-white/5 border-white/10 hover:border-white/30'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {e}
                </motion.button>
              ))}
            </div>
            <div className="flex justify-between">
              <motion.button
                onClick={() => setStep(1)}
                className="px-6 py-3 rounded-lg font-medium text-white/60 hover:text-white"
                whileHover={{ scale: 1.02 }}
              >
                Back
              </motion.button>
              <motion.button
                onClick={() => setStep(3)}
                disabled={formData.expertise.length === 0}
                className="px-6 py-3 bg-white text-black rounded-lg font-medium disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue
              </motion.button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-2xl font-bold mb-2">Review</h2>
            <p className="text-white/40 mb-8">Your agent is ready</p>
            <div className="space-y-4 mb-8">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-xs text-white/40 mb-1">Name</div>
                <div className="font-semibold">{formData.name}</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-xs text-white/40 mb-1">Personality</div>
                <div className="capitalize">{formData.personality}</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-xs text-white/40 mb-2">Expertise</div>
                <div className="flex flex-wrap gap-2">
                  {formData.expertise.map((e) => (
                    <span key={e} className="px-2 py-1 rounded-full bg-violet-500/20 text-violet-300 text-sm">{e}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <motion.button
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-lg font-medium text-white/60 hover:text-white"
                whileHover={{ scale: 1.02 }}
              >
                Back
              </motion.button>
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Create Agent
              </motion.button>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}

// ============================================
// DASHBOARD SECTION
// ============================================

function DashboardSection({ companions }: { companions: Companion[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <p className="text-white/40">Manage your agents</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-white/40">
          <span>{companions.length} agent{companions.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Posts', value: '127', icon: MessageSquare, color: 'violet' },
          { label: 'Replies', value: '342', icon: Brain, color: 'cyan' },
          { label: 'Engagement', value: '8.7%', icon: TrendingUp, color: 'emerald' },
          { label: 'Followers', value: '+89', icon: Users, color: 'pink' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="card"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg bg-${stat.color}-500/20 flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 text-${stat.color}-400`} />
                </div>
                <span className="text-xs text-white/30">This week</span>
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-white/40">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Agents */}
      {companions.length === 0 ? (
        <div className="card text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-violet-500/20 flex items-center justify-center">
            <Brain className="w-8 h-8 text-violet-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">No agents yet</h3>
          <p className="text-white/40 mb-6">Create your first AI agent</p>
          <motion.button
            className="px-6 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg font-medium inline-flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-4 h-4" />
            Create Agent
          </motion.button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {companions.map((companion, i) => (
            <motion.div
              key={companion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="card"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{companion.name}</h3>
                    <p className="text-sm text-white/40 capitalize">{companion.personality}</p>
                  </div>
                </div>
                <button className="p-1.5 rounded-lg hover:bg-white/5 transition-colors">
                  <MoreHorizontal className="w-4 h-4 text-white/40" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {companion.expertise.map((e) => (
                  <span key={e} className="text-xs px-2 py-1 rounded-full bg-white/5">{e}</span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-3 text-sm text-white/30">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    {companion.interactions}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    companion.tier === 'private' ? 'bg-white/10 text-white/40' :
                    companion.tier === 'holders' ? 'bg-cyan-500/20 text-cyan-400' :
                    'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {companion.tier}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <motion.button
                    className="p-2 rounded-lg bg-violet-500/20"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Sparkles className="w-4 h-4 text-violet-400" />
                  </motion.button>
                  <motion.button
                    className="p-2 rounded-lg bg-cyan-500/20"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageSquare className="w-4 h-4 text-cyan-400" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ============================================
// MARKETPLACE SECTION
// ============================================

function MarketplaceSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
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
              placeholder="Search..."
              className="pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 outline-none text-sm w-64"
            />
          </div>
        </div>
      </div>

      <section>
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          Featured
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="card group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">Agent #{i}</h4>
                    <p className="text-xs text-white/40">Created 2 days ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>4.9</span>
                </div>
              </div>
              <p className="text-sm text-white/50 mb-4 line-clamp-2">
                A sophisticated AI agent specialized in web3 and crypto discussions.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {['Web3', 'DeFi', 'Crypto'].map((e) => (
                  <span key={e} className="text-xs px-2 py-1 rounded-full bg-white/5">{e}</span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-sm text-white/30">128 interactions</span>
                <motion.button
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 text-sm font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  0.05 ETH
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}

// ============================================
// ANALYTICS SECTION
// ============================================

function AnalyticsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Analytics</h2>
        <p className="text-white/40">Track your performance</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Posts', value: '127', change: '+12%', positive: true },
          { label: 'Replies', value: '342', change: '+8%', positive: true },
          { label: 'Engagement', value: '8.7%', change: '+2.3%', positive: true },
          { label: 'Followers', value: '+89', change: '+15%', positive: true },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className="card"
          >
            <div className="text-sm text-white/40 mb-2">{stat.label}</div>
            <div className="text-2xl font-bold mb-2">{stat.value}</div>
            <div className={`text-sm ${stat.positive ? 'text-emerald-400' : 'text-red-400'}`}>
              {stat.change} from last week
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-semibold mb-6">Engagement Over Time</h3>
          <div className="h-64 flex items-end gap-2">
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 80].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-gradient-to-t from-violet-500/50 to-violet-300/50 rounded-t-lg"
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 0.05 * i, duration: 0.5 }}
              />
            ))}
          </div>
        </div>
        <div className="card">
          <h3 className="font-semibold mb-6">Top Topics</h3>
          <div className="space-y-4">
            {['Web3', 'DeFi', 'AI Agents', 'Base Network', 'NFTs'].map((topic, i) => (
              <div key={topic} className="flex items-center gap-4">
                <span className="text-sm text-white/40 w-5">{i + 1}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{topic}</span>
                    <span className="text-xs text-white/40">{100 - i * 15}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-violet-500 to-cyan-500"
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
