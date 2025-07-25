import React, { useState } from 'react';
import './SuperAdminDashboard.css';
import OwnerApprovalPanel from './OwnerApprovalPanel';
import ServicesPanel from './ServicesPanel';

function SuperAdminDashboard({ onLogout }) {
  const [showOwnerApprovalPanel, setShowOwnerApprovalPanel] = useState(false);
  const [showServicesPanel, setShowServicesPanel] = useState(false);

  return (
    <div className="superadmin-dashboard">
      <div className="superadmin-overlay"></div>
      <button className="superadmin-logout-btn" style={{ position: 'absolute', top: 24, right: 32 }} onClick={onLogout}>Logout</button>
      <div className="superadmin-content">
        <h2>Superadmin Dashboard</h2>
        <p>Welcome, Superadmin!</p>
        {showOwnerApprovalPanel ? (
          <OwnerApprovalPanel onBack={() => setShowOwnerApprovalPanel(false)} />
        ) : showServicesPanel ? (
          <ServicesPanel onBack={() => setShowServicesPanel(false)} />
        ) : (
          <div className="superadmin-main">
            <div className="superadmin-card">
              <h3 className="superadmin-section-title">Manage Laundromats</h3>
              <p>View, approve, or remove laundromat owners and their businesses.</p>
              <button className="superadmin-explore-btn" onClick={() => setShowOwnerApprovalPanel(true)}>Explore Laundromats</button>
            </div>
            <div className="superadmin-card">
              <h3 className="superadmin-section-title">Manage Services</h3>
              <p>Review laundry service providers and user activity.</p>
              <button className="superadmin-explore-btn" onClick={() => setShowServicesPanel(true)}>Explore Services</button>
            </div>
            <div className="superadmin-card">
              <h3 className="superadmin-section-title">Analytics & Reports</h3>
              <p>See usage statistics, revenue, and system health.</p>
              <button className="superadmin-explore-btn">View Analytics</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SuperAdminDashboard;
