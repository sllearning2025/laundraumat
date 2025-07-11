import React, { useState } from 'react';
import './OwnerRegistration.css'; // Reuse styles for consistency
import { getFirestore, query, where, getDocs, collection, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyChjFt3B8WoMf0iJnTJgaEJsiCQT1B7DPc",
  authDomain: "laundry-app-a166b.firebaseapp.com",
  projectId: "laundry-app-a166b",
  storageBucket: "laundry-app-a166b.firebasestorage.app",
  messagingSenderId: "481789814862",
  appId: "1:481789814862:web:c3277537f42607c10d7b1f",
  measurementId: "G-WWNW5B7Q7H"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Use the same countryCodes array as OwnerRegistration
const countryCodes = [
  { code: '+1', name: 'United States', length: 10 },
  { code: '+44', name: 'United Kingdom', length: 10 },
  { code: '+234', name: 'Nigeria', length: 10 },
  { code: '+91', name: 'India', length: 10 },
  { code: '+61', name: 'Australia', length: 9 },
  { code: '+232', name: 'Sierra Leone', length: 8 },
  // ... (add all other countries as in OwnerRegistration)
];

function LaundryServiceRegistration({ onBack, onLogin }) {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    countryCode: countryCodes[0].code,
    phone: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!form.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = 'Valid email required.';
    const selectedCountry = countryCodes.find(c => c.code === form.countryCode);
    if (!form.phone.match(new RegExp(`^\\d{${selectedCountry.length}}$`))) {
      newErrors.phone = `Phone number must be ${selectedCountry.length} digits for ${selectedCountry.name}.`;
    }
    if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        // Check if email already exists
        const q = query(collection(db, 'services'), where('email', '==', form.email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setErrors({ email: 'Email already registered for a service.' });
          setLoading(false);
          return;
        }
        // Add service to Firestore
        await addDoc(collection(db, 'services'), {
          ...form,
          registeredAt: Date.now(),
        });
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          setShowDashboard(true);
        }, 2000);
        setForm({
          fullName: '',
          email: '',
          countryCode: countryCodes[0].code,
          phone: '',
          password: '',
        });
      } catch (err) {
        setErrors({ general: 'Error submitting registration.' });
      }
      setLoading(false);
    }
  };

  if (showDashboard) {
    return (
      <div className="owner-registration-screen">
        <div className="owner-registration-card" style={{ position: 'relative' }}>
          {/* User profile icon top right */}
          <div style={{ position: 'absolute', top: 18, right: 18, zIndex: 2 }}>
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="19" cy="19" r="19" fill="#09278a" />
              <circle cx="19" cy="15" r="7" fill="#fff" />
              <ellipse cx="19" cy="28" rx="10" ry="6" fill="#fff" />
              <circle cx="19" cy="15" r="6" fill="#e3e8f7" />
              <ellipse cx="19" cy="28" rx="8.5" ry="5.2" fill="#e3e8f7" />
            </svg>
          </div>
          <h2>Welcome to Laundry Service Dashboard!</h2>
          <p>Your registration was successful. You now have access to the laundry service dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="owner-registration-screen">
      <button className="back-btn" onClick={onBack} aria-label="Go Back">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="16" fill="#09278a" />
          <path d="M18 10L12 16L18 22" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div className="owner-registration-card">
        <h2>Register for Laundry Service</h2>
        <form onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="owner-registration-input"
            value={form.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <div className="error-msg">{errors.fullName}</div>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="owner-registration-input"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <div className="error-msg">{errors.email}</div>}

          <div className="phone-row">
            <select
              name="countryCode"
              className="country-code-select"
              value={form.countryCode}
              onChange={handleChange}
            >
              {countryCodes.map(c => (
                <option key={c.code} value={c.code}>{c.code} ({c.name})</option>
              ))}
            </select>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="owner-registration-input phone-input"
              value={form.phone}
              onChange={handleChange}
              maxLength={countryCodes.find(c => c.code === form.countryCode).length}
            />
          </div>
          {errors.phone && <div className="error-msg">{errors.phone}</div>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="owner-registration-input"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <div className="error-msg">{errors.password}</div>}

          <button className="owner-registration-btn" type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
          {errors.general && <div className="error-msg general-error">{errors.general}</div>}
          {showSuccessModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h3>Registration Successful!</h3>
                <p>Your laundry service registration was submitted successfully.</p>
              </div>
              <style>{`
                .modal-overlay {
                  position: fixed;
                  top: 0; left: 0; right: 0; bottom: 0;
                  background: rgba(0,0,0,0.35);
                  z-index: 9999;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
                .modal-content {
                  background: #fff;
                  border-radius: 16px;
                  box-shadow: 0 4px 24px rgba(9,39,138,0.15);
                  padding: 2rem 1.5rem;
                  max-width: 350px;
                  text-align: center;
                  color: #09278a;
                }
                .modal-content h3 {
                  margin-bottom: 1rem;
                  color: #09278a;
                }
                .modal-content p {
                  font-size: 1.05rem;
                  margin-bottom: 1.2rem;
                }
              `}</style>
            </div>
          )}
        </form>
        <div className="register-link-row">
          <span className="register-text">Already have an account?</span>
          <button className="register-link-btn" type="button" onClick={onLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default LaundryServiceRegistration;
