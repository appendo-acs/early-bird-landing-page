import { motion } from 'motion/react';
import { Play, Video, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { FeaturePopup } from './FeaturePopup';

const featureDetails = [
  {
    icon: '🎤',
    label: 'AI Interview',
    title: 'AI Mock Interviews',
    description: 'Practice unlimited mock interviews with our advanced AI interviewer. Get instant, personalized feedback to ace every question with confidence.',
    benefit: '3 Free Mock Interview Sessions (Worth ₹999)',
  },
  {
    icon: '📄',
    label: 'Resume AI',
    title: 'AI Resume Intelligence',
    description: 'Create ATS-optimized, professional resumes in minutes. Get comprehensive AI-powered analysis with actionable insights and keyword optimization.',
    benefit: '1 Free Resume Build + Unlimited Analysis (Worth ₹1,298)',
  },
  {
    icon: '💰',
    label: 'Salary Tools',
    title: 'Salary Negotiation Toolkit',
    description: 'Access proven scripts, data-driven insights, and expert strategies to negotiate confidently and maximize your job offers like never before.',
    benefit: 'Full Access to Negotiation Kit (Worth ₹699)',
  },
];

export function DemoVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const handleFeatureClick = (index: number) => {
    setSelectedFeature(index);
  };

  const handleClosePopup = () => {
    setSelectedFeature(null);
  };

  return (
    <section className="relative py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-gradient-to-r from-[#00B67A]/10 to-[#00D68F]/10 border border-[#00B67A]/20">
            <Video className="w-4 h-4 text-[#00D68F]" />
            <span className="text-xs sm:text-sm font-medium text-[#00D68F]">
              Platform Preview
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            See <span className="text-[#00D68F]">TyrooAI</span> in Action
          </h2>
          <p className="text-sm sm:text-base text-[#A8C5BA] max-w-2xl mx-auto">
            Watch how our AI-powered platform transforms your career preparation journey
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#00B67A]/30 to-[#00D68F]/30 rounded-3xl blur-2xl opacity-50" />
          
          <div className="relative bg-gradient-to-br from-[#151515]/90 to-[#0E0E0E]/90 backdrop-blur-xl border-2 border-[#00B67A]/40 rounded-3xl overflow-hidden">
            {/* Video Container */}
            <div className="relative aspect-video bg-gradient-to-br from-[#0E0E0E] to-[#1A1A1A] overflow-hidden">
              {!isPlaying ? (
                <>
                  {/* Background Pattern */}
                  <div 
                    className="absolute inset-0 opacity-5"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(0, 214, 143, 0.5) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 214, 143, 0.5) 1px, transparent 1px)
                      `,
                      backgroundSize: '40px 40px',
                    }}
                  />

                  {/* Animated Glow Orbs */}
                  <motion.div
                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00B67A]/20 rounded-full blur-[100px]"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#00D68F]/20 rounded-full blur-[100px]"
                    animate={{
                      scale: [1.2, 1, 1.2],
                      opacity: [0.5, 0.3, 0.5],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <motion.button
                      onClick={handlePlayClick}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative group/play"
                    >
                      {/* Play Button Glow */}
                      <div className="absolute -inset-2 bg-gradient-to-r from-[#00B67A] to-[#00D68F] rounded-full blur-xl opacity-60 group-hover/play:opacity-100 transition-opacity duration-300" />
                      
                      {/* Play Button */}
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#00B67A] to-[#00D68F] rounded-full flex items-center justify-center shadow-2xl ring-4 ring-[#00B67A]/20">
                        <Play className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white ml-1" fill="white" />
                      </div>

                      {/* Pulsing Ring */}
                      <motion.div
                        className="absolute inset-0 border-4 border-[#00D68F] rounded-full"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      />
                    </motion.button>
                  </div>

                  {/* Preview Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-[#00B67A]/90 backdrop-blur-sm border border-[#00D68F]/50 shadow-lg z-20">
                    <span className="text-xs font-bold text-white uppercase tracking-wide">
                      Preview
                    </span>
                  </div>
                </>
              ) : (
                /* YouTube Embed */
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/b1EgmaiqVDU?autoplay=1"
                  title="TyrooAI Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ border: 'none' }}
                />
              )}
            </div>

            {/* Video Info Bar */}
            <div className="bg-gradient-to-r from-[#0E0E0E] to-[#151515] border-t-2 border-[#2A2A2A] p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                    Full Platform Walkthrough
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A8C5BA]">
                    See all features in action • 2:30 minutes
                  </p>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Feature Highlights */}
                  {[
                    { icon: '🎤', label: 'AI Interview' },
                    { icon: '📄', label: 'Resume AI' },
                    { icon: '💰', label: 'Salary Tools' },
                  ].map((item, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#0E0E0E] border border-[#2A2A2A] hover:border-[#00B67A]/50 hover:bg-[#00B67A]/5 transition-all duration-300 cursor-pointer"
                      onClick={() => handleFeatureClick(i)}
                    >
                      <span className="text-base sm:text-lg">{item.icon}</span>
                      <span className="text-[10px] sm:text-xs text-[#A8C5BA] hidden sm:inline">
                        {item.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Below Video */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-8"
        >
          <p className="text-sm sm:text-base text-[#A8C5BA] mb-4">
            Ready to transform your career preparation?
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 bg-gradient-to-r from-[#00B67A] to-[#00D68F] hover:from-[#00D68F] hover:to-[#00B67A] text-white rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-[0_0_40px_rgba(0,182,122,0.5)] active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4" />
            Get Early Bird Access
          </button>
        </motion.div>
      </div>

      {/* Feature Popup */}
      {selectedFeature !== null && (
        <FeaturePopup
          isOpen={true}
          feature={featureDetails[selectedFeature]}
          onClose={handleClosePopup}
        />
      )}
    </section>
  );
}