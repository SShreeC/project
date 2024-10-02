import React, { useState, useEffect } from 'react';
import Header from './header';
import AuthPopup from './AuthPopup';
import '../auth/signup/styles.css';
const LandingPage = () => {
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAuthPopup(true);
    }, 5000); // Show popup after 10 seconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  const closeAuthPopup = () => {
    setShowAuthPopup(false);
  };

  return (
    <div>
      <Header />
      <main>
        <section className="welcome-section">
          <h1>Welcome to Your Personal Planner</h1>
          <p>Organize your tasks, water intake, meets, and more in one place.</p>
          <button className="get-started-btn">Get Started</button>
        </section>
      </main>
      <AuthPopup show={showAuthPopup} onClose={closeAuthPopup} />
    </div>
  );
};

export default LandingPage;
