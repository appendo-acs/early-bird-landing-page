import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { useActivitySync } from '../hooks/useActivitySync';
import { soundManager } from '../utils/sound';

const statusOptions = [
  'Student',
  'Fresh Graduate',
  'Job Seeker',
  'Working Professional',
  'Career Switcher',
  'HR/Recruiter',
];

// Sample names for social proof
const recentNames = [
  'Priya', 'Rahul', 'Sneha', 'Arjun', 'Ananya', 'Vikram',
  'Neha', 'Rohan', 'Ishita', 'Karan', 'Diya', 'Aditya'
];

// Generate random name combination
const generateRandomNames = () => {
  const shuffled = [...recentNames].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
};

interface HeroProps {
  onSuccess: (name: string, email: string, referralCode: string) => void;
}

export function Hero({ onSuccess }: HeroProps) {
  const { signupCount, addRealUserActivity, latestActivity } = useActivitySync();
  const [displayNames, setDisplayNames] = useState(generateRandomNames());
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    city: '',
    currentStatus: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update names when counter increases or real user joins
  useEffect(() => {
    if (signupCount > 0) {
      // If there's a real user, show their name first
      if (latestActivity?.isRealUser) {
        const firstName = latestActivity.name.split(' ')[0];
        const otherNames = generateRandomNames().slice(0, 2);
        setDisplayNames([firstName, ...otherNames]);
      } else {
        setDisplayNames(generateRandomNames());
      }
    }
  }, [signupCount, latestActivity]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.currentStatus) {
      newErrors.currentStatus = 'Please select your current status';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      console.log('Submitting registration:', {
        fullName: formData.fullName,
        email: formData.email,
        city: formData.city,
        currentStatus: formData.currentStatus,
      });

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-97ea5888/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            city: formData.city,
            currentStatus: formData.currentStatus,
            timestamp: new Date().toISOString(),
            referralCode: localStorage.getItem('tyroo-ref') || undefined,
          }),
        }
      );

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Registration failed:', errorData);
        throw new Error(errorData.error || 'Registration failed');
      }

      const result = await response.json();
      console.log('Registration successful:', result);

      // Play success sound
      soundManager.playCelebration();

      // Immediately add real user to activity feed - this will trigger:
      // 1. Activity feed update (shows user at top with glow)
      // 2. Counter increase (+1)
      // 3. Names update (shows user's first name)
      addRealUserActivity(formData.fullName, formData.city);

      // Delay before showing success page so user can see:
      // - Their name appear in activity feed with special styling
      // - Counter increase
      // - Names update to show their name
      setTimeout(() => {
        onSuccess(formData.fullName, formData.email, result.referralCode);
      }, 1500); // Increased to 1.5 seconds for better UX
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ submit: 'Something went wrong. Please try again.' });
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16">
      {/* Enhanced animated glow orbs */}
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

      {/* Grid pattern overlay - lighter on mobile */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.02] sm:opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 214, 143, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 214, 143, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-lg mx-auto">
        {/* Mobile-First Vertical Layout */}
        <div className="space-y-8">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0A2F23] border border-[#00B67A]/40 backdrop-blur-sm shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D68F] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D68F]"></span>
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white">
                🚀 Coming Very Soon
              </span>
            </div>
          </motion.div>

          {/* Main Headline - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center space-y-4"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.15]">
              Transform Your Career with{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#00D68F]">AI-Powered</span>
                <motion.span
                  className="absolute bottom-1 sm:bottom-2 left-0 right-0 h-2 sm:h-3 bg-[#00D68F]/20 -z-0"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                />
              </span>
              {' '}Career Intelligence
            </h1>
            
            <p className="text-sm sm:text-base text-[#A8C5BA] leading-relaxed max-w-md mx-auto px-2">
              Master interviews, craft winning resumes, and land your dream job—all powered by cutting-edge AI technology.
            </p>
          </motion.div>

          {/* Social Proof - Personalized Names */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center px-4"
          >
            <p className="text-sm text-[#A8C5BA]">
              <span className="text-[#00D68F] font-semibold">
                {displayNames[0]}, {displayNames[1]}, {displayNames[2]}
              </span>
              {' '}and{' '}
              <span className="text-white font-semibold">{signupCount}+ others</span>
              {' '}joined today
            </p>
          </motion.div>

          {/* Registration Form - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            {/* Form Container */}
            <div className="relative bg-gradient-to-br from-[#151515] to-[#0E0E0E] backdrop-blur-xl border-2 border-[#2A2A2A] rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-[0_0_60px_rgba(0,182,122,0.15)]">
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00B67A]/20 to-[#00D68F]/20 rounded-2xl sm:rounded-3xl blur opacity-30 -z-10" />
              
              {/* Header */}
              <div className="text-center mb-5 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 sm:mb-2">
                  Get Early Bird Access
                </h3>
                <p className="text-xs sm:text-sm text-[#A8C5BA]">
                  Unlock <span className="text-[#00D68F] font-semibold">₹5,000+</span> in exclusive perks
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div className="text-left">
                  <label htmlFor="fullName" className="block text-sm font-medium text-[#E8F5F0] mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-base bg-[#0E0E0E] border-2 border-[#2A2A2A] rounded-xl text-white placeholder-[#6B7C76] focus:outline-none focus:border-[#00B67A] transition-all"
                    style={{ boxShadow: 'none' }}
                    onFocus={(e) => {
                      e.target.style.boxShadow = '0 0 20px rgba(0, 182, 122, 0.3)';
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = 'none';
                    }}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="text-red-400 text-xs sm:text-sm mt-1.5">{errors.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div className="text-left">
                  <label htmlFor="email" className="block text-sm font-medium text-[#E8F5F0] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-base bg-[#0E0E0E] border-2 border-[#2A2A2A] rounded-xl text-white placeholder-[#6B7C76] focus:outline-none focus:border-[#00B67A] transition-all"
                    style={{ boxShadow: 'none' }}
                    onFocus={(e) => {
                      e.target.style.boxShadow = '0 0 20px rgba(0, 182, 122, 0.3)';
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = 'none';
                    }}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs sm:text-sm mt-1.5">{errors.email}</p>
                  )}
                </div>

                {/* City */}
                <div className="text-left">
                  <label htmlFor="city" className="block text-sm font-medium text-[#E8F5F0] mb-1.5">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-base bg-[#0E0E0E] border-2 border-[#2A2A2A] rounded-xl text-white placeholder-[#6B7C76] focus:outline-none focus:border-[#00B67A] transition-all"
                    style={{ boxShadow: 'none' }}
                    onFocus={(e) => {
                      e.target.style.boxShadow = '0 0 20px rgba(0, 182, 122, 0.3)';
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = 'none';
                    }}
                    placeholder="Enter your city"
                  />
                  {errors.city && (
                    <p className="text-red-400 text-xs sm:text-sm mt-1.5">{errors.city}</p>
                  )}
                </div>

                {/* Current Status Dropdown */}
                <div className="text-left">
                  <label htmlFor="currentStatus" className="block text-sm font-medium text-[#E8F5F0] mb-1.5">
                    Current Status
                  </label>
                  <select
                    id="currentStatus"
                    name="currentStatus"
                    value={formData.currentStatus}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-base bg-[#0E0E0E] border-2 border-[#2A2A2A] rounded-xl text-white focus:outline-none focus:border-[#00B67A] transition-all appearance-none cursor-pointer"
                    style={{ 
                      boxShadow: 'none',
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2300B67A'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '1.5em 1.5em',
                    }}
                    onFocus={(e) => {
                      e.target.style.boxShadow = '0 0 20px rgba(0, 182, 122, 0.3)';
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <option value="" disabled className="text-[#6B7C76]">
                      Select your current status
                    </option>
                    {statusOptions.map((status) => (
                      <option key={status} value={status} className="bg-[#0E0E0E] text-white">
                        {status}
                      </option>
                    ))}
                  </select>
                  {errors.currentStatus && (
                    <p className="text-red-400 text-xs sm:text-sm mt-1.5">{errors.currentStatus}</p>
                  )}
                </div>

                {errors.submit && (
                  <p className="text-red-400 text-xs sm:text-sm text-center">{errors.submit}</p>
                )}

                {/* Submit Button - Optimized for mobile touch */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-gradient-to-r from-[#00B67A] to-[#00D68F] hover:from-[#00D68F] hover:to-[#00B67A] active:scale-[0.98] disabled:from-gray-600 disabled:to-gray-700 text-white rounded-xl font-semibold text-base transition-all duration-300 shadow-lg disabled:shadow-none flex items-center justify-center gap-2"
                  style={{
                    boxShadow: '0 0 30px rgba(0, 182, 122, 0.4)',
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Joining...
                    </>
                  ) : (
                    'Join Early Bird Program →'
                  )}
                </button>

                {/* Trust Indicator Below Button */}
                <div className="pt-2 flex items-center justify-center gap-2 text-xs text-[#6B7C76]">
                  <svg className="w-3.5 h-3.5 text-[#00B67A]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>100% Free • No Credit Card Required</span>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Feature Pills - Mobile Friendly */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-2 px-2"
          >
            {[
              'AI Mock Interviews',
              'Resume Builder',
              'Career Coaching',
              'Salary Templates',
              'Resume Analyzer',
              'JD Matcher',
              'Salary Calculator',
              'Salary Negotiation',
              'Interview by Company',
              'Interview by JD',
            ].map((feature, i) => (
              <div
                key={i}
                className="px-3 py-1.5 rounded-lg bg-[#151515]/60 border border-[#2A2A2A] text-xs text-[#A8C5BA] flex items-center gap-1.5 backdrop-blur-sm"
              >
                <svg className="w-3 h-3 text-[#00B67A]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {feature}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}