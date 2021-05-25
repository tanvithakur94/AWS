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
function DoctorLogin (props) {
  let history = useHistory();
  let query = useQuery();
  const { setAuthTokens } = useAuth();
  const [isSubmitting, setSubmitting] = useState(false);
  // const initialValues = {username: '', password: ''};
  const initialValues = {email: 'doctor1@email.com', password: 'Bgt54321!123'};

  const doctorlogin = (user) => {
    authService.doctorlogin(user)
    .then(
        user => {
          user.type = 1;
          setSubmitting(false);
          setAuthTokens(user);
          history.push("/send-otp");
          // history.push("/");
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
          <h2 className="title">Doctor Login</h2>
          <Formik
          initialValues={initialValues}
          validate={values => {
            const errors = {};
            const requiredFields = ['email', 'password'];
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
                  doctorlogin(values);
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
                <h3 className="form-title text-center">Login</h3>
                {
                  query.get('success') && <div className="alert alert-success">
                    Doctor is created successfully.
                  </div>
                }
                <div className="form-group">
                    <label for="name">Email/UserId</label>
                    <input type="email" className={errors.email && touched.email ? "form-control is-invalid" : "form-control"} name="email" value={values.email} onChange={handleChange} onBlur={handleBlur}/>
                    <div className="invalid-feedback">{errors.email}</div>
                </div>
                <div className="form-group">
                    <label for="name">Password</label>
                    <input type="password" className={ touched.password ? "form-control is-invalid" : "form-control"} name="password" value={values.password}  onChange={handleChange} onBlur={handleBlur}/>
                    <div className="invalid-feedback">{errors.password}</div>
                    {/* {values.password && !containsUppercase(values.password) && <div className="invalid-feedback">password should contain Uppercase</div>}
                    {values.password && !containsLowercase(values.password) && <div className="invalid-feedback">password should contain Lowercase</div>}
                    {values.password && !containsNumber(values.password) && <div className="invalid-feedback">password should contain Number</div>} */}
                    {/* {values.password && !containsSpecial(values.password) && <div className="invalid-feedback">password should contain Special character</div>} */}
                </div>
                <div className="form-group text-center align-items-center">
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Login</button>
                    <img style={isSubmitting ? {display: 'inline-block', height: '15px'} : {display: 'none', height: '15px'}} src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                </div>
                <div className="text-center">
                    Don't have an account yet? <Link to="/doctor-signup">Register here</Link>
                </div>
            </form>
          )}
          </Formik>
      </div>
    </div>
  );
}

export default DoctorLogin;