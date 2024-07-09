import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCW_AigbluyuWycKpZPRwntRcbeeaRNDQg",
    authDomain: "projektinis-a2534.firebaseapp.com",
    projectId: "projektinis-a2534",
    storageBucket: "projektinis-a2534.appspot.com",
    messagingSenderId: "238981230124",
    appId: "1:238981230124:web:c261a34af99f58d222eb89"
};
  

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { app, firestore, auth };
