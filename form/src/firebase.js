import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyDEMSEh_ifXlyFxREhrw5kxH1tUH5eaHcg",
  authDomain: "pdfcreating.firebaseapp.com",
  projectId: "pdfcreating",
  storageBucket: "pdfcreating.firebasestorage.app",
  messagingSenderId: "558516335315",
  appId: "1:558516335315:web:36ad5fb52fc5d8ba669a26",
  measurementId: "G-MV5BGR8XL6"
};

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);

export { functions, httpsCallable };