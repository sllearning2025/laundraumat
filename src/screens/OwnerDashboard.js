import React, { useState } from 'react';
import './OwnerRegistration.css';
import OwnerHomeTab from './OwnerHomeTab';
import OwnerInventoryTab from './OwnerInventoryTab';
import OwnerPaymentTab from './OwnerPaymentTab';
import OwnerPromotionsTab from './OwnerPromotionsTab';
import OwnerOrdersTab from './OwnerOrdersTab';
import OwnerAccountTab from './OwnerAccountTab';
import OwnerLaundryServiceTab from './OwnerLaundryServiceTab';

function OwnerDashboard({ owner }) {
  const [activeTab, setActiveTab] = useState('home');

  const renderTab = () => {
    switch (activeTab) {
      case 'home':
        return <OwnerHomeTab owner={owner} />;
      case 'laundry':
        // Render OwnerLaundryServiceTab on Laundry Service tab
        return <OwnerLaundryServiceTab owner={owner} />;
      case 'inventory':
        return <OwnerInventoryTab owner={owner} />;
      case 'payment':
        return <OwnerPaymentTab owner={owner} />;
      case 'promotions':
        return <OwnerPromotionsTab owner={owner} />;
      case 'orders':
        return <OwnerOrdersTab owner={owner} />;
      case 'account':
        return <OwnerAccountTab owner={owner} />;
      default:
        return <OwnerHomeTab owner={owner} />;
    }
  };

  return (
    <div className="owner-registration-screen" style={{ background: '#fff', minHeight: '100vh' }}>
      <div className="owner-registration-card" style={{ background: '#fff' }}>
        {/* Only show welcome container on Home tab */}
        {activeTab === 'home' && (
          <>
            <h2>Welcome, {owner?.businessName || 'Laundromat Owner'}!</h2>
            <p>Your dashboard gives you access to manage your laundromat, view orders, and update your business details.</p>
          </>
        )}
        {/* Remove Dashboard Actions buttons */}
        <div style={{ marginTop: '2rem' }}>
          {/* No buttons or actions here */}
        </div>
        <div style={{ marginTop: '2rem' }}>
          {renderTab()}
        </div>
      </div>
      {/* Bottom Tab Navigation */}
      <div className="owner-dashboard-tabbar">
        <button className={`tab-btn${activeTab === 'home' ? ' active' : ''}`} onClick={() => setActiveTab('home')}>
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M3 12L12 3l9 9" stroke="#09278a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="6" y="12" width="12" height="8" rx="2" fill="#e3e8f7"/></svg>
          <span>Home</span>
        </button>
        <button className={`tab-btn${activeTab === 'laundry' ? ' active' : ''}`} onClick={() => setActiveTab('laundry')}>
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#09278a" strokeWidth="2"/><path d="M8 12h8M12 8v8" stroke="#09278a" strokeWidth="2" strokeLinecap="round"/></svg>
          <span>Laundry Service</span>
        </button>
        <button className={`tab-btn${activeTab === 'inventory' ? ' active' : ''}`} onClick={() => setActiveTab('inventory')}>
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="4" y="7" width="16" height="13" rx="2" fill="#e3e8f7" stroke="#09278a" strokeWidth="2"/><rect x="8" y="3" width="8" height="4" rx="1" fill="#e3e8f7" stroke="#09278a" strokeWidth="2"/></svg>
          <span>Inventory</span>
        </button>
        <button className={`tab-btn${activeTab === 'payment' ? ' active' : ''}`} onClick={() => setActiveTab('payment')}>
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="4" y="7" width="16" height="13" rx="2" fill="#e3e8f7" stroke="#09278a" strokeWidth="2"/><path d="M12 11v4M12 15h.01" stroke="#09278a" strokeWidth="2" strokeLinecap="round"/></svg>
          <span>Payment</span>
        </button>
        <button className={`tab-btn${activeTab === 'promotions' ? ' active' : ''}`} onClick={() => setActiveTab('promotions')}>
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="4" y="7" width="16" height="13" rx="2" fill="#e3e8f7" stroke="#09278a" strokeWidth="2"/><path d="M8 11h8M8 15h8" stroke="#09278a" strokeWidth="2" strokeLinecap="round"/></svg>
          <span>Promotions</span>
        </button>
        <button className={`tab-btn${activeTab === 'orders' ? ' active' : ''}`} onClick={() => setActiveTab('orders')}>
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="4" y="7" width="16" height="13" rx="2" fill="#e3e8f7" stroke="#09278a" strokeWidth="2"/><path d="M8 11h8M8 15h8" stroke="#09278a" strokeWidth="2" strokeLinecap="round"/></svg>
          <span>Orders</span>
        </button>
        <button className={`tab-btn${activeTab === 'account' ? ' active' : ''}`} onClick={() => setActiveTab('account')}>
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" fill="#e3e8f7" stroke="#09278a" strokeWidth="2"/><rect x="6" y="14" width="12" height="6" rx="3" fill="#e3e8f7" stroke="#09278a" strokeWidth="2"/></svg>
          <span>Account</span>
        </button>
      </div>
      {/* Tab Content */}
      <div style={{ marginBottom: '4rem', background: '#fff' }}>
        {activeTab === 'home' && <OwnerHomeTab owner={owner} />}
        {activeTab === 'laundry' && <OwnerLaundryServiceTab owner={owner} />}
        {activeTab === 'inventory' && <OwnerInventoryTab owner={owner} />}
        {activeTab === 'payment' && <OwnerPaymentTab owner={owner} />}
        {activeTab === 'promotions' && <OwnerPromotionsTab owner={owner} />}
        {activeTab === 'orders' && <OwnerOrdersTab owner={owner} />}
        {activeTab === 'account' && <OwnerAccountTab owner={owner} />}
      </div>
      <style>{`
        .owner-dashboard-tabbar {
          position: fixed;
          left: 0; right: 0; bottom: 0;
          width: 100vw;
          background: #fff;
          box-shadow: 0 -2px 16px rgba(9,39,138,0.08);
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 0.5rem 0;
          z-index: 100;
        }
        .tab-btn {
          background: none;
          border: none;
          outline: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #09278a;
          font-size: 0.85rem;
          font-weight: 500;
          padding: 0.2rem 0.5rem;
          transition: color 0.2s, transform 0.2s;
          cursor: pointer;
        }
        .tab-btn svg {
          margin-bottom: 2px;
          transition: transform 0.2s;
        }
        .tab-btn.active, .tab-btn:active, .tab-btn:focus {
          color: #0b3bb3;
        }
        .tab-btn.active svg {
          transform: scale(1.15);
          filter: drop-shadow(0 2px 6px #e3e8f7);
        }
        .tab-btn:hover {
          color: #0b3bb3;
        }
        @media (max-width: 600px) {
          .owner-dashboard-tabbar {
            font-size: 0.8rem;
            padding: 0.2rem 0;
          }
          .tab-btn {
            font-size: 0.75rem;
            padding: 0.1rem 0.2rem;
          }
          .tab-btn svg {
            width: 20px;
            height: 20px;
          }
        }
      `}</style>
    </div>
  );
}

export default OwnerDashboard;
