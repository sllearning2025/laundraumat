import React, { useState } from 'react';
import './LoginScreen.css';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import SuperAdminDashboard from './SuperAdminDashboard';

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

function LoginScreen({ onBack, onRegister }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError('');
    setShowErrorModal(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      setError('Please enter a valid email address.');
      setShowErrorModal(true);
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      setShowErrorModal(true);
      return;
    }
    // Superadmin login logic
    if (form.email === 'ppj@gmail.com') {
      try {
        const docRef = doc(db, 'superadmins', 'ppj');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.password === form.password) {
            setIsSuperAdmin(true);
            return;
          } else {
            setError('Incorrect password for superadmin.');
            setShowErrorModal(true);
            return;
          }
        } else {
          setError('Superadmin credentials not found.');
          setShowErrorModal(true);
          return;
        }
      } catch (err) {
        setError('Error connecting to Firestore.');
        setShowErrorModal(true);
        return;
      }
    }
    // TODO: Add Firebase login logic for other users
    alert('Login successful!');
  };

  if (isSuperAdmin) {
    return <SuperAdminDashboard onLogout={() => setIsSuperAdmin(false)} />;
  }

  return (
    <div className="login-screen">
      <button className="back-btn" onClick={onBack} aria-label="Go Back">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="16" fill="#09278a" />
          <path d="M18 10L12 16L18 22" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div className="login-card">
        <h2>Login to Laundraumat</h2>
        <form onSubmit={handleSubmit} noValidate>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="login-input"
            value={form.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="login-input"
            value={form.password}
            onChange={handleChange}
          />
          <div className="login-btn-row">
            <button className="login-btn" type="submit">Login</button>
          </div>
        </form>
        <div className="register-link-row">
          <span className="register-text">Don't have an account?</span>
          <button className="register-link-btn" type="button" onClick={onRegister}>Register</button>
        </div>
      </div>
      {showErrorModal && (
        <div className="error-modal-overlay">
          <div className="error-modal">
            <div className="error-modal-title">Login Error</div>
            <div className="error-modal-message">{error}</div>
            <button className="error-modal-btn" onClick={() => setShowErrorModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginScreen;

/* Add to LoginScreen.css:
.login-btn-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
  margin-top: 1.2rem;
}
.login-btn {
  flex: 1;
  min-width: 120px;
  max-width: 180px;
}
.register-link-row {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}
.register-text {
  font-size: 0.9rem;
  color: #333;
}
.register-link-btn {
  background: none;
  border: none;
  color: #09278a;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0;
}
.register-link-btn:hover {
  text-decoration: underline;
}
.error-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.error-modal {
  background: #fff;
  border-radius: 8px;
  padding: 2rem;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.error-modal-title {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 1rem;
}
.error-modal-message {
  font-size: 1rem;
  margin-bottom: 1.5rem;
}
.error-modal-btn {
  background: #09278a;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.8rem 1.2rem;
  cursor: pointer;
  font-size: 1rem;
}
.error-modal-btn:hover {
  background: #071d6a;
}
*/
