import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import './SuperAdminDashboard.css';

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

function ServicesPanel({ onBack }) {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchOwners() {
      setLoading(true);
      try {
        const snapshot = await getDocs(collection(db, 'owners'));
        const ownerList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOwners(ownerList);
      } catch (err) {
        setError('Error fetching laundromats.');
      }
      setLoading(false);
    }
    fetchOwners();
  }, []);

  const handleBlock = async (id) => {
    setActionLoading(true);
    try {
      await updateDoc(doc(db, 'owners', id), { approved: false });
      setOwners(owners => owners.map(o => o.id === id ? { ...o, approved: false } : o));
    } catch (err) {
      setError('Error blocking laundromat.');
    }
    setActionLoading(false);
  };

  const handleRemove = async (id) => {
    setActionLoading(true);
    try {
      await deleteDoc(doc(db, 'owners', id));
      setOwners(owners => owners.filter(o => o.id !== id));
    } catch (err) {
      setError('Error removing laundromat.');
    }
    setActionLoading(false);
  };

  return (
    <div className="owner-approval-panel services-panel">
      <button className="back-btn" style={{ marginBottom: '1rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} onClick={onBack} aria-label="Go Back">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="16" fill="#09278a" />
          <path d="M18 10L12 16L18 22" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <h3>Approved Laundromats</h3>
      {error && <div className="error-msg">{error}</div>}
      {loading ? <div>Loading...</div> : (
        <ul>
          {owners.filter(o => o.approved).map(owner => (
            <li key={owner.id}>
              <strong>{owner.businessName}</strong> ({owner.email})<br />
              <span>Status: {owner.online ? 'Online' : 'Offline'}</span><br />
              {owner.lastOnline && (
                <span>Last Online: {new Date(owner.lastOnline).toLocaleString()}</span>
              )}
              <br />
              <button className="superadmin-explore-btn" style={{ marginRight: '8px' }} onClick={() => handleBlock(owner.id)} disabled={actionLoading}>Block</button>
              <button className="superadmin-explore-btn" style={{ background: '#d32f2f' }} onClick={() => handleRemove(owner.id)} disabled={actionLoading}>Remove</button>
            </li>
          ))}
          {owners.filter(o => o.approved).length === 0 && <div>No approved laundromats.</div>}
        </ul>
      )}
      <h3 style={{ marginTop: '2rem' }}>Laundromat Owners Logs</h3>
      {loading ? <div>Loading...</div> : (
        <ul>
          {owners.map(owner => (
            <li key={owner.id}>
              <strong>{owner.businessName}</strong> ({owner.email})<br />
              <span>Last Login: {owner.lastLogin ? new Date(owner.lastLogin).toLocaleString() : 'Never'}</span><br />
              <span>Status: {owner.online ? 'Online' : 'Offline'}</span>
            </li>
          ))}
        </ul>
      )}
      <style>{`
        .services-panel {
          max-width: 98vw;
          width: 100vw;
          min-width: 0;
          box-sizing: border-box;
          padding: 1.2rem 0.5rem;
          margin-bottom: 0.5rem;
          background: rgba(255,255,255,0.98);
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(9,39,138,0.08);
        }
        .services-panel h3 {
          font-size: 1.2rem;
          margin-bottom: 1rem;
          text-align: center;
        }
        .services-panel ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .services-panel li {
          margin-bottom: 1.2rem;
          background: #f5f7fa;
          border-radius: 8px;
          padding: 0.8rem 1rem;
          color: #09278a;
          box-shadow: 0 1px 4px rgba(9,39,138,0.05);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          word-break: break-word;
        }
        @media (max-width: 900px) {
          .services-panel {
            max-width: 100vw;
            padding: 1rem 0.2rem;
          }
        }
        @media (max-width: 600px) {
          .services-panel {
            padding: 0.5rem 0.5rem 2rem 0.5rem;
            min-height: auto;
            box-sizing: border-box;
          }
          .services-panel h3 {
            font-size: 1rem;
          }
          .services-panel li {
            padding: 0.6rem 0.5rem;
            font-size: 0.95rem;
          }
        }
      `}</style>
    </div>
  );
}

export default ServicesPanel;
