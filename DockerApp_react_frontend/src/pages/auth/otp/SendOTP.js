import React, {useState} from "react";
import { Formik, useFormikContext } from 'formik';
import { Link, useHistory, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastr";
import authService from "../../../service/auth";
import moment from 'moment'

import "toastr/build/toastr.css";
import "animate.css/animate.css";
import { useAuth } from "../../../context/auth";

import { containsUppercase, containsLowercase, containsNumber, containsSpecial,
  validPhoneNumber, validPassword, validYear, validMonth, validDay} from '../../../utils/validation'

let container;
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function SendOTP (props) {
  let history = useHistory();
  let query = useQuery();
  const { setAuthTokens } = useAuth();
  const [isSubmitting, setSubmitting] = useState(false);
  // const initialValues = {username: '', password: ''};
  const initialValues = {number: ''};

  const sendOTP = (values) => {
    authService.sendOTP(values.number)
    .then(
        requestId => {
          localStorage.setItem('requestId', requestId);
          setSubmitting(false);
          history.push("/verify-otp");
        },
        error => {
          setSubmitting(false);
          container.error(error, 'Error', {
            showAnimation: "animated slideInRight",
            hideAnimation: "animated slideOutRight",
            timeOut: 2000,
            onCloseClick: () => {container.clear()}
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
          <h2 className="title">OTP</h2>
          <Formik
          initialValues={initialValues}
          validate={values => {
            const errors = {};
            const requiredFields = ['number'];
            for(let field of requiredFields){
              if (!values[field]) {
                errors[field] = `${field} is Required`;
              }
            }
            return errors;
          }}
          onSubmit={(values) => {
              setTimeout( async () =>{
                  setSubmitting(true)
                  sendOTP(values);
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
                <h3 className="form-title text-center">Send OTP</h3>
                <div className="form-group">
                    <label for="name">Phone Number</label>
                    <input type="text" className={errors.number && touched.number ? "form-control is-invalid" : "form-control"} name="number" value={values.number} onChange={handleChange} onBlur={handleBlur}/>
                    <div className="invalid-feedback">{errors.number}</div>
                </div>
                <div className="form-group text-center align-items-center">
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Get Code</button>
                </div>
            </form>
          )}
          </Formik>
      </div>
    </div>
  );
}

export default SendOTP;