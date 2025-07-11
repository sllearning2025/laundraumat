import React, { useState } from 'react';
import RegisterButton from '../components/RegisterButton';
import LoginButton from '../components/LoginButton';
import Registration from './Registration';
import OwnerRegistration from './OwnerRegistration';
import LoginScreen from './LoginScreen';
import './Dashboard.css';

function Dashboard() {
  const [showRegistration, setShowRegistration] = useState(false);
  const [showOwnerRegistration, setShowOwnerRegistration] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  if (showRegistration) {
    return <Registration onBack={() => setShowRegistration(false)} />;
  }

  if (showOwnerRegistration) {
    return <OwnerRegistration onBack={() => setShowOwnerRegistration(false)} />;
  }

  if (showLogin) {
    return <LoginScreen onBack={() => setShowLogin(false)} onRegister={() => { setShowLogin(false); setShowRegistration(true); }} />;
  }

  return (
    <div className="dashboard">
      <h1>Welcome to Laundraumat Dashboard</h1>
      <p>Here you can manage your laundry orders and account.</p>
      <div className="dashboard-btn-row">
        <RegisterButton onClick={() => setShowRegistration(true)} />
        <LoginButton onClick={() => setShowLogin(true)} />
      </div>
    </div>
  );
}

export default Dashboard;
