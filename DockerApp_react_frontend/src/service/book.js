import axios from 'axios'
import moment from 'moment'
export default {
  book,
  getDoctorList,
  getAppointmentList
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

function getDoctorList() {
  return new Promise((resolve, reject) => {
    axios.get(`http://34.204.14.58:3000/doctor-list`).then((res) => {
          resolve(res.data.doctor_list);
      }).catch(err => {
          reject(getErrorMsg(err));
      });
  })
}

function getAppointmentList(user) {
  return new Promise((resolve, reject) => {
    axios.get(`http://34.204.14.58:3000/get-appointments`,{ params:{
      doctorId: user._id
  }}).then((res) => {
      let {appointments} = res.data;
      for( let i = 0; i < appointments.length; i ++){
        appointments[i].bookTime = moment(appointments[i].bookTime).format("yyyy-MM-DD HH:mm:ss");
      }
      resolve(appointments);
    }).catch(err => {
        reject(getErrorMsg(err));
    });
  })
}

function book(dateTime, doctorId, patient) {
  const data = {
      doctorId: doctorId,
      patientId: patient._id,
      patientName: patient.name,
      bookTime: new Date(dateTime).toISOString()
  }
  return new Promise((resolve, reject) => {
      axios.post(`http://34.204.14.58:3000/book-appointment`, data).then((res) => {
          resolve(res.data.patient);
      }).catch(err => {
          reject(getErrorMsg(err));
      });
  })
}
