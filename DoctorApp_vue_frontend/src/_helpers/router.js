import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../home/HomePage';
import PatientLoginPage from '../login/PatientLoginPage';
import DoctorLoginPage from '../login/DoctorLoginPage';
import DoctorRegisterPage from '../register/DoctorRegisterPage';
import PatientRegisterPage from '../register/PatientRegisterPage';
import SendOTPPage from '../otp/SendOTPPage';
import VerifyOTPPage from '../otp/VerifyOTPPage';
import Profile from '../profile/profilePage';
import Appointment from '../appointment/Appointment';
import Order from '../order/Order';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage },
    { path: '/patient_login', component: PatientLoginPage },
    { path: '/patient_register', component: PatientRegisterPage },
    { path: '/doctor_login', component: DoctorLoginPage },
    { path: '/doctor_register', component: DoctorRegisterPage },
    { path: '/send_otp', component: SendOTPPage },
    { path: '/verify_otp', component: VerifyOTPPage },
    { path: '/profile', component: Profile },
    { path: '/appointment', component: Appointment },
    { path: '/order', component: Order },
    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/doctor_login', '/patient_login', '/doctor_register', '/patient_register', '/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  if (authRequired && !loggedIn) {
    return next('/');
  }
  next();
})