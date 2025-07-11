// Run this script once to add superadmin credentials to Firestore
const { initializeApp } = require('firebase/app');
const { getFirestore, setDoc, doc } = require('firebase/firestore');

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

async function addSuperAdmin() {
  await setDoc(doc(db, 'superadmins', 'ppj'), {
    email: 'ppj@gmail.com',
    password: 'password'
  });
  console.log('Superadmin credentials added to Firestore.');
}

addSuperAdmin();
