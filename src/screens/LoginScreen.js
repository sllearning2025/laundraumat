import React, { useState } from 'react';
import './LoginScreen.css';
import { getFirestore, doc, getDoc, query, where, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import SuperAdminDashboard from './SuperAdminDashboard';
import OwnerRegistration from './OwnerRegistration';
import OwnerDashboard from './OwnerDashboard';
import LaundryServiceRegistration from './LaundryServiceRegistration';

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
  const [isOwner, setIsOwner] = useState(false);
  const [isServiceUser, setIsServiceUser] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [ownerData, setOwnerData] = useState(null);
  const [serviceUserData, setServiceUserData] = useState(null);

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
    // Owner login logic
    try {
      const ownerQ = query(collection(db, 'owners'), where('email', '==', form.email));
      const ownerSnapshot = await getDocs(ownerQ);
      if (!ownerSnapshot.empty) {
        const owner = ownerSnapshot.docs[0].data();
        if (owner.password !== form.password) {
          setError('Incorrect password for owner.');
          setShowErrorModal(true);
          return;
        }
        if (!owner.approved) {
          setError('Your account is pending approval by superadmin.');
          setShowErrorModal(true);
          return;
        }
        setOwnerData(owner);
        setIsOwner(true);
        return;
      }
    } catch (err) {
      setError('Error connecting to Firestore.');
      setShowErrorModal(true);
      return;
    }
    // Laundry service user login logic
    try {
      const serviceQ = query(collection(db, 'services'), where('email', '==', form.email));
      const serviceSnapshot = await getDocs(serviceQ);
      if (!serviceSnapshot.empty) {
        const user = serviceSnapshot.docs[0].data();
        if (user.password !== form.password) {
          setError('Incorrect password for laundry service user.');
          setShowErrorModal(true);
          return;
        }
        setServiceUserData(user);
        setIsServiceUser(true);
        return;
      }
    } catch (err) {
      setError('Error connecting to Firestore.');
      setShowErrorModal(true);
      return;
    }
    setError('No account found for this email.');
    setShowErrorModal(true);
    return;
  };

  if (isSuperAdmin) {
    return <SuperAdminDashboard onLogout={() => setIsSuperAdmin(false)} />;
  }

  if (isOwner && ownerData) {
    return <OwnerDashboard owner={ownerData} />;
  }

  if (isServiceUser && serviceUserData) {
    return (
      <div className="owner-registration-screen">
        <div className="owner-registration-card" style={{ position: 'relative' }}>
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
          <p>You now have access to the laundry service dashboard.</p>
        </div>
      </div>
    );
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
