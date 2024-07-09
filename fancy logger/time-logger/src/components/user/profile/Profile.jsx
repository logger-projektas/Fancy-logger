import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getUserData, auth, logout } from "../../../services/AuthServices";
import Footer from "../../footer/Footer";

const Profile = () => {
    const [userData, setUserData] = useState({});
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate('/login');
        getUserData(user, setUserData);
    }, [user, loading, navigate]);

    return (
        <ul className="navbar-nav">
            <li className="nav-item">
                <Link to="/" className="nav-link active">Pradinis</Link>
            </li>
            {user ? (
                <li className="nav-item dropdown">
                    <a href="/" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {userData.name}
                    </a>
                    <ul className="dropdown-menu">
                        <li className="dropdown-item">{userData.email}</li>
                        <li className="dropdown-item" onClick={logout}>Atsijungti</li>
                    </ul>
                </li>
            ) : (
                <li className="nav-item">
                    <Link to="/login" className="nav-link">Prisijungti</Link>
                </li>
            )}
            <Footer/>
        </ul>
        
    );
    
}

export default Profile;
