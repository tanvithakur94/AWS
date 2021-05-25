import React, {useState} from "react";
import { Formik, useFormikContext } from 'formik';
import { Link, useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastr";
import authService from "../../../service/auth";
import moment from 'moment'

import "toastr/build/toastr.css";
import "animate.css/animate.css";

import { containsUppercase, containsLowercase, containsNumber, containsSpecial,
  validPhoneNumber, validPassword, validEmail} from '../../../utils/validation'

const qualification_list= ['Bhams', 'Bams', 'Mbbs'];
let container;
function DoctorSignup (props) {
  let history = useHistory();
  const [isSubmitting, setSubmitting] = useState(false);
  // const initialValues = {name: '',phone: '', email: '', password: '', address: '', pincode: '', issue: '',
  //     birthday: '', birthmonth: '', birthyear: '', gender: 'male', firsttimevisit: 'true', termsOfUse: false};
  const initialValues = {name: 'name',qualification: 'Bhams', email: 'doctor2@email.com', password: 'Bgt54321!123', age: '1',
    speciality: 'speciality', experienceinyears: 10, previousexperience: 'previous work', termsOfUse: false};
  const gender_options = [
    {key: 'male', text: 'Male'},
    {key: 'female', text: 'Female'},
  ];
  const firstVisit_options = [
      {key: true, text: 'Yes'},
      {key: false, text: 'No'},
  ];

  const patientregister = (user) => {

    authService.doctorregister(user)
    .then(
        user => {
          setSubmitting(false);
          history.push("/doctor-login?success=true");
        },
        error => {
          setSubmitting(false);
          container.error(error, 'Error', {
            showAnimation: "animated slideInRight",
            hideAnimation: "animated slideOutRight",
            timeOut: 3000,
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
          <h2 className="title">Doctor Registration</h2>
          <Formik
          initialValues={initialValues}
          validate={values => {
            console.log('values', values);
            const errors = {};
            const requiredFields = ['name', 'email', 'password', 'age', 'speciality', 'experienceinyears', 'previousexperience'];
            for(let field of requiredFields){
              if (!values[field]) {
                errors[field] = `${field} is Required`;
              }
            }
            if(!values.termsOfUse)
              errors.termsOfUse = "Please tick above checkbox";
            return errors;
          }}
          onSubmit={(values) => {
              setTimeout( async () =>{
                  setSubmitting(true)
                  if(validPassword(values.password))
                    patientregister(values);
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
                <h3 className="form-title text-center">Registration</h3>
                <div className="form-group">
                    <label for="name">Patient Name</label>
                    <input type="text" className={errors.name && touched.name ? "form-control is-invalid" : "form-control"} name="name" value={values.name} onChange={handleChange} onBlur={handleBlur}/>
                    <div className="invalid-feedback">{errors.name}</div>
                </div>
                
                <div className="form-group">
                  <label for="name">Qualitification</label>
                  <select className="form-control" name="qualification" onChange={handleChange}>
                    {
                      qualification_list.map(item =>
                        <option key={item} value={item}>{item}</option>
                       )
                    }
                  </select>
                </div>
                <div className="form-group">
                    <label for="name">Email</label>
                    <input type="text" className={touched.email && ( errors.email || !validEmail(values.email)) ? "form-control is-invalid" : "form-control"} name="email" value={values.email} onChange={handleChange} onBlur={handleBlur}/>
                    <div className="invalid-feedback">{errors.email}</div>
                    { !errors.email && !validEmail(values.email) && <div className="invalid-feedback">Email is not valid</div>}
                </div>
                <div className="form-group">
                    <label for="name">Password</label>
                    <input type="password" className={ touched.password && !validPassword(values.password) ? "form-control is-invalid" : "form-control"} name="password" value={values.password}  onChange={handleChange} onBlur={handleBlur}/>
                    <div className="invalid-feedback">{errors.password}</div>
                    {values.password && !containsUppercase(values.password) && <div className="invalid-feedback">password should contain Uppercase</div>}
                    {values.password && !containsLowercase(values.password) && <div className="invalid-feedback">password should contain Lowercase</div>}
                    {values.password && !containsNumber(values.password) && <div className="invalid-feedback">password should contain Number</div>}
                    {/* {values.password && !containsSpecial(values.password) && <div className="invalid-feedback">password should contain Special character</div>} */}
                </div>
                <div className="form-group">
                    <label for="age">Age</label>
                    <input type="text" className={errors.age && touched.age ? "form-control is-invalid" : "form-control"} name="age" value={values.age}  onChange={handleChange} onBlur={handleBlur}/>
                    <div className="invalid-feedback">{errors.age}</div>
                </div>
                <div className="form-group">
                    <label for="speciality">Speciality</label>
                    <input type="text" className={errors.speciality && touched.speciality ? "form-control is-invalid" : "form-control"} name="speciality" value={values.speciality}  onChange={handleChange} onBlur={handleBlur}/>
                    <div className="invalid-feedback">{errors.speciality}</div>
                </div>
                <div className="form-group">
                    <label for="experienceinyears">Experience in years</label>
                    <input type="text" className={errors.experienceinyears && touched.experienceinyears ? "form-control is-invalid" : "form-control"} name="experienceinyears" value={values.experienceinyears} onChange={handleChange} onBlur={handleBlur}/>
                    <div className="invalid-feedback">{errors.experienceinyears}</div>
                </div>
                <div className="form-group">
                    <label for="name">Previous Work Experience</label>
                    <input type="text" className={errors.previousexperience && touched.previousexperience ? "form-control is-invalid" : "form-control"} name="previousexperience" value={values.previousexperience} onChange={handleChange} onBlur={handleBlur}/>
                    <div className="invalid-feedback">{errors.previousexperience}</div>
                </div>

                <div className="form-group">
                    <label>
                        <input type="checkbox" checked={values.termsOfUse} className="mr-1" name="termsOfUse" onChange={handleChange} onBlur={handleBlur}/>
                        I agree to the terms of use
                    </label>
                    <div className="invalid-feedback" style={errors.termsOfUse && touched.termsOfUse ? {display: 'block'} : {display: 'none'}}>{errors.termsOfUse}</div>
                </div>
                <div className="form-group text-center align-items-center">
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Register</button>
                    <img style={isSubmitting ? {display: 'inline-block', height: '15px'} : {display: 'none', height: '15px'}} src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                </div>
                <div className="text-center">
                    Have an account with us? <Link to="/doctor-login">login here</Link>
                </div>
            </form>
          )}
          </Formik>
      </div>
    </div>
  );
}

export default DoctorSignup;