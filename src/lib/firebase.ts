import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAA5HkhL0XCvV7lEqWtlOoqbnusQfOsOJE",
  authDomain: "booksapp-95c48.firebaseapp.com",
  projectId: "booksapp-95c48",
  storageBucket: "booksapp-95c48.firebasestorage.app",
  messagingSenderId: "839713974807",
  appId: "1:839713974807:web:b8bf1d80439d1838a58a52",
  measurementId: "G-DGYQ5NMTY0"
};

const app = initializeApp(firebaseConfig);

export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);

export default app;