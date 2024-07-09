import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getUserData, auth } from '../services/AuthServices';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, loading, error] = useAuthState(auth);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (user) {
            getUserData(user, setUserData);
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, userData, loading, error }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
