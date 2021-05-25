import React, {Fragment, useState, useEffect} from "react";
import { Formik, useFormikContext } from 'formik';
import { Link, useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastr";
import authService from "../service/auth";
import moment from 'moment'
import { useAuth } from "../context/auth";

import "toastr/build/toastr.css";
import "animate.css/animate.css";
import "../assets/css/profile.css";

import { containsUppercase, containsLowercase, containsNumber, containsSpecial,
  validPhoneNumber, validPassword, validEmail} from '../utils/validation'

  let container;
function PatientProfile (props) {
  const { authTokens, setAuthTokens } = useAuth();
  let history = useHistory();
  const [isSubmitting, setSubmitting] = useState(false);
  const [isEditing, setEditing] = useState(false);
  let initialValues = authTokens;
  useEffect(() => {
    initialValues.password = "";
  }, [])
  const gender_options = [
    {key: 'male', text: 'Male'},
    {key: 'female', text: 'Female'},
  ];
  const firstVisit_options = [
      {key: true, text: 'Yes'},
      {key: false, text: 'No'},
  ];

  const cancelEditing = (e) => {
    e.preventDefault();
    setEditing(false);
  }

  const editProfile = (e) => {
    e.preventDefault();
    setEditing(true);
  }

  const updateprofile = (user) => {
    authService.updatedoctorprofile(user)
    .then(
        user => {
          user.type = 1;
          setSubmitting(false);
          setAuthTokens(user);
          container.success('Profile Updated Successfully', 'Success', {
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
            closeButton: true,
          })
        }
    );
  }
  return (
    <>
    <ToastContainer
        className="toast-top-right"
        ref={ref => {
          container = ref;
        }}
      />
    <div className="wrapper">
      <div className="container">
          <h2 className="title">Doctor Profile</h2>
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
            if (values.phone && !validPhoneNumber(values.phone)) {
              errors.phone = 'Invalid Phone Number';
            }
            return errors;
          }}
          onSubmit={(values) => {
              setTimeout( async () =>{
                  setSubmitting(true)
                  updateprofile(values);
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
                <h3 className="form-title text-center">Profile</h3>
                <div className={!isEditing ? 'form-group row bordered' : 'form-group row'}>
                    <label for="userid" class="col-md-4">User ID</label>
                    {
                      isEditing ?
                      <div class="col-md-8">
                          <input type="text" name="userID" class="form-control" value={values._id} disabled/>
                      </div> :
                      <div class="col-md-8">
                          {values._id}
                      </div>
                    }
                </div>
                <div className={!isEditing ? 'form-group row bordered' : 'form-group row'}>
                    <label for="userid" class="col-md-4">Doctor Name</label>
                    {
                      isEditing ?
                      <div class="col-md-8">
                        <input type="text" className={errors.name && touched.name ? "form-control is-invalid" : "form-control"} name="name" value={values.name} onChange={handleChange} onBlur={handleBlur}/>
                        <div className="invalid-feedback">{errors.name}</div>
                      </div> :
                      <div class="col-md-8">
                          {values.name}
                      </div>
                    }
                </div>
                <div className={!isEditing ? 'form-group row bordered' : 'form-group row'}>
                    <label for="userid" class="col-md-4">Qualitification</label>
                    {
                      isEditing ?
                      <div class="col-md-8">
                        <input type="text" className={errors.qualification && touched.qualification ? "form-control is-invalid" : "form-control"} name="qualification" value={values.qualification} onChange={handleChange} onBlur={handleBlur}/>
                        <div className="invalid-feedback">{errors.qualification}</div>
                      </div> :
                      <div class="col-md-8">
                          {values.qualification}
                      </div>
                    }
                </div>
                <div className={!isEditing ? 'form-group row bordered' : 'form-group row'}>
                    <label for="userid" class="col-md-4">Email</label>
                    {
                      isEditing ?
                      <div class="col-md-8">
                        <input type="text" className={touched.email && ( errors.email || !validEmail(values.email)) ? "form-control is-invalid" : "form-control"} name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} disabled/>
                        <div className="invalid-feedback">{errors.email}</div>
                        { !errors.email && !validEmail(values.email) && <div className="invalid-feedback">Email is not valid</div>}
                      </div> :
                      <div class="col-md-8">
                        {values.email}
                      </div>
                    }
                </div>
                <div className={!isEditing ? 'form-group row bordered' : 'form-group row'}>
                    <label for="userid" class="col-md-4">Password</label>
                    {
                      isEditing ?
                      <div class="col-md-8">
                        <input type="password" className={ touched.password && !validPassword(values.password) ? "form-control is-invalid" : "form-control"} name="password" value={values.password}  onChange={handleChange} onBlur={handleBlur}/>
                        <div className="invalid-feedback">{errors.password}</div>
                        {values.password && !containsUppercase(values.password) && <div className="invalid-feedback">password should contain Uppercase</div>}
                        {values.password && !containsLowercase(values.password) && <div className="invalid-feedback">password should contain Lowercase</div>}
                        {values.password && !containsNumber(values.password) && <div className="invalid-feedback">password should contain Number</div>}
                        {values.password && !containsSpecial(values.password) && <div className="invalid-feedback">password should contain Special character</div>}
                      </div> :
                      <div class="col-md-8">
                        {'*'.repeat(8)}
                      </div>
                    }
                </div>
                <div className={!isEditing ? 'form-group row bordered' : 'form-group row'}>
                    <label for="userid" class="col-md-4">Age</label>
                    {
                      isEditing ?
                      <div class="col-md-8">
                        <input type="text" className={errors.age && touched.age ? "form-control is-invalid" : "form-control"} name="age" value={values.age}  onChange={handleChange} onBlur={handleBlur}/>
                        <div className="invalid-feedback">{errors.age}</div>
                      </div> :
                      <div class="col-md-8">
                        {values.age}
                      </div>
                    }
                </div>
                <div className={!isEditing ? 'form-group row bordered' : 'form-group row'}>
                    <label for="userid" class="col-md-4">Speciality</label>
                    {
                      isEditing ?
                      <div class="col-md-8">
                        <input type="text" className={errors.speciality && touched.speciality ? "form-control is-invalid" : "form-control"} name="speciality" value={values.speciality}  onChange={handleChange} onBlur={handleBlur}/>
                        <div className="invalid-feedback">{errors.speciality}</div>
                      </div> :
                      <div class="col-md-8">
                        {values.speciality}
                      </div>
                    }
                </div>
                <div className={!isEditing ? 'form-group row bordered' : 'form-group row'}>
                    <label for="userid" class="col-md-4">Experience in years</label>
                    {
                      isEditing ?
                      <div class="col-md-8">
                        <input type="text" className={errors.experienceinyears && touched.experienceinyears ? "form-control is-invalid" : "form-control"} name="experienceinyears" value={values.experienceinyears} onChange={handleChange} onBlur={handleBlur}/>
                        <div className="invalid-feedback">{errors.experienceinyears}</div>
                      </div> :
                      <div class="col-md-8">
                        {values.experienceinyears}
                      </div>
                    }
                </div>
                <div className={!isEditing ? 'form-group row bordered' : 'form-group row'}>
                    <label for="userid" class="col-md-4">Previous Work Experience</label>
                    {
                      isEditing ?
                      <div class="col-md-8">
                        <input type="text" className={errors.previousexperience && touched.previousexperience ? "form-control is-invalid" : "form-control"} name="previousexperience" value={values.previousexperience} onChange={handleChange} onBlur={handleBlur}/>
                        <div className="invalid-feedback">{errors.previousexperience}</div>
                      </div> :
                      <div class="col-md-8">
                        {values.previousexperience}
                      </div>
                    }
                </div>
                <div class="form-group text-center align-items-center">
                    { !isEditing && <button class="btn btn-primary" onClick={editProfile}>Edit Profile</button> }
                    { isEditing && <Fragment>
                      <button type="submit" class="btn btn-primary mr-1" disabled={isSubmitting}>Save</button>
                      <img style={isSubmitting ? {display: 'inline-block', height: '15px'} : {display: 'none', height: '15px'}} src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                      <button class="btn btn-primary" onClick={cancelEditing}>Cancel</button></Fragment>
                    }
                </div>

            </form>
          )}
          </Formik>
      </div>
    </div>
    </>
  );
}

export default PatientProfile;