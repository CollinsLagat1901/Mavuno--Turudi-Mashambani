import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8KLJDUqXRE3OdhHJxS7KyNped7mlSJq8",
  authDomain: "thee-entity.firebaseapp.com",
  projectId: "thee-entity",
  storageBucket: "thee-entity.firebasestorage.app",
  messagingSenderId: "873254572005",
  appId: "1:873254572005:web:24cc46c37106b6d2d3290c"
};

// Initialize Firebase
const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

export { app, auth, db };
