import React, { useState } from 'react';
import './OwnerRegistration.css';
import OwnerHomeTab from './OwnerHomeTab';
import OwnerInventoryTab from './OwnerInventoryTab';
import OwnerPaymentTab from './OwnerPaymentTab';
import OwnerPromotionsTab from './OwnerPromotionsTab';
import OwnerOrdersTab from './OwnerOrdersTab';
import OwnerAccountTab from './OwnerAccountTab';
import OwnerLaundryServiceTab from './OwnerLaundryServiceTab';
import OwnerBottomTabBar from '../components/OwnerBottomTabBar';

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
        <OwnerBottomTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
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
