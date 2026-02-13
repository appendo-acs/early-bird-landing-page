import { motion } from "motion/react";
import {
  Check,
  ArrowLeft,
  Sparkles,
  Crown,
  Bell,
  Users,
  Share2,
  Copy,
} from "lucide-react";
import { useActivitySync } from "../hooks/useActivitySync";
import { useState } from "react";
import { ReferralSection } from "./ReferralSection";
import { CounterSkeleton } from "./Skeleton";

interface SuccessStateProps {
  onReset: () => void;
  userName: string;
  userEmail: string;
  referralCode: string;
}

export function SuccessState({
  onReset,
  userName,
  userEmail,
  referralCode,
}: SuccessStateProps) {
  const firstName = userName.split(" ")[0];
  const { signupCount } = useActivitySync();
  const [copied, setCopied] = useState(false);

  const shareUrl = window.location.origin;
  const shareText = `I just joined TyrooAI's Early Bird program! 🚀 Get exclusive access to AI-powered career preparation tools. Join me: ${shareUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(twitterUrl, "_blank");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16">
      {/* Enhanced animated glow orbs - same as homepage */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-[#00B67A]/30 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-[#00D68F]/30 rounded-full blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.4, 0.6],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Grid pattern overlay - same as homepage */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02] sm:opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 214, 143, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 214, 143, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-lg mx-auto">
        <div className="space-y-6 sm:space-y-8">
          {/* Success Checkmark Badge - Compact */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.5,
              type: "spring",
              bounce: 0.6,
            }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Pulsing ring */}
              <motion.div
                className="absolute inset-0 w-16 h-16 rounded-full bg-[#00B67A]/30"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />

              {/* Checkmark circle */}
              <div className="relative w-16 h-16 bg-gradient-to-br from-[#00B67A] to-[#00D68F] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(0,182,122,0.5)]">
                <Check className="w-8 h-8 text-white" strokeWidth={3} />
              </div>
            </div>
          </motion.div>

          {/* Main Headline - Compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center space-y-2"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              You're In, <span className="text-[#00D68F]">{firstName}</span>!
            </h1>
            <p className="text-sm sm:text-base text-[#A8C5BA]">
              Welcome to the exclusive early bird program
            </p>
          </motion.div>

          {/* Early Bird Badge - Same style as homepage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#00B67A]/20 to-[#00D68F]/20 border border-[#00B67A]/30 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D68F] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D68F]"></span>
              </span>
              <span className="text-xs sm:text-sm font-medium text-[#00D68F]">
                {`You're Early Bird #${signupCount}`}
              </span>
            </div>
          </motion.div>

          {/* Main Card - Same design as homepage form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            {/* Form Container - Same styling */}
            <div className="relative bg-gradient-to-br from-[#151515] to-[#0E0E0E] backdrop-blur-xl border-2 border-[#2A2A2A] rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-[0_0_60px_rgba(0,182,122,0.15)]">
              {/* Glow effect - same as form */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00B67A]/20 to-[#00D68F]/20 rounded-2xl sm:rounded-3xl blur opacity-30 -z-10" />

              {/* Header */}
              <div className="text-center mb-5 sm:mb-6">
                <div className="inline-block px-4 py-1.5 bg-[#00B67A]/10 border border-[#00B67A]/30 rounded-full mb-3">
                  <span className="text-xs font-bold text-[#00D68F] uppercase tracking-wider">
                    Exclusive Perks Unlocked
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  ₹5,000+ Value
                </h2>
                <p className="text-xs sm:text-sm text-[#A8C5BA]">
                  Available only to early bird members
                </p>
              </div>

              {/* Benefits Grid - Compact 2x2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-6">
                {[
                  {
                    icon: Crown,
                    text: "VIP Access First",
                    highlight: "Launch day priority",
                  },
                  {
                    icon: Sparkles,
                    text: "Beta Features",
                    highlight: "Test AI tools early",
                  },
                  {
                    icon: Bell,
                    text: "Priority Support",
                    highlight: "Instant assistance",
                  },
                  {
                    icon: Users,
                    text: "Exclusive Community",
                    highlight: "Founder access",
                  },
                ].map((benefit, i) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-start gap-3 p-3 sm:p-4 bg-[#0E0E0E] border border-[#2A2A2A] rounded-xl"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#00B67A] to-[#00D68F] rounded-lg flex items-center justify-center">
                        <Icon
                          className="w-4 h-4 text-white"
                          strokeWidth={2.5}
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-white font-semibold text-xs sm:text-sm leading-tight">
                          {benefit.text}
                        </p>
                        <p className="text-[#6B7C76] text-[10px] sm:text-xs mt-0.5">
                          {benefit.highlight}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-[#2A2A2A] to-transparent mb-5 sm:mb-6" />

              {/* What's Next - Simplified */}
              <div className="space-y-3">
                <p className="text-xs text-[#6B7C76] uppercase tracking-wider font-semibold text-center">
                  What Happens Next
                </p>

                <div className="space-y-2.5">
                  {[
                    {
                      number: "1",
                      title: "Check Your Email",
                      desc: "Confirmation sent with exclusive details",
                    },
                    {
                      number: "2",
                      title: "Get Launch Notification",
                      desc: "VIP access before public release",
                    },
                  ].map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + i * 0.1 }}
                      className="flex items-start gap-3 p-3 sm:p-4 bg-[#0E0E0E] border border-[#2A2A2A] rounded-xl"
                    >
                      <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-[#00B67A] to-[#00D68F] rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xs">
                          {step.number}
                        </span>
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className="text-white font-semibold text-xs sm:text-sm">
                          {step.title}
                        </h4>
                        <p className="text-[#A8C5BA] text-[10px] sm:text-xs mt-0.5">
                          {step.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* FOMO Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="text-center"
          >
            <p className="text-xs sm:text-sm text-[#6B7C76] mb-3">
              <span className="text-[#00D68F] font-semibold">
                Limited spots.
              </span>{" "}
              Share with friends before it's too late!
            </p>
          </motion.div>

          {/* YouTube Video Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.15 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-[#151515] to-[#0E0E0E] backdrop-blur-xl border-2 border-[#2A2A2A] rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-[0_0_60px_rgba(0,182,122,0.15)]">
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00B67A]/20 to-[#00D68F]/20 rounded-2xl sm:rounded-3xl blur opacity-30 -z-10" />

              {/* Video Header */}
              <div className="text-center mb-3 sm:mb-4">
                <p className="text-xs text-[#6B7C76] uppercase tracking-wider font-semibold mb-1">
                  See What's Coming
                </p>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Watch TyrooAI in Action
                </h3>
              </div>

              {/* YouTube Embed */}
              <div
                className="relative w-full overflow-hidden rounded-xl"
                style={{ paddingBottom: "56.25%" }}
              >
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/b1EgmaiqVDU"
                  title="TyrooAI Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ border: "none" }}
                />
              </div>
            </div>
          </motion.div>

          {/* Referral Program Section */}
          {/* <ReferralSection referralCode={referralCode} userEmail={userEmail} /> */}

          {/* Share Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3"
          >
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0E0E0E] border border-[#2A2A2A] rounded-xl text-[#A8C5BA] hover:text-[#00D68F] hover:border-[#00B67A] transition-all text-xs sm:text-sm font-medium"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Link</span>
                </>
              )}
            </button>

            <button
              onClick={handleWhatsAppShare}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0E0E0E] border border-[#2A2A2A] rounded-xl text-[#A8C5BA] hover:text-[#00D68F] hover:border-[#00B67A] transition-all text-xs sm:text-sm font-medium"
            >
              <Share2 className="w-4 h-4" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={handleTwitterShare}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0E0E0E] border border-[#2A2A2A] rounded-xl text-[#A8C5BA] hover:text-[#00D68F] hover:border-[#00B67A] transition-all text-xs sm:text-sm font-medium"
            >
              <Share2 className="w-4 h-4" />
              <span>Twitter</span>
            </button>
          </motion.div>

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="flex justify-center"
          >
            <button
              onClick={onReset}
              className="group inline-flex items-center gap-2 text-[#A8C5BA] hover:text-[#00D68F] transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to homepage</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
