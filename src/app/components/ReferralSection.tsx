import { motion } from 'motion/react';
import { Gift, Copy, Check, Trophy, Users, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface ReferralSectionProps {
  referralCode: string;
  userEmail: string;
}

export function ReferralSection({ referralCode, userEmail }: ReferralSectionProps) {
  const [copied, setCopied] = useState(false);
  const [referralCount, setReferralCount] = useState(0);
  const [leaderboard, setLeaderboard] = useState<Array<{ name: string; referralCount: number; city: string }>>([]);
  const [loading, setLoading] = useState(true);

  const referralLink = `${window.location.origin}?ref=${referralCode}`;

  useEffect(() => {
    fetchReferralData();
  }, [userEmail]);

  const fetchReferralData = async () => {
    try {
      // Fetch user stats
      const statsRes = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-97ea5888/referral-stats/${encodeURIComponent(userEmail)}`,
        {
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        }
      );
      const statsData = await statsRes.json();
      if (statsData.success) {
        setReferralCount(statsData.referralCount);
      }

      // Fetch leaderboard
      const leaderRes = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-97ea5888/leaderboard`,
        {
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        }
      );
      const leaderData = await leaderRes.json();
      if (leaderData.success) {
        setLeaderboard(leaderData.leaderboard);
      }
    } catch (error) {
      console.error('Failed to fetch referral data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTierInfo = (count: number) => {
    if (count >= 5000) return { name: '👑 Ultimate Legend', color: 'from-yellow-400 via-yellow-500 to-orange-600', reward: '1 YEAR Free Premium + Lifetime VIP' };
    if (count >= 200) return { name: '🚀 Mega Influencer', color: 'from-blue-500 via-purple-500 to-pink-600', reward: '1 Month Free Premium + VIP Badge' };
    if (count >= 50) return { name: '🔥 Super Ambassador', color: 'from-orange-500 via-red-500 to-pink-500', reward: '1 Week Free Premium' };
    return { name: '🌱 Starter', color: 'from-[#00B67A] to-[#00D68F]', reward: 'Refer 50 to unlock' };
  };

  const tier = getTierInfo(referralCount);
  const progress = Math.min((referralCount / 5000) * 100, 100);
  
  // Extract emoji and title from tier name
  const tierEmoji = tier.name.split(' ')[0];
  const tierTitle = tier.name.substring(tierEmoji.length).trim();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="relative"
    >
      {/* Main Card */}
      <div className="relative bg-gradient-to-br from-[#151515] to-[#0E0E0E] backdrop-blur-xl border-2 border-[#2A2A2A] rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-[0_0_60px_rgba(0,182,122,0.15)]">
        {/* Glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00B67A]/20 to-[#00D68F]/20 rounded-2xl sm:rounded-3xl blur opacity-30 -z-10" />
        
        {/* Header */}
        <div className="text-center mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-[#00B67A]/20 to-[#00D68F]/20 border border-[#00B67A]/30 rounded-full mb-3">
            <Gift className="w-4 h-4 text-[#00D68F]" />
            <span className="text-xs font-bold text-[#00D68F] uppercase tracking-wider">
              Referral Rewards
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">
            Earn Epic Rewards
          </h2>
          <p className="text-xs sm:text-sm text-[#A8C5BA]">
            Share TyrooAI and unlock exclusive perks
          </p>
        </div>

        {/* Current Tier Badge */}
        <div className="mb-6">
          <div className={`relative p-5 bg-gradient-to-br ${tier.color} rounded-2xl overflow-hidden`}>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{tierEmoji}</div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{tierTitle}</h3>
                    <p className="text-white/80 text-xs">{referralCount} referrals</p>
                  </div>
                </div>
                <TrendingUp className="w-6 h-6 text-white/80" />
              </div>
              
              {/* Progress Bar */}
              <div className="mb-2">
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="h-full bg-white rounded-full"
                  />
                </div>
              </div>
              
              <p className="text-white/90 text-sm font-medium">{tier.reward}</p>
            </div>
          </div>
        </div>

        {/* Referral Link */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-[#A8C5BA] mb-2 uppercase tracking-wider">
            Your Referral Link
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 px-4 py-3 bg-[#0E0E0E] border border-[#2A2A2A] rounded-xl text-white text-sm font-mono focus:outline-none focus:border-[#00B67A]"
            />
            <button
              onClick={handleCopy}
              className="px-4 py-3 bg-gradient-to-r from-[#00B67A] to-[#00D68F] hover:from-[#00D68F] hover:to-[#00B67A] text-white rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(0,182,122,0.4)] flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Reward Tiers */}
        <div className="mb-5">
          <h4 className="text-xs font-semibold text-[#A8C5BA] mb-3 uppercase tracking-wider">Unlock Rewards</h4>
          <div className="space-y-2">
            {[
              { refs: 50, reward: '1 Week Free Premium', icon: '🔥' },
              { refs: 200, reward: '1 Month Free Premium + VIP Badge', icon: '🚀' },
              { refs: 5000, reward: '1 YEAR Free Premium + Lifetime VIP', icon: '👑' },
            ].map((tier, i) => (
              <div
                key={i}
                className={`flex items-center justify-between p-3 rounded-xl ${
                  referralCount >= tier.refs
                    ? 'bg-gradient-to-r from-[#00B67A]/20 to-[#00D68F]/20 border border-[#00B67A]/30'
                    : 'bg-[#0E0E0E] border border-[#2A2A2A]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{tier.icon}</span>
                  <div>
                    <p className="text-white text-sm font-semibold">
                      {tier.reward}
                    </p>
                    <p className="text-[#6B7C76] text-xs">
                      Refer {tier.refs} friends
                    </p>
                  </div>
                </div>
                {referralCount >= tier.refs && (
                  <Check className="w-5 h-5 text-[#00D68F]" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        {leaderboard.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-4 h-4 text-[#00D68F]" />
              <h4 className="text-xs font-semibold text-[#A8C5BA] uppercase tracking-wider">Top Referrers</h4>
            </div>
            <div className="space-y-2">
              {leaderboard.slice(0, 5).map((user, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-[#0E0E0E] border border-[#2A2A2A] rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      i === 0 ? 'bg-yellow-500 text-yellow-900' :
                      i === 1 ? 'bg-gray-400 text-gray-900' :
                      i === 2 ? 'bg-orange-600 text-orange-900' :
                      'bg-[#2A2A2A] text-[#6B7C76]'
                    }`}>
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">{user.name}</p>
                      <p className="text-[#6B7C76] text-xs">{user.city || 'Unknown'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#00B67A]/10 border border-[#00B67A]/30 rounded-full">
                    <Users className="w-3 h-3 text-[#00D68F]" />
                    <span className="text-[#00D68F] text-xs font-bold">{user.referralCount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}