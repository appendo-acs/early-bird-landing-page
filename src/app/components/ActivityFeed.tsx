import { useState, useEffect } from 'react';
import { UserCircle, Sparkles } from 'lucide-react';
import { useActivitySync, Activity } from '../hooks/useActivitySync';

// Sample names and cities for realistic activity
const names = [
  'Priya', 'Rahul', 'Sneha', 'Arjun', 'Ananya', 'Vikram', 'Neha', 'Rohan',
  'Ishita', 'Karan', 'Diya', 'Aditya', 'Kavya', 'Siddharth', 'Riya', 'Aman',
  'Pooja', 'Harsh', 'Meera', 'Varun', 'Tanvi', 'Nikhil', 'Sara', 'Ayush'
];

const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata',
  'Ahmedabad', 'Jaipur', 'Lucknow', 'Chandigarh', 'Kochi', 'Indore', 'Bhopal',
  'Gurgaon', 'Noida', 'Coimbatore', 'Surat', 'Nagpur', 'Vadodara'
];

export function ActivityFeed() {
  const { incrementCount, latestActivity } = useActivitySync();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activityId, setActivityId] = useState(0);
  const [shouldIncrement, setShouldIncrement] = useState(false);

  // Handle real user activity from form submission
  useEffect(() => {
    if (latestActivity) {
      setActivities(prev => {
        // Add real user to the top of the feed
        return [latestActivity, ...prev].slice(0, 3);
      });
    }
  }, [latestActivity]);

  // Handle counter increment in a separate effect to avoid setState during render
  useEffect(() => {
    if (shouldIncrement) {
      incrementCount();
      setShouldIncrement(false);
    }
  }, [shouldIncrement, incrementCount]);

  useEffect(() => {
    // Generate initial activity
    const generateActivity = (): Activity => {
      const name = names[Math.floor(Math.random() * names.length)];
      const city = cities[Math.floor(Math.random() * cities.length)];
      return {
        id: `sim-${activityId}`,
        name,
        city,
        timestamp: Date.now(),
        isRealUser: false,
      };
    };

    // Add initial activity
    setActivities([generateActivity()]);
    // Don't increment on initial load, only on new activities

    // Add new activity every 5-8 seconds
    const interval = setInterval(() => {
      setActivityId(prev => prev + 1);
      setActivities(prev => {
        const newActivity: Activity = {
          id: `sim-${activityId + 1}`,
          name: names[Math.floor(Math.random() * names.length)],
          city: cities[Math.floor(Math.random() * cities.length)],
          timestamp: Date.now(),
          isRealUser: false,
        };
        // Keep only last 3 activities
        return [newActivity, ...prev].slice(0, 3);
      });
      
      // Trigger counter increment
      setShouldIncrement(true);
    }, Math.random() * 3000 + 5000); // Random between 5-8 seconds

    return () => clearInterval(interval);
  }, [activityId]);

  const getTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 120) return '1 min ago';
    if (seconds < 300) return `${Math.floor(seconds / 60)} mins ago`;
    return '5+ mins ago';
  };

  return (
    <section className="relative py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          {/* Header */}
          <div className="text-center mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00B67A]/10 border border-[#00B67A]/30 mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D68F] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D68F]"></span>
              </span>
              <span className="text-xs font-medium text-[#00D68F]">Live Activity</span>
            </div>
            <p className="text-sm text-[#A8C5BA]">
              People are joining right now!
            </p>
          </div>

          {/* Activity Feed */}
          <div className="relative bg-gradient-to-br from-[#151515]/60 to-[#0E0E0E]/60 backdrop-blur-sm border border-[#2A2A2A] rounded-2xl p-4 sm:p-5 space-y-3">
            {activities.map((activity, index) => (
              <div key={activity.id}>
                <div className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                  activity.isRealUser 
                    ? 'bg-gradient-to-r from-[#00B67A]/20 to-[#00D68F]/20 border-2 border-[#00B67A] shadow-[0_0_20px_rgba(0,182,122,0.3)]' 
                    : 'bg-[#0E0E0E]/50 border border-[#2A2A2A] hover:border-[#00B67A]/30'
                }`}>
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.isRealUser
                        ? 'bg-gradient-to-br from-[#00D68F] to-[#00B67A] shadow-lg'
                        : 'bg-gradient-to-br from-[#00B67A] to-[#00D68F]'
                    }`}>
                      {activity.isRealUser ? (
                        <Sparkles className="w-6 h-6 text-white" />
                      ) : (
                        <UserCircle className="w-6 h-6 text-white" />
                      )}
                    </div>
                    {/* Green dot indicator - only show for newest */}
                    {index === 0 && (
                      <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-[#00D68F] border-2 border-[#0E0E0E] rounded-full" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium leading-tight">
                      <span className={activity.isRealUser ? 'text-[#00D68F] font-bold' : 'text-[#00D68F]'}>
                        {activity.name}
                      </span> from {activity.city}
                      {activity.isRealUser && (
                        <span className="ml-1.5 text-[10px] text-[#00D68F] font-bold">✨ NEW</span>
                      )}
                    </p>
                    <p className="text-xs text-[#6B7C76] mt-0.5">
                      Joined the early bird program
                    </p>
                  </div>

                  {/* Timestamp */}
                  <div className="flex-shrink-0 text-right">
                    <p className="text-[10px] text-[#6B7C76] whitespace-nowrap">
                      {getTimeAgo(activity.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Empty state (shown briefly on load) */}
            {activities.length === 0 && (
              <div className="text-center py-8 text-[#6B7C76] text-sm">
                Loading activity...
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}