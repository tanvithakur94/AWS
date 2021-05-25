import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import '../assets/css/banner.css';
import logoCircle from "../assets/images/logoCircle.png";
import { useAuth } from "../context/auth";
import _ from 'lodash';

function Banner({}) {
  let history = useHistory();
  const { authTokens, OTPVerified } = useAuth();

  const gotoHomePage = () => {
    history.push('/');
  }

  const gotoProfile = () => {
    history.push('/profile');
  }

  const gotoOrder = () => {
    history.push('/order');
  }

  const gotoAppointment = () => {
    history.push('/appointment');
  }

  const gotoRegistration = () => {
    history.push('/doctor-signup');
  }

  const gotoPatientRegistration = () => {
    history.push('/patient-signup');
  }
  return (
    <div className="banner">
        <a className="logo" href="/">
          <img src={logoCircle} className="logo-img mr-2"/>
          DOCTOR
        </a>
        {
          authTokens && OTPVerified ? 
          <ul>
            <li onClick={gotoHomePage}><a>Home</a></li>
            <li onClick={gotoProfile}><a>Profile</a></li>
            { authTokens.type == 1 && <li onClick={gotoOrder}><a>Appointments</a></li> }
            { authTokens.type == 0 && <li onClick={gotoAppointment}><a>Book an appointment</a></li>}
          </ul>:
          <ul>
            <li onClick={gotoHomePage}><a>Home</a></li>
            <li onClick={gotoRegistration}><a>Doctor Registration</a></li>
            <li onClick={gotoPatientRegistration}><a>Patient Registration</a></li>
          </ul>
        }
    </div>
  );
}

export default Banner;