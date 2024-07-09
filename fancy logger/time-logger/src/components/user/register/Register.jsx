import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, registerWithEmailAndPassword } from "../../../services/AuthServices";

const Register = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        firstName: '',
        email: '',
        password: ''
    });

    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        if (user) navigate('/');
    }, [user, loading, navigate]);

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    }

    const submitHandler = (e) => {
        e.preventDefault();
        registerWithEmailAndPassword(userData.firstName, userData.email, userData.password);
    }

    return (
        <form className="form container" onSubmit={submitHandler}>
            <div className="form-group mt-3">
                <input type="text" onChange={handleChange} placeholder="Jūsų vardas" name="firstName" className="form-control" />
            </div>
            <div className="form-group mt-3">
                <input type="email" onChange={handleChange} placeholder="El. paštas" name="email" className="form-control" />
            </div>
            <div className="form-group mt-3">
                <input type="password" onChange={handleChange} placeholder="Slaptažodis" name="password" className="form-control" />
            </div>
            <div className="form-group mt-3">
                <button type="submit" className="btn btn-primary">Registruotis</button>
            </div>
            <div className="form-group mt-3">
                <p>Turite paskyrą? <Link to="/login">Galite prisijungti</Link></p>
            </div>
        </form>
    );
}

export default Register;


