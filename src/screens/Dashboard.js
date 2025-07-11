import React, { useState } from 'react';
import RegisterButton from '../components/RegisterButton';
import LoginButton from '../components/LoginButton';
import Registration from './Registration';
import OwnerRegistration from './OwnerRegistration';
import './Dashboard.css';

function Dashboard() {
  const [showRegistration, setShowRegistration] = useState(false);
  const [showOwnerRegistration, setShowOwnerRegistration] = useState(false);

  if (showRegistration) {
    return <Registration onBack={() => setShowRegistration(false)} />;
  }

  if (showOwnerRegistration) {
    return <OwnerRegistration onBack={() => setShowOwnerRegistration(false)} />;
  }

  return (
    <div className="dashboard">
      <h1>Welcome to Laundraumat Dashboard</h1>
      <p>Here you can manage your laundry orders and account.</p>
      <div>
        <RegisterButton onClick={() => setShowRegistration(true)} />
        <LoginButton />
      </div>
    </div>
  );
}

export default Dashboard;
