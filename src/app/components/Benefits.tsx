import { motion } from 'motion/react';
import { Zap, FileCheck, Search, MessageSquare, DollarSign, Crown, Sparkles, Target, Lock } from 'lucide-react';

const benefits = [
  {
    icon: Zap,
    title: 'AI Mock Interviews',
    description: 'Practice unlimited mock interviews with our advanced AI interviewer. Get instant, personalized feedback to ace every question.',
    value: '₹999',
    freeQuantity: '3 Sessions Free',
    highlight: true,
    locked: false,
  },
  {
    icon: FileCheck,
    title: 'AI Resume Builder',
    description: 'Create ATS-optimized, professional resumes in minutes. Tailored to your industry and perfectly formatted for success.',
    value: '₹799',
    freeQuantity: '1 Resume Free',
    highlight: true,
    locked: false,
  },
  {
    icon: Search,
    title: 'Resume Analysis',
    description: 'Get comprehensive AI-powered resume scans with actionable insights, keyword optimization, and ATS compatibility checks.',
    value: '₹499',
    freeQuantity: 'Unlimited Access',
    highlight: true,
    locked: false,
  },
  {
    icon: MessageSquare,
    title: 'AI Career Coach',
    description: 'Your 24/7 AI mentor providing personalized career guidance, goal setting, and strategic roadmap planning.',
    value: '₹1,299',
    freeQuantity: '1 Session Free',
    highlight: false,
    locked: true,
  },
  {
    icon: DollarSign,
    title: 'Salary Negotiation Kit',
    description: 'Access proven scripts, data-driven insights, and expert strategies to negotiate confidently and maximize your offers.',
    value: '₹699',
    freeQuantity: 'Full Access',
    highlight: false,
    locked: true,
  },
  {
    icon: Crown,
    title: 'Priority Support + Badge',
    description: 'Get VIP treatment with priority support, exclusive early bird badge, and first access to premium features.',
    value: '₹999',
    freeQuantity: '30 Days Free',
    highlight: false,
    locked: false,
  },
];

export function Benefits() {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-gradient-to-r from-[#00B67A]/10 to-[#00D68F]/10 border border-[#00B67A]/20">
            <Sparkles className="w-4 h-4 text-[#00D68F]" />
            <span className="text-xs sm:text-sm font-medium text-[#00D68F]">
              Early Bird Exclusive Perks
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            Everything You Need to <span className="text-[#00D68F]">Land Your Dream Job</span>
          </h2>
          <p className="text-sm sm:text-base text-[#A8C5BA] max-w-2xl mx-auto">
            Get premium features worth <span className="text-[#00D68F] font-semibold">₹5,294</span> absolutely free as an early bird member
          </p>
          <p className="text-xs text-[#6B7C76] mt-2">
            🔒 Advanced features available with premium upgrade
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 * index }}
                whileHover={{ y: benefit.locked ? 0 : -5 }}
                className={`relative bg-[#151515]/80 backdrop-blur-sm border-2 ${
                  benefit.locked 
                    ? 'border-[#2A2A2A] opacity-70' 
                    : benefit.highlight 
                    ? 'border-[#00B67A]/40' 
                    : 'border-[#2A2A2A]'
                } rounded-2xl p-5 sm:p-6 transition-all duration-300 ${
                  benefit.locked ? '' : 'hover:border-[#00B67A]'
                } group overflow-hidden`}
                style={{
                  boxShadow: benefit.highlight && !benefit.locked
                    ? '0 0 20px rgba(0, 182, 122, 0.1)' 
                    : '0 0 0 rgba(0, 182, 122, 0)',
                }}
                onMouseEnter={(e) => {
                  if (!benefit.locked) {
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 182, 122, 0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!benefit.locked) {
                    e.currentTarget.style.boxShadow = benefit.highlight 
                      ? '0 0 20px rgba(0, 182, 122, 0.1)' 
                      : '0 0 0 rgba(0, 182, 122, 0)';
                  }
                }}
              >
                {/* Lock Overlay */}
                {benefit.locked && (
                  <div className="absolute inset-0 bg-[#0E0E0E]/60 backdrop-blur-[0.5px] rounded-2xl z-30 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] rounded-full flex items-center justify-center border border-[#2A2A2A]">
                        <Lock className="w-6 h-6 text-[#A8C5BA]" />
                      </div>
                      <p className="text-xs font-bold text-[#A8C5BA]">Advanced Feature</p>
                      <p className="text-[10px] text-[#6B7C76] mt-0.5">Premium Only</p>
                    </div>
                  </div>
                )}

                {/* Highlight Badge */}
                {benefit.highlight && !benefit.locked && (
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20">
                    <div className="px-2.5 py-1 rounded-full bg-[#00D68F]/20 border border-[#00D68F]/40 backdrop-blur-sm shadow-lg">
                      <span className="text-[10px] font-bold text-[#00D68F] uppercase tracking-wide">
                        Popular
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="relative z-10">
                  {/* Icon & Value */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${
                      benefit.locked 
                        ? 'from-[#2A2A2A] to-[#1A1A1A]' 
                        : 'from-[#00B67A] to-[#008F5D]'
                    } rounded-xl flex items-center justify-center ${
                      benefit.locked ? '' : 'group-hover:scale-110'
                    } transition-transform duration-300 shadow-lg`}>
                      <Icon className={`w-6 h-6 ${benefit.locked ? 'text-[#6B7C76]' : 'text-white'}`} />
                    </div>
                    {/* Original Value */}
                    <div className="text-right">
                      <p className="text-[10px] text-[#6B7C76] uppercase tracking-wide">Worth</p>
                      <p className="text-sm font-bold text-[#A8C5BA] line-through">{benefit.value}</p>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A8C5BA] leading-relaxed mb-4">
                    {benefit.description}
                  </p>
                  
                  {/* Free Badge */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#2A2A2A]">
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 ${
                        benefit.locked ? 'bg-[#2A2A2A]' : 'bg-[#00B67A]'
                      } rounded-full flex items-center justify-center`}>
                        {benefit.locked ? (
                          <Lock className="w-3 h-3 text-[#6B7C76]" />
                        ) : (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-xs font-semibold ${
                        benefit.locked ? 'text-[#6B7C76]' : 'text-[#00D68F]'
                      }`}>
                        {benefit.freeQuantity}
                      </span>
                    </div>
                    <div className={`px-2.5 py-1 rounded-md ${
                      benefit.locked 
                        ? 'bg-[#2A2A2A] border border-[#2A2A2A]' 
                        : 'bg-gradient-to-r from-[#00B67A]/20 to-[#00D68F]/20 border border-[#00B67A]/30'
                    }`}>
                      <span className={`text-[10px] font-bold ${
                        benefit.locked ? 'text-[#6B7C76]' : 'text-[#00D68F]'
                      } uppercase tracking-wide`}>
                        {benefit.locked ? 'LOCKED' : 'FREE'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Total Value Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8 sm:mt-12"
        >
          <div className="inline-block relative">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00B67A] to-[#00D68F] rounded-2xl blur opacity-30" />
            
            <div className="relative bg-gradient-to-r from-[#151515] to-[#0E0E0E] border-2 border-[#00B67A] rounded-2xl px-6 sm:px-8 py-4 sm:py-5">
              <p className="text-xs sm:text-sm text-[#A8C5BA] mb-1">Total Package Value</p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-[#6B7C76] line-through">₹5,294</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#00B67A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <span className="text-3xl sm:text-4xl font-bold text-[#00D68F]">FREE</span>
              </div>
              <p className="text-xs sm:text-sm text-[#00D68F] font-medium mt-1">
                For Early Bird Members Only
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-10 sm:mt-12"
        >
          <p className="text-sm sm:text-base text-[#A8C5BA] mb-4">
            Don't miss out! Limited spots available.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-[#00B67A] to-[#00D68F] hover:from-[#00D68F] hover:to-[#00B67A] text-white rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg active:scale-[0.98]"
            style={{
              boxShadow: '0 0 30px rgba(0, 182, 122, 0.4)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 50px rgba(0, 182, 122, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 182, 122, 0.4)';
            }}
          >
            <Target className="w-4 h-4 sm:w-5 sm:h-5" />
            Claim Your Free Perks Now
          </button>
        </motion.div>
      </div>
    </section>
  );
}