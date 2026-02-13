import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'When will TyrooAI launch?',
    answer: 'TyrooAI is launching very soon! As an early bird member, you\'ll be among the first to get notified and receive instant access when we go live. You\'ll also lock in exclusive perks worth ₹5,000+ that won\'t be available to regular users.',
  },
  {
    question: 'Is it really 100% free to join the early bird program?',
    answer: 'Absolutely! No credit card required, no hidden fees, no catches. Simply sign up with your email, and you\'ll instantly secure ₹5,294 worth of premium features completely free. This is our way of thanking our early supporters.',
  },
  {
    question: 'What features do I get as an early bird member?',
    answer: 'You get 3 free AI mock interview sessions, 1 free AI-generated resume, unlimited resume analysis, 1 free career coaching session, full salary negotiation kit access, priority support, and an exclusive early bird badge. All features worth ₹5,294!',
  },
  {
    question: 'How is my data protected?',
    answer: 'Your privacy and security are our top priorities. We use enterprise-grade 256-bit encryption, are GDPR compliant, and never sell your data to third parties. Your personal information is stored securely and only used to provide you with the best career preparation experience.',
  },
  {
    question: 'Will I need to pay anything later?',
    answer: 'Your early bird perks include limited free usage to get you started: 2,000 AI tokens for mock interviews, resume generation, and other AI features. You can use these tokens for 1-3 sessions per feature depending on usage. Once you use your free tokens, you can choose to upgrade to access additional premium features, but there\'s no obligation to do so.',
  },
  {
    question: 'How does the AI mock interview work?',
    answer: 'Our advanced AI interviewer conducts realistic voice-based mock interviews tailored to your industry and role. You\'ll answer questions through voice, just like a real interview. After completion, you receive a comprehensive advanced report with detailed feedback on your responses, communication skills, and improvement suggestions to help you ace your next interview!',
  },
  {
    question: 'Can I cancel or unsubscribe anytime?',
    answer: 'Yes! You can unsubscribe from our emails at any time with a single click. Your early bird perks remain active even if you unsubscribe from marketing emails. We respect your inbox and will never spam you.',
  },
  {
    question: 'What makes TyrooAI different from other platforms?',
    answer: 'TyrooAI is a complete career preparation and hiring ecosystem designed for everyone—students preparing for interviews, colleges managing placements, and companies hiring talent. Our advanced AI-powered platform makes the entire hiring journey stress-free with intelligent automation, personalized preparation tools, and smart matching. Unlike traditional platforms that focus on just one side, we provide an all-in-one solution with a modern, intuitive experience that sets us apart from the competition.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-gradient-to-r from-[#00B67A]/10 to-[#00D68F]/10 border border-[#00B67A]/20">
            <HelpCircle className="w-4 h-4 text-[#00D68F]" />
            <span className="text-xs sm:text-sm font-medium text-[#00D68F]">
              Got Questions?
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            Frequently Asked <span className="text-[#00D68F]">Questions</span>
          </h2>
          <p className="text-sm sm:text-base text-[#A8C5BA] max-w-2xl mx-auto">
            Everything you need to know about TyrooAI and the early bird program
          </p>
        </motion.div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 * index }}
              className="relative"
            >
              {/* Glow effect for open item */}
              {openIndex === index && (
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00B67A]/20 to-[#00D68F]/20 rounded-2xl blur opacity-40" />
              )}

              <div
                className={`relative bg-gradient-to-br from-[#151515]/80 to-[#0E0E0E]/80 backdrop-blur-sm border-2 rounded-2xl overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? 'border-[#00B67A]/50 shadow-[0_0_30px_rgba(0,182,122,0.15)]'
                    : 'border-[#2A2A2A] hover:border-[#00B67A]/30'
                }`}
              >
                {/* Question Button */}
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-4 sm:p-6 flex items-center justify-between gap-4 group"
                >
                  <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-[#00D68F] transition-colors duration-300 pr-4">
                    {faq.question}
                  </h3>
                  
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openIndex === index
                        ? 'bg-gradient-to-br from-[#00B67A] to-[#00D68F]'
                        : 'bg-[#2A2A2A] group-hover:bg-[#00B67A]/20'
                    }`}>
                      <ChevronDown className={`w-4 h-4 transition-colors duration-300 ${
                        openIndex === index ? 'text-white' : 'text-[#A8C5BA]'
                      }`} />
                    </div>
                  </motion.div>
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0">
                        <div className="pt-4 border-t border-[#2A2A2A]">
                          <p className="text-sm sm:text-base text-[#A8C5BA] leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-10 sm:mt-12 p-6 sm:p-8 bg-gradient-to-br from-[#151515]/60 to-[#0E0E0E]/60 backdrop-blur-sm border border-[#2A2A2A] rounded-2xl"
        >
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
            Still have questions?
          </h3>
          <p className="text-sm sm:text-base text-[#A8C5BA] mb-4">
            We're here to help! Join now and reach out to our support team.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 bg-gradient-to-r from-[#00B67A] to-[#00D68F] hover:from-[#00D68F] hover:to-[#00B67A] text-white rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-[0_0_40px_rgba(0,182,122,0.5)] active:scale-[0.98]"
          >
            <HelpCircle className="w-4 h-4" />
            Join Early Bird Program
          </button>
        </motion.div>
      </div>
    </section>
  );
}