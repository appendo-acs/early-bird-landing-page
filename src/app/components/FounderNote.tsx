import { motion } from "motion/react";
import { Quote, Heart, Sparkles } from "lucide-react";
import founderImage from "../../assets/founder.png";

export function FounderNote() {
  return (
    <section className="relative py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#00B67A]/20 to-[#00D68F]/20 rounded-3xl blur-2xl opacity-30" />

          <div className="relative bg-gradient-to-br from-[#151515]/95 to-[#0E0E0E]/95 backdrop-blur-xl border-2 border-[#2A2A2A] rounded-3xl overflow-hidden">
            {/* Decorative top bar */}
            <div className="h-1.5 bg-gradient-to-r from-[#00B67A] via-[#00D68F] to-[#00B67A]" />

            <div className="p-6 sm:p-10">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden ring-4 ring-[#00B67A]/20 shadow-lg">
                    <img
                      src={founderImage}
                      alt="TyrooAI Founder"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#00D68F] rounded-full border-2 border-[#0E0E0E] flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    A Message from Our Founder
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A8C5BA]">
                    Why we built TyrooAI
                  </p>
                </div>
              </div>

              {/* Quote Icon */}
              <div className="mb-4">
                <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-[#00B67A]/30" />
              </div>

              {/* Story Content */}
              <div className="space-y-4 sm:space-y-5 text-sm sm:text-base text-[#E8F5F0] leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  I still remember the sleepless nights before my first
                  interview—
                  <span className="text-[#00D68F] font-medium">
                    the anxiety, the self-doubt, the endless "what ifs."
                  </span>{" "}
                  I wasn't alone in this struggle, and that's exactly why we
                  created TyrooAI.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Every year,{" "}
                  <span className="text-white font-semibold">
                    millions of talented individuals
                  </span>{" "}
                  struggle not because they lack skills, but because they lack
                  the right preparation, guidance, and confidence. Traditional
                  career coaching is expensive, resume services are overpriced,
                  and{" "}
                  <span className="text-[#00D68F] font-medium">
                    quality interview prep is hard to find.
                  </span>
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <span className="text-[#00D68F] font-semibold">
                    We believe everyone deserves a fair shot at their dream
                    career.
                  </span>{" "}
                  That's why we're using cutting-edge AI to democratize career
                  preparation—making world-class interview coaching, resume
                  building, and career guidance accessible to everyone,
                  everywhere.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="relative pl-4 border-l-4 border-[#00B67A] bg-[#00B67A]/5 py-3 pr-4 rounded-r-xl"
                >
                  <p className="text-white font-medium italic">
                    "As an early bird member, you're not just getting free
                    perks—you're becoming part of a movement to transform how
                    people prepare for careers. Your feedback will shape the
                    future of TyrooAI."
                  </p>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="text-[#A8C5BA]"
                >
                  Thank you for believing in our vision. Together, we'll make
                  career success achievable for everyone. 🚀
                </motion.p>
              </div>

              {/* Signature */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="mt-8 pt-6 border-t border-[#2A2A2A] flex items-center justify-between flex-wrap gap-4"
              >
                <div>
                  <p className="text-white font-bold text-base sm:text-lg">
                    The TyrooAI Team
                  </p>
                  <p className="text-xs sm:text-sm text-[#A8C5BA]">
                    Building the future of career preparation
                  </p>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#00B67A]/20 to-[#00D68F]/20 border border-[#00B67A]/30">
                  <Heart
                    className="w-4 h-4 text-[#00D68F]"
                    fill="currentColor"
                  />
                  <span className="text-xs sm:text-sm text-[#00D68F] font-medium">
                    Made with passion
                  </span>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="mt-6 text-center"
              >
                <button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 bg-gradient-to-r from-[#00B67A] to-[#00D68F] hover:from-[#00D68F] hover:to-[#00B67A] text-white rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-[0_0_40px_rgba(0,182,122,0.5)] active:scale-[0.98]"
                >
                  <Sparkles className="w-4 h-4" />
                  Join the Movement
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
