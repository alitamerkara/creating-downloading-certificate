import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA3spUh49zV7NuxHdN_VomQBdDmW0H2Ejo",
  authDomain: "certificate-6b178.firebaseapp.com",
  projectId: "certificate-6b178",
  storageBucket: "certificate-6b178.firebasestorage.app",
  messagingSenderId: "1094097126991",
  appId: "1:1094097126991:web:218e68fe362688d6334c3a",
  measurementId: "G-F2H79XFHHT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const functions = getFunctions(app);
const db = getFirestore(app);

// Function to save user information to Firestore
async function saveUserInfo(firstName, lastName, phone) {
  try {
    const docRef = await addDoc(collection(db, "info"), {
      isim: firstName,
      soyisim: lastName,
      telefon: phone
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export { functions, httpsCallable, db, saveUserInfo };