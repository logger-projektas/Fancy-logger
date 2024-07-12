import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../header/Header";
import Home from "../home/Home";
import Footer from "../footer/Footer";
import Login from "../user/login/Login";
import Register from "../user/register/Register";
import Reset from "../user/reset/Reset";
import Profile from "../user/profile/Profile";
import JobTips from "../jobtips/JobTips";
import ProjectList from "../projectlist/ProjektList";
import JobDone from "../jobdone/JobDoneSection/JobDone";
import "./App.scss";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div className="app">
              <div className="container text-center">
                <Home />

                <p>Prašome prisijungti!</p>
              </div>
              <Footer />
            </div>
          }
        />
        <Route path="/job-tips" element={<JobTips />} />
        <Route path="/projekt-list" element={<ProjectList />} />
        <Route path="/job-done" element={<JobDone />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
