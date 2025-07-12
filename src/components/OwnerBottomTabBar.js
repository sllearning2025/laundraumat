import React from 'react';

function OwnerBottomTabBar({ activeTab, setActiveTab }) {
  const handleTabClick = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      sessionStorage.setItem('ownerActiveTab', tab);
    }
  };
  React.useEffect(() => {
    const savedTab = sessionStorage.getItem('ownerActiveTab');
    if (savedTab && savedTab !== activeTab) {
      setActiveTab(savedTab);
    }
    // Only run on mount
    // eslint-disable-next-line
  }, []);
  return (
    <div className="owner-dashboard-tabbar">
      <button className={`tab-btn${activeTab === 'home' ? ' active' : ''}`} onClick={() => handleTabClick('home')}>
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M3 12L12 3l9 9" stroke="#09278a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="6" y="12" width="12" height="8" rx="2" fill="#e3e8f7"/></svg>
        <span>Home</span>
      </button>
      <button className={`tab-btn${activeTab === 'laundry' ? ' active' : ''}`} onClick={() => handleTabClick('laundry')}>
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#09278a" strokeWidth="2"/><path d="M8 12h8M12 8v8" stroke="#09278a" strokeWidth="2" strokeLinecap="round"/></svg>
        <span>Laundry Service</span>
      </button>
      <button className={`tab-btn${activeTab === 'inventory' ? ' active' : ''}`} onClick={() => handleTabClick('inventory')}>
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="4" y="7" width="16" height="13" rx="2" fill="#e3e8f7" stroke="#09278a" strokeWidth="2"/><rect x="8" y="3" width="8" height="4" rx="1" fill="#e3e8f7" stroke="#09278a" strokeWidth="2"/></svg>
        <span>Inventory</span>
      </button>
      <button className={`tab-btn${activeTab === 'payment' ? ' active' : ''}`} onClick={() => handleTabClick('payment')}>
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="4" y="7" width="16" height="13" rx="2" fill="#e3e8f7" stroke="#09278a" strokeWidth="2"/><path d="M12 11v4M12 15h.01" stroke="#09278a" strokeWidth="2" strokeLinecap="round"/></svg>
        <span>Payment</span>
      </button>
      <button className={`tab-btn${activeTab === 'promotions' ? ' active' : ''}`} onClick={() => handleTabClick('promotions')}>
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="4" y="7" width="16" height="13" rx="2" fill="#e3e8f7" stroke="#09278a" strokeWidth="2"/><path d="M8 11h8M8 15h8" stroke="#09278a" strokeWidth="2" strokeLinecap="round"/></svg>
        <span>Promotions</span>
      </button>
      <button className={`tab-btn${activeTab === 'orders' ? ' active' : ''}`} onClick={() => handleTabClick('orders')}>
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="4" y="7" width="16" height="13" rx="2" fill="#e3e8f7" stroke="#09278a" strokeWidth="2"/><path d="M8 11h8M8 15h8" stroke="#09278a" strokeWidth="2" strokeLinecap="round"/></svg>
        <span>Orders</span>
      </button>
      <button className={`tab-btn${activeTab === 'account' ? ' active' : ''}`} onClick={() => handleTabClick('account')}>
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" fill="#e3e8f7" stroke="#09278a" strokeWidth="2"/><rect x="6" y="14" width="12" height="6" rx="3" fill="#e3e8f7" stroke="#09278a" strokeWidth="2"/></svg>
        <span>Account</span>
      </button>
    </div>
  );
}

export default OwnerBottomTabBar;
