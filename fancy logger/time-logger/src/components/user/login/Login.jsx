import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, login } from "../../../services/AuthServices";
import Footer from "../../footer/Footer";


const Login = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
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
        login(userData.email, userData.password);
    }

    return (
        <div>
        <form className="form container" onSubmit={submitHandler}>
            <div className="form-group mt-3">
                <input type="email" placeholder="El. paštas" name="email" onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group mt-3">
                <input type="password" placeholder="Slaptažodis" name="password" onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group mt-3">
                <button type="submit" className="btn btn-primary">Prisijungti</button>
            </div>
            <div className="form-group mt-3">
                <p>Neturite paskyros? <Link to="/register">Galite susikurti</Link></p>
            </div>
        </form>
        <Footer/>
         </div>
    );
   
}

export default Login;
