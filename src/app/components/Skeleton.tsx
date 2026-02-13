import { motion } from 'motion/react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ 
  className = '', 
  variant = 'rectangular',
  width,
  height 
}: SkeletonProps) {
  const baseClasses = 'bg-gradient-to-r from-[#2A2A2A] via-[#353535] to-[#2A2A2A] bg-[length:200%_100%]';
  
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg'
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
      animate={{
        backgroundPosition: ['200% 0', '-200% 0'],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
}

// Pre-built skeleton patterns
export function CounterSkeleton() {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#00B67A]/20 to-[#00D68F]/20 border border-[#00B67A]/30 backdrop-blur-sm">
      <Skeleton variant="circular" width={8} height={8} />
      <Skeleton variant="text" width={120} height={14} />
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="p-4 bg-[#0E0E0E] border border-[#2A2A2A] rounded-xl space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton variant="rectangular" width={32} height={32} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="60%" height={14} />
          <Skeleton variant="text" width="40%" height={10} />
        </div>
      </div>
    </div>
  );
}
