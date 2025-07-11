import React, { useEffect, useState } from 'react';
import '../components/SplashScreen.css';
import Logo from './Logo';
import Dashboard from '../screens/Dashboard';

function SplashScreen() {
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDashboard(true);
    }, 2500); // 2.5 seconds splash duration
    return () => clearTimeout(timer);
  }, []);

  if (showDashboard) {
    return <Dashboard />;
  }

  return (
    <div className="splash-screen">
      <Logo />
      <h1>Laundraumat</h1>
      <div className="subtext">...Quick, Clean and Convenient</div>
      <div className="spinner"></div>
    </div>
  );
}

export default SplashScreen;
