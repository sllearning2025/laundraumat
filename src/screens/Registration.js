import React, { useState } from 'react';
import OwnerRegisterButton from '../components/OwnerRegisterButton';
import ServiceRegisterButton from '../components/ServiceRegisterButton';
import BackButton from '../components/BackButton';
import OwnerRegistration from './OwnerRegistration';
import './Registration.css';

function Registration({ onBack }) {
  const [showOwnerRegistration, setShowOwnerRegistration] = useState(false);

  return (
    <div className="registration-screen">
      {!showOwnerRegistration && (
        <>
          <BackButton onClick={onBack} />
          <h2 className="registration-title"></h2>
          <div className="registration-btns">
            <OwnerRegisterButton onClick={() => setShowOwnerRegistration(true)} />
            <ServiceRegisterButton />
          </div>
        </>
      )}
      {showOwnerRegistration && (
        <OwnerRegistration onBack={() => setShowOwnerRegistration(false)} />
      )}
    </div>
  );
}

export default Registration;
