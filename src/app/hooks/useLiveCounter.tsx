import { useState, useEffect } from 'react';

export function useLiveCounter(initialCount: number = 247) {
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
    return initialCount;
  });

  useEffect(() => {
    // Function to increment counter
    const incrementCounter = () => {
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

    // Function to schedule next increment at random interval
    const scheduleNextIncrement = () => {
      // Random interval between 45 seconds to 3 minutes (45000ms to 180000ms)
      const minInterval = 45000; // 45 seconds
      const maxInterval = 180000; // 3 minutes
      const randomInterval = Math.floor(
        Math.random() * (maxInterval - minInterval) + minInterval
      );

      return setTimeout(() => {
        incrementCounter();
        scheduleNextIncrement();
      }, randomInterval);
    };

    // Start the counter
    const timeoutId = scheduleNextIncrement();

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return count;
}
