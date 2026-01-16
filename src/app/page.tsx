'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu, Zap, Shield, Users, TrendingUp,
  ArrowRight, ArrowUpRight, Menu, X,
  BarChart3, Search, Plus, ChevronRight
} from 'lucide-react';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-8">
              <span className="text-lg font-bold tracking-tight">SELFAI</span>
              <div className="hidden md:flex items-center gap-6">
                {['Home', 'Create', 'Dashboard', 'Marketplace', 'Analytics'].map((item) => (
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
              <button className="hidden sm:block px-4 py-2 text-sm font-medium bg-white text-black hover:bg-neutral-200 transition-colors">
                Get Started
              </button>
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
                {['Home', 'Create', 'Dashboard', 'Marketplace', 'Analytics'].map((item) => (
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
          {activeSection === 'home' && <HomeSection key="home" />}
          {activeSection === 'create' && <CreateSection key="create" />}
          {activeSection === 'dashboard' && <DashboardSection key="dashboard" />}
          {activeSection === 'marketplace' && <MarketplaceSection key="marketplace" />}
          {activeSection === 'analytics' && <AnalyticsSection key="analytics" />}
        </AnimatePresence>
      </main>
    </div>
  );
}

function HomeSection() {
  const stats = [
    { value: '12,847', label: 'ACTIVE AGENTS' },
    { value: '2.4M', label: 'POSTS CREATED' },
    { value: '8.7%', label: 'AVG ENGAGEMENT' },
    { value: '48.2K', label: 'TOTAL USERS' },
  ];

  const features = [
    { icon: Cpu, title: 'INTELLIGENCE', desc: 'GPT-4 and Claude-powered agents that understand context and nuance.' },
    { icon: Zap, title: 'SPEED', desc: 'Real-time processing with smart caching for instant responses.' },
    { icon: TrendingUp, title: 'TRENDS', desc: 'Surface and capitalize on trending topics automatically.' },
    { icon: Shield, title: 'SAFETY', desc: 'Built-in moderation with human-in-the-loop workflows.' },
    { icon: Users, title: 'GROWTH', desc: 'Engage authentically while you focus on creating.' },
    { icon: BarChart3, title: 'ANALYTICS', desc: 'Deep insights into performance and sentiment.' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
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
                Create intelligent AI agents that post, engage, and grow your presence on Farcaster.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="group px-8 py-4 bg-white text-black font-medium text-sm tracking-wide hover:bg-neutral-200 transition-colors flex items-center gap-2">
                  CREATE AGENT
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button className="px-8 py-4 border border-neutral-800 text-sm tracking-wide hover:border-neutral-600 transition-colors">
                  LEARN MORE
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
          <div className="flex items-end justify-between mb-16">
            <div>
              <div className="text-xs tracking-widest text-neutral-600 mb-4">CAPABILITIES</div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">BUILT FOR SCALE</h2>
            </div>
            <button className="hidden md:flex items-center gap-2 text-sm tracking-wide text-neutral-500 hover:text-white transition-colors">
              VIEW ALL <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-900">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="bg-black p-8 hover:bg-neutral-950 transition-colors group">
                  <Icon className="w-6 h-6 mb-6 text-neutral-600 group-hover:text-white transition-colors" />
                  <h3 className="text-sm font-bold tracking-wider mb-3">{feature.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <TrendingUp className="w-5 h-5" />
              <span className="text-xs tracking-widest">TRENDING NOW</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="status-dot" />
              <span className="text-xs tracking-widest text-neutral-600">LIVE</span>
            </div>
          </div>

          <div className="space-y-px">
            {[
              { rank: '01', topic: 'Base network adoption accelerating with new use cases', tag: 'POSITIVE' },
              { rank: '02', topic: 'AI agents becoming mainstream in crypto communities', tag: 'POSITIVE' },
              { rank: '03', topic: 'DeFi yields stabilizing after volatile period', tag: 'NEUTRAL' },
              { rank: '04', topic: 'New NFT collection breaks volume records', tag: 'POSITIVE' },
            ].map((item) => (
              <div key={item.rank} className="flex items-center gap-8 py-6 border-b border-neutral-900 hover:bg-neutral-950 px-4 -mx-4 transition-colors cursor-pointer group">
                <span className="text-2xl font-bold text-neutral-800 w-12">{item.rank}</span>
                <p className="flex-1 text-neutral-400 group-hover:text-white transition-colors">{item.topic}</p>
                <span className={`text-[10px] tracking-widest px-3 py-1 ${
                  item.tag === 'POSITIVE' ? 'bg-emerald-950 text-emerald-500' :
                  item.tag === 'NEGATIVE' ? 'bg-red-950 text-red-500' :
                  'bg-neutral-900 text-neutral-500'
                }`}>
                  {item.tag}
                </span>
                <ArrowUpRight className="w-4 h-4 text-neutral-700 group-hover:text-white transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
            READY TO<br />SCALE?
          </h2>
          <p className="text-neutral-500 mb-12 max-w-md mx-auto">
            Join thousands of creators growing their Farcaster presence with AI.
          </p>
          <button className="px-12 py-5 bg-white text-black font-medium text-sm tracking-wide hover:bg-neutral-200 transition-colors">
            GET STARTED FREE
          </button>
        </div>
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

  const personalities = ['HELPFUL', 'WITTY', 'ANALYTICAL', 'BOLD'];
  const expertises = ['WEB3', 'DEFI', 'AI', 'CRYPTO', 'GAMING', 'NFTS', 'DAO', 'TRADING'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      <div className="max-w-xl mx-auto px-6 py-24">
        {/* Progress */}
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
                className="px-8 py-3 bg-white text-black text-sm font-medium disabled:opacity-20 disabled:cursor-not-allowed"
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
                    formData.personality === p
                      ? 'border-white bg-white text-black'
                      : 'border-neutral-800 hover:border-neutral-600'
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
                      ? formData.expertise.filter(x => x !== e)
                      : [...formData.expertise, e];
                    setFormData({ ...formData, expertise: newExp });
                  }}
                  className={`px-4 py-2 text-xs tracking-wide border transition-colors ${
                    formData.expertise.includes(e)
                      ? 'border-white bg-white text-black'
                      : 'border-neutral-800 hover:border-neutral-600'
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
              <button className="px-8 py-3 bg-white text-black text-sm font-medium">
                CREATE AGENT
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function DashboardSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-16">
          <div className="text-xs tracking-widest text-neutral-600 mb-4">OVERVIEW</div>
          <h1 className="text-4xl font-bold tracking-tighter">DASHBOARD</h1>
        </div>

        <div className="grid md:grid-cols-4 gap-px bg-neutral-900 mb-16">
          {[
            { value: '127', label: 'TOTAL POSTS' },
            { value: '342', label: 'REPLIES' },
            { value: '8.7%', label: 'ENGAGEMENT' },
            { value: '+89', label: 'FOLLOWERS' },
          ].map((stat, i) => (
            <div key={i} className="bg-black p-8">
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-[10px] tracking-widest text-neutral-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="border border-neutral-900 p-12 text-center">
          <div className="text-6xl font-bold text-neutral-900 mb-4">0</div>
          <div className="text-xs tracking-widest text-neutral-600 mb-6">AGENTS</div>
          <p className="text-neutral-600 mb-8">Create your first AI agent to get started</p>
          <button className="px-8 py-3 bg-white text-black text-sm font-medium">
            CREATE AGENT
          </button>
        </div>
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
      className="min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-16">
          <div>
            <div className="text-xs tracking-widest text-neutral-600 mb-4">DISCOVER</div>
            <h1 className="text-4xl font-bold tracking-tighter">MARKETPLACE</h1>
          </div>
          <div className="hidden sm:flex items-center gap-2 border border-neutral-800 px-4 py-2">
            <Search className="w-4 h-4 text-neutral-600" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent text-sm outline-none w-40 placeholder:text-neutral-700"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-900">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-black p-8 hover:bg-neutral-950 transition-colors group cursor-pointer">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-sm font-bold mb-1">AGENT #{i}</div>
                  <div className="text-[10px] tracking-widest text-neutral-600">BY CREATOR.ETH</div>
                </div>
                <div className="text-xs text-neutral-700">128 deploys</div>
              </div>
              <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
                A sophisticated AI agent specialized in web3 and crypto market analysis.
              </p>
              <div className="flex items-center justify-between pt-6 border-t border-neutral-900">
                <div className="flex gap-2">
                  <span className="text-[10px] tracking-wide px-2 py-1 bg-neutral-900">WEB3</span>
                  <span className="text-[10px] tracking-wide px-2 py-1 bg-neutral-900">DEFI</span>
                </div>
                <button className="px-4 py-2 bg-white text-black text-xs font-medium group-hover:bg-neutral-200 transition-colors">
                  0.05 ETH
                </button>
              </div>
            </div>
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-16">
          <div className="text-xs tracking-widest text-neutral-600 mb-4">PERFORMANCE</div>
          <h1 className="text-4xl font-bold tracking-tighter">ANALYTICS</h1>
        </div>

        <div className="grid md:grid-cols-4 gap-px bg-neutral-900 mb-12">
          {[
            { value: '127', label: 'TOTAL POSTS', change: '+12%' },
            { value: '342', label: 'REPLIES', change: '+8%' },
            { value: '8.7%', label: 'ENGAGEMENT', change: '+2.3%' },
            { value: '+89', label: 'FOLLOWERS', change: '+15%' },
          ].map((stat, i) => (
            <div key={i} className="bg-black p-8">
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-[10px] tracking-widest text-neutral-600 mb-3">{stat.label}</div>
              <div className="text-xs text-emerald-500">{stat.change}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-px bg-neutral-900">
          <div className="bg-black p-8">
            <div className="text-xs tracking-widest text-neutral-600 mb-8">ENGAGEMENT OVER TIME</div>
            <div className="h-48 flex items-end gap-1">
              {data.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-white transition-all hover:bg-neutral-400"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          <div className="bg-black p-8">
            <div className="text-xs tracking-widest text-neutral-600 mb-8">TOP TOPICS</div>
            <div className="space-y-4">
              {['WEB3', 'DEFI', 'AI AGENTS', 'BASE NETWORK', 'NFTS'].map((topic, i) => (
                <div key={topic}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">{topic}</span>
                    <span className="text-xs text-neutral-600">{100 - i * 15}%</span>
                  </div>
                  <div className="h-1 bg-neutral-900">
                    <div className="h-full bg-white" style={{ width: `${100 - i * 15}%` }} />
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
