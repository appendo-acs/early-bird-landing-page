import { motion } from 'motion/react';
import { Check, X, Crown, Users } from 'lucide-react';

const comparisonData = [
  {
    feature: 'AI Mock Interviews',
    earlyBird: '3 Free Sessions',
    regular: 'Pay per use',
    highlight: true,
  },
  {
    feature: 'Resume Builder',
    earlyBird: '1 Free Resume',
    regular: 'Pay per resume',
    highlight: true,
  },
  {
    feature: 'Resume Analysis',
    earlyBird: 'Unlimited',
    regular: 'Limited scans',
    highlight: true,
  },
  {
    feature: 'Career Coaching',
    earlyBird: '1 Free Session',
    regular: 'Premium only',
    highlight: false,
  },
  {
    feature: 'Salary Negotiation Kit',
    earlyBird: 'Full Access',
    regular: 'Limited access',
    highlight: false,
  },
  {
    feature: 'Priority Support',
    earlyBird: true,
    regular: false,
    highlight: false,
  },
  {
    feature: 'Early Bird Badge',
    earlyBird: true,
    regular: false,
    highlight: false,
  },
  {
    feature: 'Platform Access',
    earlyBird: 'Lifetime',
    regular: 'Lifetime',
    highlight: false,
  },
  {
    feature: 'Total Value',
    earlyBird: '₹5,294 FREE',
    regular: '₹0',
    highlight: true,
    isTotal: true,
  },
];

export function ComparisonTable() {
  return (
    <section className="relative py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-gradient-to-r from-[#00B67A]/10 to-[#00D68F]/10 border border-[#00B67A]/20">
            <Crown className="w-4 h-4 text-[#00D68F]" />
            <span className="text-xs sm:text-sm font-medium text-[#00D68F]">
              Exclusive Comparison
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            See What <span className="text-[#00D68F]">Early Birds</span> Get
          </h2>
          <p className="text-sm sm:text-base text-[#A8C5BA] max-w-2xl mx-auto">
            Compare the incredible perks early bird members receive versus regular users
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl"
        >
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#00B67A]/20 to-[#00D68F]/20 blur-xl opacity-40" />
          
          <div className="relative bg-[#151515]/90 backdrop-blur-xl border-2 border-[#2A2A2A] overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 p-4 sm:p-6 border-b border-[#2A2A2A]">
              <div className="text-left">
                <p className="text-xs sm:text-sm font-medium text-[#A8C5BA]">Features</p>
              </div>
              
              {/* Early Bird Column Header */}
              <div className="text-center">
                <div className="inline-flex flex-col items-center gap-1 px-3 py-2 rounded-xl bg-gradient-to-br from-[#00B67A]/20 to-[#00D68F]/20 border border-[#00B67A]/40">
                  <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-[#00D68F]" />
                  <p className="text-xs sm:text-sm font-bold text-[#00D68F]">Early Bird</p>
                </div>
              </div>
              
              {/* Regular User Column Header */}
              <div className="text-center">
                <div className="inline-flex flex-col items-center gap-1 px-3 py-2 rounded-xl bg-[#0E0E0E]/50 border border-[#2A2A2A]">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#6B7C76]" />
                  <p className="text-xs sm:text-sm font-medium text-[#A8C5BA]">Regular User</p>
                </div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-[#2A2A2A]">
              {comparisonData.map((row, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 * index }}
                  className={`grid grid-cols-3 gap-3 sm:gap-4 p-4 sm:p-5 ${
                    row.highlight ? 'bg-[#00B67A]/5' : ''
                  } ${row.isTotal ? 'bg-gradient-to-r from-[#00B67A]/10 to-[#00D68F]/10 border-t-2 border-[#00B67A]/30' : ''}`}
                >
                  {/* Feature Name */}
                  <div className="flex items-center">
                    <p className={`text-xs sm:text-sm ${
                      row.isTotal ? 'font-bold text-white' : 'text-[#E8F5F0]'
                    }`}>
                      {row.feature}
                    </p>
                  </div>

                  {/* Early Bird Value */}
                  <div className="flex items-center justify-center">
                    {typeof row.earlyBird === 'boolean' ? (
                      row.earlyBird ? (
                        <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#00B67A] rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" strokeWidth={3} />
                        </div>
                      ) : (
                        <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#2A2A2A] rounded-full flex items-center justify-center">
                          <X className="w-4 h-4 text-[#6B7C76]" strokeWidth={3} />
                        </div>
                      )
                    ) : (
                      <p className={`text-xs sm:text-sm text-center ${
                        row.isTotal 
                          ? 'font-bold text-[#00D68F] text-sm sm:text-base' 
                          : 'font-semibold text-[#00D68F]'
                      }`}>
                        {row.earlyBird}
                      </p>
                    )}
                  </div>

                  {/* Regular User Value */}
                  <div className="flex items-center justify-center">
                    {typeof row.regular === 'boolean' ? (
                      row.regular ? (
                        <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#00B67A] rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" strokeWidth={3} />
                        </div>
                      ) : (
                        <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#2A2A2A] rounded-full flex items-center justify-center">
                          <X className="w-4 h-4 text-[#6B7C76]" strokeWidth={3} />
                        </div>
                      )
                    ) : (
                      <p className={`text-xs sm:text-sm text-center ${
                        row.isTotal 
                          ? 'font-medium text-[#6B7C76] text-sm sm:text-base' 
                          : 'text-[#A8C5BA]'
                      }`}>
                        {row.regular}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-[#0E0E0E] to-[#151515] border-t-2 border-[#2A2A2A] text-center">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 bg-gradient-to-r from-[#00B67A] to-[#00D68F] hover:from-[#00D68F] hover:to-[#00B67A] text-white rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-[0_0_40px_rgba(0,182,122,0.5)] active:scale-[0.98]"
              >
                <Crown className="w-4 h-4 sm:w-5 sm:h-5" />
                Become an Early Bird Member
              </button>
              <p className="text-xs text-[#6B7C76] mt-3">
                🎁 Lock in ₹5,294 worth of perks forever
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
