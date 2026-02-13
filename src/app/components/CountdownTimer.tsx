import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

export function CountdownTimer() {
  // Set countdown to 15 days from now
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Dynamic spots claimed that increases with time
  const [spotsClaimed, setSpotsClaimed] = useState(25);
  const [targetDate] = useState(() => {
    const target = new Date();
    target.setDate(target.getDate() + 15);
    return target;
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });

        // Calculate progress based on hours elapsed: starts at 25% and progresses to 95% over 15 days (360 hours)
        const totalDuration = 15 * 24 * 60 * 60 * 1000; // 15 days in milliseconds
        const elapsed = totalDuration - difference;
        const hoursElapsed = elapsed / (1000 * 60 * 60); // Convert to hours
        
        const progressPerHour = 70 / 360; // 70% increase over 360 hours (from 25% to 95%)
        const startProgress = 25;
        
        const calculatedProgress = startProgress + (hoursElapsed * progressPerHour);
        setSpotsClaimed(Math.min(Math.floor(calculatedProgress), 95));
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section className="relative py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#00B67A]/20 to-[#00D68F]/20 rounded-2xl blur-xl opacity-60" />
          
          <div className="relative bg-gradient-to-br from-[#151515]/95 to-[#0E0E0E]/95 backdrop-blur-xl border-2 border-[#00B67A]/40 rounded-2xl p-5 sm:p-6 overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(0, 214, 143, 0.5) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 214, 143, 0.5) 1px, transparent 1px)
                  `,
                  backgroundSize: '30px 30px',
                }}
              />
            </div>

            {/* Header */}
            <div className="relative text-center mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-3 rounded-full bg-[#00B67A]/10 border border-[#00B67A]/30">
                <Zap className="w-3.5 h-3.5 text-[#00D68F]" />
                <span className="text-xs font-medium text-[#00D68F]">
                  Early Bird Access Closing Soon
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#A8C5BA]">Progress</span>
                <span className="text-xs font-semibold text-[#00D68F]">{spotsClaimed}% spots claimed</span>
              </div>
              
              {/* Progress bar container */}
              <div className="relative h-3 bg-[#0E0E0E]/80 border border-[#2A2A2A] rounded-full overflow-hidden">
                {/* Progress fill with animation */}
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#00B67A] to-[#00D68F] rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${spotsClaimed}%` }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" 
                    style={{
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 2s infinite'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Time Remaining */}
            <div className="relative text-center mb-4">
              <p className="text-sm text-[#6B7C76] mb-1">
                Time Remaining
              </p>
              <p className="text-lg sm:text-xl font-bold text-white">
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
              </p>
            </div>

            {/* Value Proposition */}
            <p className="text-center text-xs sm:text-sm text-[#A8C5BA] mb-4">
              Lock in <span className="text-[#00D68F] font-semibold">₹5,000+ worth</span> of exclusive perks
            </p>

            {/* CTA Button */}
            <div className="text-center">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 bg-gradient-to-r from-[#00B67A] to-[#00D68F] hover:from-[#00D68F] hover:to-[#00B67A] text-white rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-[0_0_40px_rgba(0,182,122,0.5)] active:scale-[0.98]"
              >
                🎯 Secure Your Spot Now
              </button>
              <p className="text-[10px] text-[#6B7C76] mt-2">
                ⚡ Only {100 - spotsClaimed}% spots remaining
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}