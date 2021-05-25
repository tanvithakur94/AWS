import BASE_URL from './config';
import { authHeader } from '../_helpers';
import axios from 'axios';

export const userService = {
    patientlogin,
    doctorlogin,
    logout,
    patientregister,
    doctorregister,
    sendOTP,
    verifyOTP,
    updatepatientprofile,
    updatedoctorprofile,
    getAll,
    getById,
    update,
    delete: _delete
};

function getErrorMsg(error){
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return error.response.data.error;
    } else if (error.request) {
        return error.request;
    } else {
        // Something happened in setting up the request that triggered an Error
        return error.message;
    }
}
function patientlogin(username, password) {
    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ username, password })
    // };

    // return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
    //     .then(handleResponse)
    //     .then(user => {
    //         // login successful if there's a jwt token in the response
    //         if (user.token) {
    //             // store user details and jwt token in local storage to keep user logged in between page refreshes
    //             localStorage.setItem('user', JSON.stringify(user));
    //         }

    //         return user;
    //     });
    return new Promise((resolve, reject) => {
        axios.post(`http://34.204.14.58:3000/patientlogin`, {email: username, password}).then((res) => {
            let {patient} = res.data;
            if(patient.userToken){
                localStorage.setItem('user', JSON.stringify(patient));
                localStorage.setItem('userType', 0)
            }
            resolve(patient);
        }).catch(err => {
            reject(getErrorMsg(err));
        })
    })
}

function sendOTP(number) {
    return new Promise((resolve, reject) => {
        axios.post(`http://34.204.14.58:3000/sendOTP`, {number: number}).then((res) => {
            const {requestId} = res.data;
            resolve(requestId);
        }).catch(err => {
            reject(getErrorMsg(err));
        })
    })
}

function verifyOTP({requestId, code}) {
    return new Promise((resolve, reject) => {
        axios.post(`http://34.204.14.58:3000/checkOTP`, {requestId, code}).then((res) => {
            resolve();
        }).catch(err => {
            reject(getErrorMsg(err));
        })
    })
}

function doctorlogin(username, password) {
    return new Promise((resolve, reject) => {
        axios.post(`http://34.204.14.58:3000/doctorlogin`, {email: username, password}).then((res) => {
            const {doctor} = res.data;
            if(doctor.userToken){
                localStorage.setItem('user', JSON.stringify(doctor));
                localStorage.setItem('userType', 1)
            }
            resolve(doctor);
        }).catch(err => {
            reject(getErrorMsg(err));
        })
    })
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
}

function patientregister(user) {
    return new Promise((resolve, reject) => {
        axios.post(`http://34.204.14.58:3000/patientsignup`, user).then((res) => {
            console.log(res);
            // return res.data.patient;
            resolve(res.data.patient);
        }).catch(err => {
            reject(getErrorMsg(err));
        });
    })
    
    // return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
}
function doctorregister(user) {
    return new Promise((resolve, reject) => {
        axios.post(`http://34.204.14.58:3000/doctorsignup`, user).then((res) => {
            resolve(res.data.doctor);
        }).catch(err => {
            reject(getErrorMsg(err));
        });
    })
}


function updatepatientprofile(user) {
    return new Promise((resolve, reject) => {
        axios.post(`http://34.204.14.58:3000/updatepatientprofile`, user).then((res) => {
            let {doc} = res.data;
            localStorage.setItem('user', JSON.stringify(doc));
            resolve(doc);
        }).catch(error => {
            reject(error);
        });
    })
}


function updatedoctorprofile(user) {
    return new Promise((resolve, reject) => {
        axios.post(`http://34.204.14.58:3000/updatedoctorprofile`, user).then((res) => {
            let {doc} = res.data;
            localStorage.setItem('user', JSON.stringify(doc));
            resolve(doc);
        }).catch(error => {
            reject(error);
        });
    })
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}


function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}