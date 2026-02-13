import { useState, useEffect } from 'react';
import { Hero } from '../components/Hero';
import { Benefits } from '../components/Benefits';
import { SuccessState } from '../components/SuccessState';
import { Footer } from '../components/Footer';
import { CountdownTimer } from '../components/CountdownTimer';
import { ActivityFeed } from '../components/ActivityFeed';
import { ComparisonTable } from '../components/ComparisonTable';
import { FounderNote } from '../components/FounderNote';
import { DemoVideo } from '../components/DemoVideo';
import { FAQ } from '../components/FAQ';
import { StickyCTA } from '../components/StickyCTA';

export default function EarlyBirdPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [referralCode, setReferralCode] = useState('');

  useEffect(() => {
    // Check for referral code in URL
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref) {
      localStorage.setItem('tyroo-ref', ref);
    }
  }, []);

  const handleSuccess = (name: string, email: string, refCode: string) => {
    setUserName(name);
    setUserEmail(email);
    setReferralCode(refCode);
    setShowSuccess(true);
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setShowSuccess(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      className="min-h-screen overflow-x-hidden"
      style={{
        background: 'linear-gradient(135deg, #0E0E0E 0%, #1A1A1A 50%, #0E0E0E 100%)',
      }}
    >
      {/* Background grid pattern */}
      <div 
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 182, 122, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 182, 122, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Main content */}
      <div className="relative z-10">
        {showSuccess ? (
          <SuccessState 
            onReset={handleReset} 
            userName={userName} 
            userEmail={userEmail}
            referralCode={referralCode}
          />
        ) : (
          <>
            <Hero onSuccess={handleSuccess} />
            <ActivityFeed />
            <CountdownTimer />
            <DemoVideo />
            <FounderNote />
            <ComparisonTable />
            <Benefits />
            <FAQ />
            
            {/* Sticky CTA Bar */}
            <StickyCTA onScrollToTop={scrollToTop} />
          </>
        )}
        <Footer />
      </div>
    </div>
  );
}