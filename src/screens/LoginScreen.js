import React, { useState } from 'react';
import './LoginScreen.css';

function LoginScreen({ onBack, onRegister }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.email.match(/^\S+@\S+\.\S+$/)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    // TODO: Add Firebase login logic here
    alert('Login successful!');
  };

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
          {error && <div className="error-msg">{error}</div>}
          <div className="login-btn-row">
            <button className="login-btn" type="submit">Login</button>
          </div>
        </form>
        <div className="register-link-row">
          <span className="register-text">Don't have an account?</span>
          <button className="register-link-btn" type="button" onClick={onRegister}>Register</button>
        </div>
      </div>
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
*/
