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
function VerifyOTP (props) {
  let history = useHistory();
  let query = useQuery();
  const { setOTPVerified } = useAuth();
  const [isSubmitting, setSubmitting] = useState(false);
  // const initialValues = {username: '', password: ''};
  const initialValues = {code: ''};

  const verifyOTP = (values) => {
    const requestId = localStorage.getItem('requestId');
    authService.verifyOTP(requestId, values.code)
    .then(
        requestId => {
          localStorage.setItem('requestId', requestId);
          setOTPVerified(true);
          setSubmitting(false);
          history.push("/");
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
            const requiredFields = ['code'];
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
                  verifyOTP(values);
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
                <h3 className="form-title text-center">Verify OTP</h3>
                <div className="form-group">
                    <label for="name">Code</label>
                    <input type="text" className={errors.code && touched.code ? "form-control is-invalid" : "form-control"} name="code" value={values.code} onChange={handleChange} onBlur={handleBlur}/>
                    <div className="invalid-feedback">{errors.code}</div>
                </div>
                <div className="form-group text-center align-items-center">
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Verify</button>
                </div>
            </form>
          )}
          </Formik>
      </div>
    </div>
  );
}

export default VerifyOTP;