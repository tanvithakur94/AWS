import axios from 'axios'
export default {
  patientregister,
  patientlogin,
  doctorregister,
  doctorlogin,
  updatepatientprofile,
  updatedoctorprofile,
  sendOTP,
  verifyOTP
};
function getErrorMsg(error){
  if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return error.response.data.error;
  } else if (error.request) {
    return "No response from server";
  } else {
      // Something happened in setting up the request that triggered an Error
      return error.message;
  }
}

function patientregister(user) {
  return new Promise((resolve, reject) => {
      axios.post(`http://34.204.14.58:3000/patientsignup`, user).then((res) => {
          resolve(res.data.patient);
      }).catch(err => {
          reject(getErrorMsg(err));
      });
  })
}

function patientlogin(user) {
  return new Promise((resolve, reject) => {
    axios.post(`http://34.204.14.58:3000/patientlogin`, user).then((res) => {
        let {patient} = res.data;
        resolve(patient);
    }).catch(err => {
        reject(getErrorMsg(err));
    })
  })
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

function doctorlogin(user) {
  return new Promise((resolve, reject) => {
    axios.post(`http://34.204.14.58:3000/doctorlogin`, user).then((res) => {
        let {doctor} = res.data;
        resolve(doctor);
    }).catch(err => {
        reject(getErrorMsg(err));
    })
  })
}

function sendOTP(number) {
  return new Promise((resolve, reject) => {
    axios.post(`http://34.204.14.58:3000/sendOTP`, {number: number}).then((res) => {
        let {requestId} = res.data;
        resolve(requestId);
    }).catch(err => {
        reject(getErrorMsg(err));
    })
  })
}

function verifyOTP(requestId, code) {
  return new Promise((resolve, reject) => {
      axios.post(`http://34.204.14.58:3000/checkOTP`, {requestId, code}).then((res) => {
          resolve();
      }).catch(err => {
          reject(getErrorMsg(err));
      })
  })
}


function updatepatientprofile(user) {
  return new Promise((resolve, reject) => {
    axios.post(`http://34.204.14.58:3000/updatepatientprofile`, user).then((res) => {
        let {doc} = res.data;
        var date = doc.birthday.split('-');
        doc.birthdate = date[2];
        doc.birthmonth = date[1];
        doc.birthyear = date[0];
        resolve(doc);
    }).catch(error => {
        reject(getErrorMsg(error));
    });
})
}

function updatedoctorprofile(user) {
  return new Promise((resolve, reject) => {
      axios.post(`http://34.204.14.58:3000/updatedoctorprofile`, user).then((res) => {
          let {doc} = res.data;
          resolve(doc);
      }).catch(error => {
          reject(error);
      });
  })
}

