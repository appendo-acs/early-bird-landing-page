import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles } from 'lucide-react';
import { useEffect } from 'react';

interface FeaturePopupProps {
  isOpen: boolean;
  onClose: () => void;
  feature: {
    icon: string;
    label: string;
    title: string;
    description: string;
    benefit: string;
  };
}

export function FeaturePopup({ isOpen, onClose, feature }: FeaturePopupProps) {
  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Popup */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00B67A] to-[#00D68F] rounded-3xl blur-xl opacity-40" />
              
              {/* Content */}
              <div className="relative bg-gradient-to-br from-[#151515] to-[#0E0E0E] border-2 border-[#00B67A]/50 rounded-3xl p-6 sm:p-8 shadow-2xl">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[#2A2A2A] hover:bg-[#00B67A]/30 border border-[#2A2A2A] hover:border-[#00B67A]/50 transition-all duration-200 group"
                >
                  <X className="w-4 h-4 text-[#A8C5BA] group-hover:text-white transition-colors" />
                </button>

                {/* Icon & Badge */}
                <div className="flex items-center justify-center mb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="relative"
                  >
                    {/* Icon Glow */}
                    <div className="absolute -inset-3 bg-gradient-to-r from-[#00B67A] to-[#00D68F] rounded-full blur-2xl opacity-50" />
                    
                    {/* Icon Container */}
                    <div className="relative w-20 h-20 bg-gradient-to-br from-[#00B67A] to-[#00D68F] rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-4xl">{feature.icon}</span>
                    </div>

                    {/* Premium Badge */}
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.4, type: "spring" }}
                      className="absolute -top-2 -right-2"
                    >
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] shadow-lg">
                        <Sparkles className="w-3 h-3 text-white" />
                        <span className="text-[9px] font-bold text-white uppercase">Premium</span>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Title */}
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl sm:text-2xl font-bold text-white text-center mb-3"
                >
                  {feature.title}
                </motion.h3>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm sm:text-base text-[#A8C5BA] text-center leading-relaxed mb-5"
                >
                  {feature.description}
                </motion.p>

                {/* Benefit Card */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-r from-[#00B67A]/10 to-[#00D68F]/10 border border-[#00B67A]/30 rounded-2xl p-4 mb-5"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 mt-0.5 bg-[#00B67A] rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-[#6B7C76] uppercase tracking-wide mb-1">Early Bird Benefit</p>
                      <p className="text-sm font-semibold text-[#00D68F]">{feature.benefit}</p>
                    </div>
                  </div>
                </motion.div>

                {/* CTA Button */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onClose();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-3 bg-gradient-to-r from-[#00B67A] to-[#00D68F] hover:from-[#00D68F] hover:to-[#00B67A] text-white rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(0,182,122,0.5)]"
                >
                  Get Early Access Now
                </motion.button>

                {/* Footer Note */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-xs text-center text-[#6B7C76] mt-3"
                >
                  🚀 Limited spots available • Register now
                </motion.p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
