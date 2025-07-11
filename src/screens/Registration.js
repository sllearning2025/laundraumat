import React, { useState } from 'react';
import OwnerRegisterButton from '../components/OwnerRegisterButton';
import ServiceRegisterButton from '../components/ServiceRegisterButton';
import BackButton from '../components/BackButton';
import OwnerRegistration from './OwnerRegistration';
import LaundryServiceRegistration from './LaundryServiceRegistration';
import LoginScreen from './LoginScreen';
import './Registration.css';

function Registration({ onBack }) {
  const [showOwnerRegistration, setShowOwnerRegistration] = useState(false);
  const [showServiceRegistration, setShowServiceRegistration] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="registration-screen">
      {(!showOwnerRegistration && !showServiceRegistration && !showLogin) && <div className="registration-overlay"></div>}
      {!showOwnerRegistration && !showServiceRegistration && !showLogin && (
        <>
          <BackButton onClick={onBack} />
          <h2 className="registration-title">Choose Registration Type</h2>
          <div className="registration-btn-row">
            <OwnerRegisterButton onClick={() => setShowOwnerRegistration(true)} />
            <ServiceRegisterButton onClick={() => setShowServiceRegistration(true)} />
          </div>
        </>
      )}
      {showOwnerRegistration && !showLogin && (
        <OwnerRegistration onBack={() => setShowOwnerRegistration(false)} onLogin={() => { setShowOwnerRegistration(false); setShowLogin(true); }} />
      )}
      {showServiceRegistration && !showLogin && (
        <LaundryServiceRegistration onBack={() => setShowServiceRegistration(false)} onLogin={() => { setShowServiceRegistration(false); setShowLogin(true); }} />
      )}
      {showLogin && (
        <LoginScreen onBack={() => setShowLogin(false)} onRegister={() => { setShowLogin(false); }} />
      )}
    </div>
  );
}

export default Registration;

/* Add to Registration.css:
.registration-btn-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
  margin-top: 3.5rem;
}
.registration-type-btn {
  flex: 1;
  min-width: 120px;
  max-width: 180px;
}
*/
