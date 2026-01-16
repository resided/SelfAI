'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

interface Companion {
  token_id: number;
  name: string;
  personality: string;
  total_interactions: number;
  access_tier: number;
  expertise: string[];
}

interface TrendingTopic {
  topic: string;
  engagement_count: number;
  sentiment: string;
}

export default function Home() {
  const [view, setView] = useState<'landing' | 'mint' | 'dashboard' | 'marketplace'>('landing');
  const [companions, setCompanions] = useState<Companion[]>([]);
  const [trending, setTrending] = useState<TrendingTopic[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  const [mintForm, setMintForm] = useState({
    name: '',
    personality: 'helpful',
    expertise: [] as string[],
    access_tier: 1
  });

  useEffect(() => {
    fetchTrending();
    fetchCompanions();
  }, []);

  const fetchTrending = async () => {
    try {
      const res = await fetch('/api/trending');
      const data = await res.json();
      setTrending(data);
    } catch (e) {
      console.error('Failed to fetch trending');
    }
  };

  const fetchCompanions = async () => {
    try {
      const res = await fetch('/api/companions');
      const data = await res.json();
      setCompanions(data);
    } catch (e) {
      console.error('Failed to fetch companions');
    }
  };

  const mintCompanion = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/companions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...mintForm,
          system_prompt: `You are ${mintForm.name}, a ${mintForm.personality} AI companion on Faracster. ${mintForm.expertise.map(e => `Expert in ${e}.`).join(' ')}`,
          fid: 12345
        })
      });
      const data = await res.json();
      if (data.success) {
        setView('dashboard');
        fetchCompanions();
      }
    } catch (e) {
      console.error('Minting failed', e);
    }
    setLoading(false);
  };

  return (
    <main ref={containerRef} className="min-h-screen animated-bg relative overflow-x-hidden">
      <div className="noise-overlay" />

      <div className="mesh-bg">
        <div className="mesh-blob mesh-blob-1" />
        <div className="mesh-blob mesh-blob-2" />
        <div className="mesh-blob mesh-blob-3" />
      </div>

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-4 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => setView('landing')}
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20" />
                <img src="/logo.svg" alt="Selfai" className="w-8 h-8 relative z-10" />
              </div>
              <motion.div
                className="absolute inset-0 rounded-xl"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">Selfai</h1>
              <p className="text-xs text-white/40">AI Companion</p>
            </div>
          </motion.div>

          <nav className="flex items-center gap-1">
            {[
              { key: 'landing', label: 'Home' },
              { key: 'mint', label: 'Create' },
              { key: 'marketplace', label: 'Market' },
              { key: 'dashboard', label: 'Dashboard' },
            ].map((item) => (
              <motion.button
                key={item.key}
                onClick={() => setView(item.key as any)}
                className={`relative px-5 py-2.5 text-sm font-medium transition-all rounded-lg ${
                  view === item.key
                    ? 'text-white'
                    : 'text-white/50 hover:text-white'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {view === item.key && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/10 rounded-lg border border-white/10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </motion.button>
            ))}
          </nav>
        </div>
      </motion.header>

      <div className="pt-28 pb-20">
        <AnimatePresence mode="wait">
          {view === 'landing' && (
            <LandingView
              key="landing"
              onMint={() => setView('mint')}
              onMarketplace={() => setView('marketplace')}
              trending={trending}
            />
          )}
          {view === 'mint' && (
            <MintView
              key="mint"
              form={mintForm}
              setForm={setMintForm}
              onMint={mintCompanion}
              loading={loading}
              onBack={() => setView('landing')}
            />
          )}
          {view === 'dashboard' && (
            <DashboardView
              key="dashboard"
              companions={companions}
              onInteract={(id) => console.log('Interact with', id)}
            />
          )}
          {view === 'marketplace' && (
            <MarketplaceView
              key="marketplace"
              companions={companions}
              onBuy={(id) => console.log('Buy', id)}
            />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

function LandingView({ onMint, onMarketplace, trending }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-7xl mx-auto px-8"
    >
      <div className="text-center max-w-4xl mx-auto mb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass border border-white/10 mb-10"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500" />
          </span>
          <span className="text-sm text-white/70">Now live on Base</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-7xl font-bold mb-8 tracking-tight"
        >
          <span className="gradient-text">Your AI Butler</span>
          <br />
          <span className="text-white/40">on Faracster</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed"
        >
          Mint intelligent companions that post, reply, and engage autonomously.
          Token-gated. Tradable. Monetizable.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-5 mt-12"
        >
          <motion.button
            onClick={onMint}
            className="btn-primary group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Create Companion</span>
            <motion.div
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-white/20 to-transparent"
            />
          </motion.button>
          <motion.button
            onClick={onMarketplace}
            className="btn-secondary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore Market
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="grid md:grid-cols-3 gap-6 mb-32"
      >
        {[
          { title: 'AI-Powered', desc: 'GPT-4 intelligence with customizable personalities', icon: 'neural' },
          { title: 'Token-Gated', desc: 'Control access with NFT-based permissions', icon: 'lock' },
          { title: 'Monetizable', desc: 'Earn from your companion interactions', icon: 'chart' },
          { title: 'Auto-Schedule', desc: 'Smart posting at optimal times', icon: 'clock' },
          { title: 'Custom Persona', desc: 'Design unique AI identities', icon: 'sparkle' },
          { title: 'Native', desc: 'Built specifically for Faracster', icon: 'network' },
        ].map((feature, i) => (
          <FeatureCard key={i} feature={feature} index={i} />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="glass rounded-3xl p-10 border border-white/10"
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-semibold">Trending on Faracster</h3>
          <div className="flex items-center gap-2 text-white/40">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            Live
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {trending.slice(0, 8).map((topic: TrendingTopic, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.05 }}
              className="group p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/15 transition-all cursor-pointer"
            >
              <p className="text-sm text-white/70 line-clamp-2 mb-4">{topic.topic}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/30">{topic.engagement_count} engagements</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  topic.sentiment === 'positive' ? 'bg-green-500/20 text-green-400' :
                  topic.sentiment === 'negative' ? 'bg-red-500/20 text-red-400' :
                  'bg-white/10 text-white/40'
                }`}>
                  {topic.sentiment}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function FeatureCard({ feature, index }: { feature: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
      className="group p-8 rounded-2xl glass-light border border-white/5 hover:border-white/15 transition-all card-hover cursor-pointer"
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center mb-6">
        <IconSet icon={feature.icon} />
      </div>
      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
      <p className="text-white/40 text-sm leading-relaxed">{feature.desc}</p>
    </motion.div>
  );
}

function IconSet({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    neural: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-purple-400">
        <circle cx="12" cy="12" r="3" />
        <circle cx="4" cy="8" r="2" />
        <circle cx="20" cy="8" r="2" />
        <circle cx="4" cy="16" r="2" />
        <circle cx="20" cy="16" r="2" />
        <path d="M12 15a7 7 0 0 0-7 7m14-7a7 7 0 0 1-7 7m7-7a7 7 0 0 1-7-7m14 7a7 7 0 0 1 7-7" />
      </svg>
    ),
    lock: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-cyan-400">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    chart: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-green-400">
        <path d="M3 3v18h18" />
        <path d="M7 16l4-4 4 4 5-6" />
      </svg>
    ),
    clock: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-orange-400">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    sparkle: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-yellow-400">
        <path d="M12 3L9.5 8.5 4 9.5l4 4.5L7 20l5-5.5 5 5.5-1.5-6L20 9.5l-5.5-1L12 3z" />
      </svg>
    ),
    network: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-pink-400">
        <circle cx="12" cy="5" r="3" />
        <circle cx="5" cy="19" r="3" />
        <circle cx="19" cy="19" r="3" />
        <path d="M12 8v4M8.5 16.5l2-1M15.5 16.5l-2-1" />
      </svg>
    ),
  };
  return icons[icon] || icons.neural;
}

function MintView({ form, setForm, onMint, loading, onBack }: any) {
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
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      className="max-w-3xl mx-auto px-8"
    >
      <motion.button
        onClick={onBack}
        className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-8"
        whileHover={{ x: -5 }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-10 border border-white/10"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Create Your Companion</h2>
          <p className="text-white/40">Design your AI alter ego for Faracster</p>
        </div>

        <div className="space-y-8">
          <div>
            <label className="block text-sm font-medium mb-3 text-white/70">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Give your AI a name"
              className="w-full px-5 py-4 bg-white/5 rounded-xl border border-white/10 focus:border-purple-500/50 outline-none transition-all text-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-4 text-white/70">Personality</label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {personalities.map((p) => (
                <motion.button
                  key={p.value}
                  onClick={() => setForm({ ...form, personality: p.value })}
                  className={`p-4 rounded-xl text-left transition-all border ${
                    form.personality === p.value
                      ? 'bg-purple-500/20 border-purple-500/50'
                      : 'bg-white/5 border-white/5 hover:border-white/20'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-sm font-medium mb-1">{p.label}</div>
                  <div className="text-xs text-white/40">{p.desc}</div>
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-4 text-white/70">Expertise</label>
            <div className="flex flex-wrap gap-3">
              {expertises.map((e) => (
                <motion.button
                  key={e}
                  onClick={() => {
                    const newExp = form.expertise.includes(e)
                      ? form.expertise.filter((x: string) => x !== e)
                      : [...form.expertise, e];
                    setForm({ ...form, expertise: newExp });
                  }}
                  className={`px-4 py-2 rounded-full transition-all text-sm border ${
                    form.expertise.includes(e)
                      ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                      : 'bg-white/5 border-white/10 hover:border-white/30'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {e}
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-4 text-white/70">Access Tier</label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: 1, label: 'Private', desc: 'Only you' },
                { value: 2, label: 'Holders', desc: 'CMATE holders' },
                { value: 3, label: 'Public', desc: 'Everyone' },
              ].map((t) => (
                <motion.button
                  key={t.value}
                  onClick={() => setForm({ ...form, access_tier: t.value })}
                  className={`p-5 rounded-xl text-center transition-all border ${
                    form.access_tier === t.value
                      ? 'bg-purple-500/20 border-purple-500/50'
                      : 'bg-white/5 border-white/5 hover:border-white/20'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-lg font-medium mb-1">{t.label}</div>
                  <div className="text-xs text-white/40">{t.desc}</div>
                </motion.button>
              ))}
            </div>
          </div>

          <motion.button
            onClick={onMint}
            disabled={loading || !form.name}
            className="w-full py-5 rounded-xl font-semibold text-lg transition-all relative overflow-hidden"
            style={{
              background: loading || !form.name
                ? 'rgba(255,255,255,0.05)'
                : 'linear-gradient(135deg, #c084fc, #a855f7)',
            }}
            whileHover={!loading && form.name ? { scale: 1.02 } : {}}
            whileTap={!loading && form.name ? { scale: 0.98 } : {}}
          >
            <span className="relative z-10">
              {loading ? 'Creating...' : 'Mint Companion'}
            </span>
            {!loading && form.name && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            )}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function DashboardView({ companions, onInteract }: { companions: Companion[]; onInteract: (id: number) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      className="max-w-7xl mx-auto px-8"
    >
      <h2 className="text-3xl font-bold mb-10">Your Companions</h2>

      {companions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-3xl p-20 text-center border border-white/10"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
            <img src="/logo.svg" alt="Selfai" className="w-14 h-14" />
          </div>
          <h3 className="text-2xl font-bold mb-3">No companions yet</h3>
          <p className="text-white/40 mb-8 max-w-md mx-auto">
            Mint your first AI companion to get started with intelligent automation on Faracster.
          </p>
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Create First Companion
          </motion.button>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companions.map((comp) => (
            <motion.div
              key={comp.token_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-6 border border-white/10 card-hover"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                  <img src="/logo.svg" alt={comp.name} className="w-8 h-8" />
                </div>
                <span className={`text-xs px-3 py-1.5 rounded-full border ${
                  comp.access_tier === 1
                    ? 'bg-white/5 border-white/10 text-white/40'
                    : comp.access_tier === 2
                    ? 'bg-cyan-500/20 border-cyan-500/30 text-cyan-300'
                    : 'bg-green-500/20 border-green-500/30 text-green-300'
                }`}>
                  {comp.access_tier === 1 ? 'Private' : comp.access_tier === 2 ? 'Holders' : 'Public'}
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-2">{comp.name}</h3>
              <p className="text-white/40 text-sm mb-5 line-clamp-2">{comp.personality}</p>

              <div className="flex flex-wrap gap-2 mb-5">
                {comp.expertise.map((e: string) => (
                  <span key={e} className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-white/50">
                    {e}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-white/5">
                <span className="text-sm text-white/30">
                  {comp.total_interactions} interactions
                </span>
                <motion.button
                  onClick={() => onInteract(comp.token_id)}
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Interact
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function MarketplaceView({ companions, onBuy }: { companions: Companion[]; onBuy: (id: number) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      className="max-w-7xl mx-auto px-8"
    >
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-3">Marketplace</h2>
        <p className="text-white/40">Discover and trade AI companions</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {companions.length === 0 ? (
          [...Array(8)].map((_, i) => (
            <div key={i} className="glass rounded-2xl p-6 border border-white/10 animate-pulse">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5" />
              <div className="h-5 bg-white/5 rounded mb-3" />
              <div className="h-4 bg-white/5 rounded mb-4 w-2/3 mx-auto" />
              <div className="flex justify-center gap-2 mb-4">
                <div className="w-12 h-6 bg-white/5 rounded-full" />
                <div className="w-12 h-6 bg-white/5 rounded-full" />
              </div>
              <div className="h-10 bg-white/5 rounded-xl" />
            </div>
          ))
        ) : (
          companions.map((comp) => (
            <motion.div
              key={comp.token_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-6 border border-white/10 card-hover group"
            >
              <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center relative">
                <img src="/logo.svg" alt={comp.name} className="w-12 h-12" />
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-purple-500/30 to-cyan-500/30" />
              </div>

              <h3 className="text-lg font-semibold text-center mb-2">{comp.name}</h3>
              <p className="text-white/40 text-sm text-center mb-5 line-clamp-2">{comp.personality}</p>

              <div className="flex justify-center flex-wrap gap-2 mb-5">
                {comp.expertise.map((e: string) => (
                  <span key={e} className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-white/50">
                    {e}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-center gap-4 mb-5 text-sm text-white/30">
                <span>{comp.total_interactions} interactions</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>4.9 rating</span>
              </div>

              <motion.button
                onClick={() => onBuy(comp.token_id)}
                className="w-full py-3 rounded-xl font-semibold text-sm relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #c084fc, #a855f7)',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">0.05 ETH</span>
              </motion.button>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}
