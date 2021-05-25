import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Home from "./pages/Home";
import { AuthContext } from "./context/auth";
import PatientLogin from './pages/auth/login/PatientLogin';
import DoctorLogin from './pages/auth/login/DoctorLogin';
import PatientSignup from './pages/auth/signup/PatientSignup';
import DoctorSignup from './pages/auth/signup/DoctorSignup';
import SendOTP from './pages/auth/otp/SendOTP';
import VerifyOTP from './pages/auth/otp/VerifyOTP';
import Profile from './pages/Profile';
import Appointment from './pages/Appointment';
import Order from './pages/Order';
import Header from "./sections/Header";
import Banner from "./sections/Banner";
import Footer from "./sections/Footer";

function App(props) {
  const [authTokens, setAuthTokens] = useState(JSON.parse(localStorage.getItem("tokens")));
  const [OTPVerified, setOTPVerified] = useState(localStorage.getItem("OTPVerified") !== null ? localStorage.getItem("OTPVerified") : false);
  
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }
  
  const setVerified = (OTPVerified) => {
    localStorage.setItem("OTPVerified", OTPVerified);
    setOTPVerified(OTPVerified);
  }

  const logout = () => {
    localStorage.removeItem("tokens");
    localStorage.removeItem("OTPVerified");
    setAuthTokens(null);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens, OTPVerified, setOTPVerified: setVerified, logout: logout }}>
      <Router>
        <div>
          <Header />
          <Banner />
          <Route path="/patient-login" component={PatientLogin} />
          <Route path="/patient-signup" component={PatientSignup} />
          <Route path="/doctor-login" component={DoctorLogin} />
          <Route path="/doctor-signup" component={DoctorSignup} />
          <Route path="/send-otp" component={SendOTP} />
          <Route path="/verify-otp" component={VerifyOTP} />
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />*/}
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/appointment" component={Appointment} />
          <PrivateRoute path="/order" component={Order} />
          <Footer />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;