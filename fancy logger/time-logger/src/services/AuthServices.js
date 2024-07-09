import { auth, firestore } from '../firebase';
import { useAuthState as firebaseUseAuthState } from 'react-firebase-hooks/auth';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    sendPasswordResetEmail 
} from 'firebase/auth';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

// Naudotojo autentifikacijos būsena
export const useAuthState = () => {
    const [user, loading, error] = firebaseUseAuthState(auth);
    return [user, loading, error];
};

// Registravimas
export const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(firestore, 'users'), {
            uid: user.uid,
            name,
            authProvider: "local",
            email
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// Atsijungimas
export const logout = () => {
    signOut(auth);
};

// Prisijungimas
export const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// Slaptažodžio atstatymas
export const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// Vartotojo duomenų gavimas
export const getUserData = async (user, setUser) => {
    try {
        const q = query(collection(firestore, 'users'), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setUser(doc.data());
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// Eksportuokime auth
export { auth, firestore };
