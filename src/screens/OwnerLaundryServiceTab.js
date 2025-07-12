import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

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

const PRODUCT_TYPES = [
  { value: 'wash', label: 'Wash Only' },
  { value: 'wash_dry', label: 'Wash and Dry' },
  { value: 'wash_dry_iron', label: 'Wash, Dry and Iron' },
];

const STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

function OwnerLaundryServiceTab({ owner }) {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    image: '',
    type: 'wash',
    price: '',
    status: 'active',
    category: '',
  });
  const [editId, setEditId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Use owner.email as Firestore document ID for products if available
    const ownerDocId = owner?.email;
    if (!ownerDocId) return;
    const unsub = onSnapshot(
      collection(db, 'owners', ownerDocId, 'products'),
      (snapshot) => {
        setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        const cats = Array.from(new Set(snapshot.docs.map(doc => doc.data().category).filter(Boolean)));
        setCategories(cats);
      }
    );
    return () => unsub();
  }, [owner]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openModal = () => {
    setForm({ name: '', image: '', type: 'wash', price: '', status: 'active', category: '' });
    setEditId(null);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setForm({ name: '', image: '', type: 'wash', price: '', status: 'active', category: '' });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const ownerDocId = owner?.email;
    if (!form.name || !form.price || !form.type || !form.status) return;
    if (!ownerDocId) {
      alert('Owner email is missing. Please log in again.');
      return;
    }
    try {
      if (editId) {
        await updateDoc(doc(db, 'owners', ownerDocId, 'products', editId), form);
        setEditId(null);
      } else {
        await addDoc(collection(db, 'owners', ownerDocId, 'products'), form);
      }
      closeModal();
    } catch (err) {
      alert('Error saving product. Please try again.');
    }
  };

  const handleEdit = prod => {
    setForm({ ...prod });
    setEditId(prod.id);
    setShowModal(true);
  };

  const handleDelete = async id => {
    await deleteDoc(doc(db, 'owners', owner.email, 'products', id));
    if (editId === id) setEditId(null);
  };

  return (
    <div
      style={{
        background: '#fff',
        minHeight: '100vh',
        padding: '1.5rem',
        maxWidth: '100vw',
        margin: '0 auto',
        boxSizing: 'border-box',
        width: '100vw',
        overflow: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <style>{`
        .owner-laundry-scroll::-webkit-scrollbar { display: none; }
        .owner-laundry-scroll { scrollbar-width: none; -ms-overflow-style: none; }
        .modal-bg { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(9,39,138,0.12); z-index: 999; display: flex; align-items: center; justify-content: center; }
        .modal-content { background: #fff; border-radius: 16px; box-shadow: 0 4px 24px rgba(9,39,138,0.18); padding: 2rem 1.5rem; max-width: 420px; width: 95vw; position: relative; }
        .modal-close { position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 1.5rem; color: #09278a; cursor: pointer; }
        @media (max-width: 900px) {
          .modal-content { max-width: 95vw; padding: 1.2rem 0.7rem; }
        }
        @media (max-width: 600px) {
          .modal-content { max-width: 99vw; padding: 0.7rem 0.2rem; border-radius: 10px; }
          h2 { font-size: 1.1rem !important; }
        }
        @media (max-width: 400px) {
          .modal-content { max-width: 100vw; padding: 0.3rem 0.1rem; border-radius: 6px; }
          h2 { font-size: 0.95rem !important; }
        }
      `}</style>
      <h2 style={{ color: '#09278a', marginBottom: '1rem', fontSize: 'clamp(1.2rem, 2vw, 2rem)', textAlign: 'center', width: '100%' }}>Manage Laundry Products</h2>
      <button
        onClick={openModal}
        style={{
          background: '#09278a',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '0.7rem 2rem',
          fontWeight: 600,
          cursor: 'pointer',
          fontSize: 'clamp(1rem, 2vw, 1.1rem)',
          marginBottom: '1.5rem',
          width: '100%',
          maxWidth: 420,
        }}
      >Add Product</button>
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', width: '100%', justifyContent: 'center' }}>
        {categories.map(cat => (
          <span key={cat} style={{ background: '#09278a', color: '#fff', borderRadius: 16, padding: '0.3rem 1rem', fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)', fontWeight: 500 }}>{cat}</span>
        ))}
      </div>
      {/* Only show product list, not the form inline. The form is only in the modal. */}
      {showModal ? (
        <div className="modal-bg" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>&times;</button>
            <h3 style={{ color: '#09278a', marginBottom: '1rem', fontSize: 'clamp(1rem, 2vw, 1.3rem)', textAlign: 'center', width: '100%' }}>{editId ? 'Edit Product' : 'Add Product'}</h3>
            <form onSubmit={handleSubmit} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.7rem',
              background: '#e3e8f7',
              borderRadius: 12,
              padding: '0.7rem 0.5rem',
              boxShadow: '0 2px 8px rgba(9,39,138,0.08)',
              width: '100%',
              maxWidth: '360px',
              margin: '0 auto',
              alignItems: 'stretch',
              justifyContent: 'center',
            }}>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Product Name" style={{ width: '100%', height: '44px', minWidth: 0, padding: '0.5rem', borderRadius: 8, border: '1px solid #bfc8e6', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' }} />
              <input name="image" value={form.image} onChange={handleChange} placeholder="Image Address (URL)" style={{ width: '100%', height: '44px', minWidth: 0, padding: '0.5rem', borderRadius: 8, border: '1px solid #bfc8e6', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' }} />
              <select name="type" value={form.type} onChange={handleChange} style={{ width: '100%', height: '44px', minWidth: 0, padding: '0.5rem', borderRadius: 8, border: '1px solid #bfc8e6', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' }}>
                {PRODUCT_TYPES.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
              <input name="price" value={form.price} onChange={handleChange} placeholder="Price (SLL)" type="number" min="0" style={{ width: '60%', height: '38px', minWidth: 0, padding: '0.5rem', borderRadius: 8, border: '1px solid #bfc8e6', fontSize: 'clamp(0.9rem, 2vw, 1rem)', alignSelf: 'flex-start' }} />
              <select name="status" value={form.status} onChange={handleChange} style={{ width: '60%', height: '38px', minWidth: 0, padding: '0.5rem', borderRadius: 8, border: '1px solid #bfc8e6', fontSize: 'clamp(0.9rem, 2vw, 1rem)', alignSelf: 'flex-start' }}>
                {STATUS_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
              <input name="category" value={form.category} onChange={handleChange} placeholder="Category" style={{ width: '100%', height: '44px', minWidth: 0, padding: '0.5rem', borderRadius: 8, border: '1px solid #bfc8e6', fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' }} />
              <div style={{ display: 'flex', gap: '0.7rem', width: '100%' }}>
                <button type="submit" style={{ background: '#09278a', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1.5rem', fontWeight: 600, cursor: 'pointer', flex: 1, fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', height: '44px' }}>{editId ? 'Update' : 'Add'}</button>
                <button type="button" onClick={closeModal} style={{ background: '#bfc8e6', color: '#09278a', border: 'none', borderRadius: 8, padding: '0.5rem 1.5rem', fontWeight: 600, cursor: 'pointer', flex: 1, fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', height: '44px' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="owner-laundry-scroll" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '60vh', overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none', width: '100%', alignItems: 'center' }}>
          {products.map(prod => (
            <div key={prod.id} style={{ display: 'flex', alignItems: 'center', background: '#f7f9fc', borderRadius: 12, boxShadow: '0 1px 4px rgba(9,39,138,0.05)', padding: '0.7rem 1rem', flexWrap: 'wrap', width: '100%', maxWidth: 420 }}>
              {prod.image && <img src={prod.image} alt={prod.name} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8, marginRight: '1rem', background: '#e3e8f7' }} />}
              <div style={{ flex: '1 1 120px', minWidth: 90 }}>
                <div style={{ fontWeight: 600, color: '#09278a', fontSize: 'clamp(1rem, 2vw, 1.1rem)' }}>{prod.name}</div>
                <div style={{ fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)', color: '#555' }}>{PRODUCT_TYPES.find(t => t.value === prod.type)?.label}</div>
                <div style={{ fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)', color: '#555' }}>Category: {prod.category || '-'}</div>
                <div style={{ fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)', color: '#555' }}>Status: <span style={{ color: prod.status === 'active' ? '#0b3bb3' : '#bfc8e6', fontWeight: 600 }}>{prod.status}</span></div>
              </div>
              <div style={{ fontWeight: 600, color: '#0b3bb3', fontSize: 'clamp(1rem, 2vw, 1.1rem)', marginRight: '1rem' }}>{`SLL ${parseFloat(prod.price).toFixed(2)}`}</div>
              <button onClick={() => handleEdit(prod)} style={{ background: '#e3e8f7', color: '#09278a', border: 'none', borderRadius: 8, padding: '0.3rem 1rem', fontWeight: 600, cursor: 'pointer', marginRight: '0.5rem', fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)' }}>Edit</button>
              <button onClick={() => handleDelete(prod.id)} style={{ background: '#f44336', color: '#fff', border: 'none', borderRadius: 8, padding: '0.3rem 1rem', fontWeight: 600, cursor: 'pointer', fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)' }}>Delete</button>
            </div>
          ))}
          {products.length === 0 && <div style={{ color: '#bfc8e6', textAlign: 'center', padding: '2rem 0', fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}>No products added yet.</div>}
        </div>
      )}
    </div>
  );
}

export default OwnerLaundryServiceTab;
