import React from "react";
import PatientProfile from '../components/patientProfile'
import DoctorProfile from '../components/doctorProfile'
import { useAuth } from "../context/auth";

function Profile(){
  const { authTokens } = useAuth();
  return authTokens.type == 0 ? <PatientProfile /> : <DoctorProfile />;
}

export default Profile;