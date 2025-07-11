import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore';
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

function OwnerApprovalPanel({ onBack }) {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOwners() {
      setLoading(true);
      const snapshot = await getDocs(collection(db, 'owners'));
      const ownerList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOwners(ownerList);
      setLoading(false);
    }
    fetchOwners();
  }, []);

  const handleApprove = async (id) => {
    await updateDoc(doc(db, 'owners', id), { approved: true });
    setOwners(owners => owners.map(o => o.id === id ? { ...o, approved: true } : o));
  };

  return (
    <div className="owner-approval-panel">
      <button className="back-btn" style={{ marginBottom: '1rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} onClick={onBack} aria-label="Go Back">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="16" fill="#09278a" />
          <path d="M18 10L12 16L18 22" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <h3>Pending Owner Approvals</h3>
      {loading ? <div>Loading...</div> : (
        <ul>
          {owners.filter(o => !o.approved).map(owner => (
            <li key={owner.id}>
              <strong>{owner.businessName}</strong> ({owner.email})<br />
              <button onClick={() => handleApprove(owner.id)} className="superadmin-explore-btn">Approve</button>
            </li>
          ))}
          {owners.filter(o => !o.approved).length === 0 && <div>No pending approvals.</div>}
        </ul>
      )}
    </div>
  );
}

export default OwnerApprovalPanel;
