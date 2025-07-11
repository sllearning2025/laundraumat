import React, { useState } from 'react';
import './OwnerRegistration.css'; // Reuse styles for consistency

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

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      // Submit logic here
      alert('Registration successful!');
    }
  };

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

          <button className="owner-registration-btn" type="submit">Register</button>
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
