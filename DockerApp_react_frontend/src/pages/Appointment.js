import React, {useState, useEffect} from "react";
import { Formik, useFormikContext } from 'formik';
import { Link, useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastr";
import bookService from "../service/book";
import moment from 'moment'
import { useAuth } from "../context/auth";

import "toastr/build/toastr.css";
import "animate.css/animate.css";
import DateTimePicker from 'react-datetime-picker';

const DateTimeSelect = ({values}) => {
  const {
    setFieldValue
  } = useFormikContext();
  const onChangeDate = (dateTime) => {
    console.log(dateTime);
    setFieldValue('dateTime', dateTime);
  };
  return (
    <DateTimePicker
      onChange={onChangeDate}
      value={values.dateTime}
    />
  )
}

let container;
function PatientSignup (props) {
  const [isSubmitting, setSubmitting] = useState(false);
  const [doctorList, setDoctorList] = useState([]);
  let initialValues = {dateTime: ''};
  const { authTokens } = useAuth();
  useEffect(() => {
    bookService.getDoctorList().then((res) => {
      setDoctorList(res);
      initialValues.doctorId = res[0]._id;
    }).catch(error => {
      container.error(error, 'Error', {
        showAnimation: "animated slideInRight",
        hideAnimation: "animated slideOutRight",
        closeButton: true
      })
    });
  }, [])

  const bookAppointment = (data) => {
    bookService.book(data.dateTime, data.doctorId, authTokens)
    .then(
        user => {
          setSubmitting(false);
          container.success('Appointment Booked Successfully', 'Success', {
            showAnimation: "animated slideInRight",
            hideAnimation: "animated slideOutRight",
            closeButton: true,
          })
        },
        error => {
          setSubmitting(false);
          container.error(error, 'Error', {
            showAnimation: "animated slideInRight",
            hideAnimation: "animated slideOutRight",
            closeButton: true
          })
        }
    );
  }
  return (
    <div className="wrapper">
      <ToastContainer
          className="toast-top-right"
          ref={ref => {
            container = ref;
          }}
        />
      <div className="container">
          <h2 className="title">Appointment</h2>
          <Formik
          initialValues={initialValues}
          validate={values => {
            console.log('values', values);
            const errors = {};
            if (!values.dateTime) {
              errors.dateTime = `Date and Time is Required`;
            }
            return errors;
          }}
          onSubmit={(values) => {
              setTimeout( async () =>{
                  setSubmitting(true)
                  bookAppointment(values);
                }, 400);
          }}
          >
          {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              resetForm
              /* and other goodies */
          }) => (
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Date and Time</label>
                  <DateTimeSelect values={values}/>
                  {/* <div v-if="submitted" className="invalid-feedback">Please select Date and Time</div> */}
                  {/* <div className="invalid-feedback" style={errors.dateTime && touched.dateTime ? {display: 'block'} : {display: 'none'}}>{errors.dateTime}</div> */}
                </div>
                <div className="form-group">
                    <label htmlFor="name">Patient Name</label>
                    <select className="form-control" name="doctorId" value={values.doctorId} onChange={handleChange} onBlur={handleBlur}>
                      {
                        doctorList.map((doctor) => (
                          <option key={doctor._id} value={doctor._id}>{doctor.name}</option>
                        ))
                      }
                    </select>
                </div>
                <div className="form-group text-center align-items-center">
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Book</button>
                </div>
            </form>
          )}
          </Formik>
      </div>
    </div>
  );
}

export default PatientSignup;