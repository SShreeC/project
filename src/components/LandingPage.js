import React, { useState, useEffect } from 'react';
import { Book, PenTool, Calendar, Coffee } from 'lucide-react';
import MainComponent from './MainComponent'
import LoggedInNavBar from './LoggedInNavBar';
import { Link } from 'react-router-dom';
import NavBar from './NavBar'

const Header = () => (
<>
<NavBar />

</>
);

const AuthPopup = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Sign up for StudyNotes</h2>
        <p className="mb-4">Get organized and boost your academic performance!</p>
        <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

const LandingPage = () => {
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAuthPopup(true);
    }, 5000); // Show popup after 5 seconds
    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  const closeAuthPopup = () => {
    setShowAuthPopup(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-100">
        <section className="welcome-section text-center py-16">
          <h1 className="text-4xl font-bold mb-4">Welcome to StudyNotes</h1>
          <p className="text-xl mb-8">Your all-in-one student companion for better note-taking and organization.</p>
          <button className="get-started-btn bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors">
            <Link to={'/login'}>
            Get Started
            </Link>
          </button>
        </section>
        <section className="features-section py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<Book size={48} />}
                title="Smart Notes"
                description="Organize your lecture notes with ease"
              />
              <FeatureCard
                icon={<PenTool size={48} />}
                title="Study Tools"
                description="Flashcards, quizzes, and more"
              />
              <FeatureCard
                icon={<Calendar size={48} />}
                title="Schedule"
                description="Keep track of classes and assignments"
              />
              <FeatureCard
                icon={<Coffee size={48} />}
                title="Focus Timer"
                description="Stay productive with Pomodoro technique"
              />
            </div>
          </div>
        </section>
      </main>
      <AuthPopup show={showAuthPopup} onClose={closeAuthPopup} />
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="feature-card text-center p-6 bg-gray-50 rounded-lg shadow-md">
    <div className="icon-wrapper mb-4 text-blue-500">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default LandingPage;