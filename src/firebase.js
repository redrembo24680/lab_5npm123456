import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyADDDNvT-cibq96z4pg-xsI5JW2zZjjQuQ",
  authDomain: "lab4-misha.firebaseapp.com",
  projectId: "lab4-misha",
  storageBucket: "lab4-misha.firebasestorage.app",
  messagingSenderId: "733153430979",
  appId: "1:733153430979:web:80df58700cacf5f0a38176",
  measurementId: "G-5025JJGKHM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
