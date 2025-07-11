import React from 'react';
import './OwnerRegistration.css';

function OwnerDashboard({ owner }) {
  return (
    <div className="owner-registration-screen">
      <div className="owner-registration-card">
        <h2>Welcome, {owner?.businessName || 'Laundromat Owner'}!</h2>
        <p>Your dashboard gives you access to manage your laundromat, view orders, and update your business details.</p>
        <div style={{ marginTop: '2rem', textAlign: 'left' }}>
          <h3>Business Info</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><strong>Name:</strong> {owner?.businessName}</li>
            <li><strong>Email:</strong> {owner?.email}</li>
            <li><strong>Address:</strong> {owner?.businessAddress}</li>
            <li><strong>Phone:</strong> {owner?.countryCode} {owner?.phone}</li>
            <li><strong>Status:</strong> {owner?.approved ? 'Approved' : 'Pending Approval'}</li>
            {owner?.lastOnline && (
              <li><strong>Last Online:</strong> {new Date(owner.lastOnline).toLocaleString()}</li>
            )}
          </ul>
        </div>
        <div style={{ marginTop: '2rem' }}>
          <h3>Dashboard Actions</h3>
          <button className="owner-registration-btn" style={{ marginRight: '1rem' }}>View Orders</button>
          <button className="owner-registration-btn">Update Business Info</button>
        </div>
      </div>
    </div>
  );
}

export default OwnerDashboard;
