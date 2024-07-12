import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBUBTbY9-mS2qYt5JiMU_lBLvz34WGQqB0",
  authDomain: "fancy-logger.firebaseapp.com",
  projectId: "fancy-logger",
  storageBucket: "fancy-logger.appspot.com",
  messagingSenderId: "289981909989",
  appId: "1:289981909989:web:38e56475c0419a04333d0c",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { app, firestore, auth };
