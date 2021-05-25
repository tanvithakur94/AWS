import React, { useState, Fragment } from "react";
import { useHistory } from 'react-router-dom';
import '../assets/css/header.css';
import authService from "../service/auth";
import { useAuth } from "../context/auth";

function Header (props) {
  let history = useHistory();
  const { authTokens, OTPVerified, logout } = useAuth();

  const gotoDoctorLogin = () => {
    history.push('/doctor-login');
  }

  const gotoPatientLogin = () => {
    history.push('/patient-login');
  }

  const handleLogout = () => {
    logout();
    if(authTokens.type == 1)
        gotoDoctorLogin();
    else
        gotoPatientLogin();
  }
  return (
    <div className="header">
        <p className="contact">
            +91 345 698 7890
        </p>
        <div className="login-buttons">
            {
              authTokens && OTPVerified ? 
              <button onClick={handleLogout} className="btn btn-primary">Logout</button> :
              <Fragment>
                <button onClick={gotoDoctorLogin} className="btn btn-primary">Doctor login</button>
                <button className="btn btn-primary  patient-button" onClick={gotoPatientLogin}> Patient login</button>
              </Fragment>
            }
        </div>
    </div>
  );
}

export default Header;