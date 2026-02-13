import { motion } from 'motion/react';
import { Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative py-12 px-4 sm:px-6 border-t border-[#2A2A2A]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6"
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#00B67A] to-[#00D68F] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="text-2xl font-bold text-white">TyrooAI</span>
          </div>

          {/* Launching Soon */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00B67A]/10 border border-[#00B67A]/30">
            <span className="text-sm text-[#00D68F] font-medium">
              🚀 Coming Very Soon
            </span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/showcase/tyrooai/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-[#151515] hover:bg-[#00B67A]/20 border border-[#2A2A2A] hover:border-[#00B67A] rounded-full transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-[#A8C5BA] hover:text-[#00D68F]" />
            </a>
            <a
              href="https://www.instagram.com/tyrooai/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-[#151515] hover:bg-[#00B67A]/20 border border-[#2A2A2A] hover:border-[#00B67A] rounded-full transition-all duration-300 hover:scale-110"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-[#A8C5BA] hover:text-[#00D68F]" />
            </a>
          </div>

          {/* Additional info */}
          <p className="text-sm text-[#A8C5BA] text-center">
            AI-Powered Career Preparation & Hiring Platform
          </p>

          {/* Copyright */}
          <p className="text-xs sm:text-sm text-[#6B7C76] mt-4">
            © 2026 TyrooAI. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}