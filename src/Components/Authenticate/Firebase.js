// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDfSDCEzq9vo3kfxLCb3B6G6ONaZEs1CI",
  authDomain: "auth-nua.firebaseapp.com",
  projectId: "auth-nua",
  storageBucket: "auth-nua.appspot.com",
  messagingSenderId: "813136020460",
  appId: "1:813136020460:web:bdabd06a611c1f0cf7b6c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;