
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCj_nDHsKIDkyYrDUd-LinROJF_ZIx_xBI",
  authDomain: "the-student-spot-25c39.firebaseapp.com",
  projectId: "the-student-spot-25c39",
  storageBucket: "the-student-spot-25c39.appspot.com",
  messagingSenderId: "395674203502",
  appId: "1:395674203502:web:c153f740b05e58ef92bd7f",
  measurementId: "G-H3J88GXG2G"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
