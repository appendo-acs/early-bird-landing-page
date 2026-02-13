import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';

interface StickyCTAProps {
  onScrollToTop: () => void;
}

export function StickyCTA({ onScrollToTop }: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling down 300px
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 sm:pb-6 pointer-events-none"
        >
          <div className="max-w-4xl mx-auto pointer-events-auto">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00B67A] to-[#00D68F] rounded-2xl blur-lg opacity-50" />
            
            <div className="relative bg-gradient-to-r from-[#0E0E0E]/95 to-[#151515]/95 backdrop-blur-xl border-2 border-[#00B67A]/50 rounded-2xl shadow-2xl overflow-hidden">
              {/* Animated background shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00B67A]/10 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />

              {/* Content */}
              <div className="relative flex items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4">
                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-bold text-white mb-0.5 leading-tight">
                    Don't miss out on <span className="text-[#00D68F]">₹5,000+ FREE perks!</span>
                  </p>
                  <p className="text-[10px] sm:text-xs text-[#A8C5BA] leading-tight">
                    Limited early bird spots remaining
                  </p>
                </div>

                {/* CTA Button */}
                <button
                  onClick={onScrollToTop}
                  className="flex-shrink-0 inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#00B67A] to-[#00D68F] hover:from-[#00D68F] hover:to-[#00B67A] text-white rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(0,182,122,0.6)] active:scale-[0.95]"
                >
                  <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Join Now</span>
                  <span className="sm:hidden">Join</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
