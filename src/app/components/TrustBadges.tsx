import { motion } from 'motion/react';
import { Shield, Lock, Zap, Award, Clock, Users } from 'lucide-react';

const badges = [
  {
    icon: Shield,
    title: '100% Secure',
    description: '256-bit encryption',
    color: 'from-[#00B67A] to-[#008F5D]',
  },
  {
    icon: Lock,
    title: 'Privacy First',
    description: 'Your data is safe',
    color: 'from-[#00D68F] to-[#00B67A]',
  },
  {
    icon: Zap,
    title: 'No Credit Card',
    description: '100% free signup',
    color: 'from-[#00B67A] to-[#00D68F]',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Enterprise-grade AI',
    color: 'from-[#008F5D] to-[#00D68F]',
  },
  {
    icon: Clock,
    title: 'Instant Access',
    description: 'Get started now',
    color: 'from-[#00D68F] to-[#00B67A]',
  },
  {
    icon: Users,
    title: '1000+ Members',
    description: 'Join the community',
    color: 'from-[#00B67A] to-[#00D68F]',
  },
];

export function TrustBadges() {
  return (
    <section className="relative py-10 sm:py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Trusted by <span className="text-[#00D68F]">Job Seekers Nationwide</span>
          </h3>
          <p className="text-sm sm:text-base text-[#A8C5BA]">
            Your security and success are our top priorities
          </p>
        </motion.div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 * index }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="relative group"
              >
                {/* Glow effect on hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-br from-[#00B67A]/0 to-[#00D68F]/0 group-hover:from-[#00B67A]/30 group-hover:to-[#00D68F]/30 rounded-2xl blur transition-all duration-300" />
                
                <div className="relative bg-gradient-to-br from-[#151515]/80 to-[#0E0E0E]/80 backdrop-blur-sm border border-[#2A2A2A] group-hover:border-[#00B67A]/50 rounded-2xl p-4 sm:p-5 transition-all duration-300 text-center h-full flex flex-col items-center justify-center">
                  {/* Icon */}
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${badge.color} rounded-xl flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>

                  {/* Title */}
                  <h4 className="text-xs sm:text-sm font-bold text-white mb-1 leading-tight">
                    {badge.title}
                  </h4>

                  {/* Description */}
                  <p className="text-[10px] sm:text-xs text-[#A8C5BA] leading-tight">
                    {badge.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#A8C5BA]"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#00D68F] rounded-full animate-pulse" />
            <span>No spam, unsubscribe anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#00D68F] rounded-full animate-pulse" />
            <span>GDPR compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#00D68F] rounded-full animate-pulse" />
            <span>24/7 support available</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
