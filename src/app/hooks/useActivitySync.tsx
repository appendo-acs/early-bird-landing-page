import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Activity {
  id: string;
  name: string;
  city: string;
  timestamp: number;
  isRealUser: boolean; // Flag to distinguish real users from simulated
}

interface ActivitySyncContextType {
  signupCount: number;
  incrementCount: () => void;
  addRealUserActivity: (name: string, city: string) => void;
  latestActivity: Activity | null;
}

const ActivitySyncContext = createContext<ActivitySyncContextType | undefined>(undefined);

export function ActivitySyncProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(() => {
    // Try to get count from localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('tyrooai_signup_count');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Check if stored count is from today
        const storedDate = new Date(parsed.date).toDateString();
        const today = new Date().toDateString();
        if (storedDate === today) {
          return parsed.count;
        }
      }
    }
    return 247; // Default starting count
  });

  const [latestActivity, setLatestActivity] = useState<Activity | null>(null);

  const incrementCount = () => {
    setCount((prevCount) => {
      const newCount = prevCount + 1;
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'tyrooai_signup_count',
          JSON.stringify({
            count: newCount,
            date: new Date().toISOString(),
          })
        );
      }
      return newCount;
    });
  };

  const addRealUserActivity = (name: string, city: string) => {
    const activity: Activity = {
      id: `real-${Date.now()}`,
      name,
      city,
      timestamp: Date.now(),
      isRealUser: true,
    };
    setLatestActivity(activity);
    incrementCount(); // Increment counter when real user joins
  };

  return (
    <ActivitySyncContext.Provider 
      value={{ 
        signupCount: count, 
        incrementCount,
        addRealUserActivity,
        latestActivity,
      }}
    >
      {children}
    </ActivitySyncContext.Provider>
  );
}

export function useActivitySync() {
  const context = useContext(ActivitySyncContext);
  if (context === undefined) {
    throw new Error('useActivitySync must be used within an ActivitySyncProvider');
  }
  return context;
}