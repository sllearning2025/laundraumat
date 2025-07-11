import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyChjFt3B8WoMf0iJnTJgaEJsiCQT1B7DPc",
  authDomain: "laundry-app-a166b.firebaseapp.com",
  projectId: "laundry-app-a166b",
  storageBucket: "laundry-app-a166b.firebasestorage.app",
  messagingSenderId: "481789814862",
  appId: "1:481789814862:web:c3277537f42607c10d7b1f",
  measurementId: "G-WWNW5B7Q7H"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
