import { userService } from '../_services';
import { router } from '../_helpers';

const user = JSON.parse(localStorage.getItem('user'));
const state = user ? { status: { loggedIn: true }, user, OTPverified: user.hasOwnProperty('OTPverified') && user.OTPverified }
    : { status: {}, user: null, OTPverified: false };

const actions = {
    patientlogin({ dispatch, commit }, { username, password }) {
        commit('loginRequest', { username });
    
        userService.patientlogin(username, password)
            .then(
                user => {
                    commit('loginPatientSuccess', user);
                    router.push('/send_otp');
                    // router.push('/profile');
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },

    sendOTP({ dispatch, commit }, number) {
        userService.sendOTP(number)
            .then(
                data => {
                    commit('sendOTPSuccess', data);
                    localStorage.setItem('requestId', data);
                    router.push('/verify_otp');
                },
                error => {
                    commit('sendOTPFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },

    verifyOTP({ dispatch, commit }, code) {
        const requestId = localStorage.getItem('requestId');
        userService.verifyOTP({requestId, code})
            .then(
                data => {
                    commit('verifyOTPSuccess');
                    router.push('/profile');
                },
                error => {
                    commit('verifyOTPFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },

    doctorlogin({ dispatch, commit }, { username, password }) {
        commit('loginRequest', { username });
    
        userService.doctorlogin(username, password)
            .then(
                user => {
                    commit('loginDoctorSuccess', user);
                    // router.push('/profile');
                    router.push('/send_otp');
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    logout({ commit }) {
        userService.logout();
        commit('logout');
    },
    patientregister({ dispatch, commit }, user) {
        commit('patientregisterRequest', user);
    
        userService.patientregister(user)
            .then(
                user => {
                    commit('patientregisterSuccess', user);
                    router.push({path: "/patient_login", query: { success: true }});
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },

    updatepatientprofile({ dispatch, commit }, user) {
        commit('updatepatientprofileRequest', user);
    
        userService.updatepatientprofile(user)
            .then(
                user => {
                    commit('updatepatientprofileSuccess', user);
                    return 1;
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/error', 'There is some error updating profile.', { root: true });
                    return 0;
                }
            );
    },

    updatedoctorprofile({ dispatch, commit }, user) {
        commit('updatepatientprofileRequest', user);
    
        userService.updatedoctorprofile(user)
            .then(
                user => {
                    commit('updatepatientprofileSuccess', user);
                    return 1;
                },
                error => {
                    commit('registerFailure', 'There is some error updating profile.');
                    dispatch('alert/error', 'There is some error updating profile.', { root: true });
                    return 0;
                }
            );
    },

    doctorregister({ dispatch, commit }, user) {
        commit('doctorregisterRequest', user);
    
        userService.doctorregister(user)
            .then(
                user => {
                    commit('doctorregisterSuccess', user);
                    router.push({path: "/doctor_login", query: { success: true }});
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    }
};

const mutations = {
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginDoctorSuccess(state, user) {
        state.status = { loggedIn: true };
        state.user = user;
        state.userType = 1;
    },
    loginPatientSuccess(state, user) {
        // state.status = { loggedIn: true };
        state.user = user;
        state.userType = 0;
    },
    loginFailure(state) {
        state.status = {};
        state.user = null;
    },
    sendOTPSuccess(state) {
        state.status.OTPsent = true;
    },
    sendOTPFailure(state) {
        state.status.OTPsent = false;
    },
    verifyOTPSuccess(state) {
        state.OTPverified = true;
        state.user.OTPverified = true;
        localStorage.setItem('user', JSON.stringify(state.user));
    },
    verifyOTPFailure(state) {
        state.OTPverified = false;
    },
    logout(state) {
        state.status = {};
        state.user = null;
        state.OTPverified = false;
    },
    patientregisterRequest(state, user) {
        state.status = { registering: true };
    },
    patientregisterSuccess(state, user) {
        state.status = {};
    },
    updatepatientprofileRequest(state, user) {
        state.status = { registering: true };
    },
    updatepatientprofileSuccess(state, user) {
        state.user = user;
        state.status = {};
    },
    doctorregisterRequest(state, user) {
        state.status = { registering: true };
    },
    doctorregisterSuccess(state, user) {
        state.status = {};
    },
    registerFailure(state, error) {
        state.status = {};
    }
};

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};