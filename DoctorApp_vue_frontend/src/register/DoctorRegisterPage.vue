<template>
    <div class="wrapper">
        <div class="container">
            <h2 class="title">Doctor Registration</h2>
            <h4 class="breadcrumbs"> Home / Registration</h4>
            <form @submit.prevent="handleSubmit" class="form">
                <h3 class="form-title text-center">Registration</h3>
                <div class="form-group">
                    <label for="name">Doctor Name</label>
                    <input type="text" v-model="user.name" v-validate="'required'" name="name" class="form-control" :class="{ 'is-invalid': submitted && errors.has('name') }" />
                    <div v-if="submitted" class="invalid-feedback">{{ errors.first('name') }}</div>
                </div>
                <div class="form-group">
                    <label for="userid">Qualitification</label>
                    <select v-model="user.qualification" name="qualitification" class="form-control" v-validate="{ required: true, excluded: 'Qualitification'}" :class="{ 'is-invalid': submitted && errors.has('qualitification') }">
                        <option v-for="item in qualification_list" v-bind:key="item" v-bind:value="item" >{{ item }}</option>
                    </select>
                    <div v-if="submitted" class="invalid-feedback">Please select qualitification</div>
                </div>
                <div class="form-group">
                    <label for="userid">Email</label>
                    <input type="text" v-model="user.email" placeholder="Email" v-validate="'required'" name="email" class="form-control" :class="{ 'is-invalid': submitted && (errors.has('email') || !validEmail(user.email)) }" />
                    <div v-if="submitted && errors.has('email')" class="invalid-feedback">{{ errors.first('email') }}</div>
                    <div v-if="submitted && !errors.has('email') && !validEmail(user.email)" class="invalid-feedback">Email is not valid</div>
                </div>
                <div class="form-group">
                    <label for="userid">Password</label>
                    <input type="password" v-model="user.password" placeholder="Password" v-validate="{ required: true}" name="password" class="form-control" :class="{ 'is-invalid': submitted && errors.has('password') || !containsUppercase(user.password) || !containsLowercase(user.password) || !containsNumber(user.password) || !containsSpecial(user.password) }" />
                    <div v-if="submitted && errors.has('password')" class="invalid-feedback">{{ errors.first('password') }}</div>
                    <div v-if="submitted && !errors.has('password') && !containsUppercase(user.password)" class="invalid-feedback">The password should contain Uppercase</div>
                    <div v-if="submitted && !errors.has('password') && !containsLowercase(user.password)" class="invalid-feedback">The password should contain Lowercase</div>
                    <div v-if="submitted && !errors.has('password') && !containsNumber(user.password)" class="invalid-feedback">The password should contain Number</div>
                    <!-- <div v-if="submitted && !errors.has('password') && !containsSpecial(user.password)" class="invalid-feedback">The password should contain Special character</div> -->
                </div>
                <div class="form-group">
                    <label for="userid">Age</label>
                    <input type="text" v-model="user.age" placeholder="Age" v-validate="'required'" name="age" class="form-control" :class="{ 'is-invalid': submitted && errors.has('age') }" />
                    <div v-if="submitted && errors.has('age')" class="invalid-feedback">{{ errors.first('age') }}</div>
                </div>
                <div class="form-group">
                    <label for="userid">Speciality</label>
                    <input type="text" v-model="user.speciality" v-validate="'required'" name="speciality" class="form-control" :class="{ 'is-invalid': submitted && errors.has('speciality') }" />
                    <div v-if="submitted && errors.has('speciality')" class="invalid-feedback">{{ errors.first('speciality') }}</div>
                </div>
                <div class="form-group">
                    <label for="experienceinyears">Experience in years</label>
                    <input type="text" v-model="user.experienceinyears" v-validate="{ required: true, decimal:0 }" name="experienceinyears" class="form-control" :class="{ 'is-invalid': submitted && errors.has('speciality') }" />
                    <div v-if="submitted && errors.has('experienceinyears')" class="invalid-feedback">Please select experience in years</div>
                </div>
                <div class="form-group">
                    <label for="userid">Previous Work Experience</label>
                    <input type="text" v-model="user.previousexperience" placeholder="Previous Work Experience" v-validate="'required'" name="previousexperience" class="form-control" :class="{ 'is-invalid': submitted && errors.has('previousexperience') }" />
                    <div v-if="submitted && errors.has('previousexperience')" class="invalid-feedback">{{ errors.first('previousexperience') }}</div>
                </div>
                <div class="form-group">
                    <label>
                        <input type="checkbox" v-model="termsOfUse" />
                        I agree to the terms of use
                    </label>
                </div>
                <div class="form-group" style="text-align:center">
                    <button class="btn btn-primary" :disabled="status.registering">Sign Up</button>
                    <img v-show="status.registering" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                </div>
                <div style="text-align:center">
                    Have an account with us? <router-link to="/doctor_login" style="color: #ff1b00!important;">login here</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<style>
    .wrapper{
        background-color: #f0f0f0;
        padding-top:50px;
        padding-bottom: 50px;
    }
    .title{
        font-size: 32px;
        color: #777777;
        text-align: center;
    }
    .breadcrumbs{
        font-size: 14px;
        color: #777777;
        text-align: center;
    }
    .form{
        background-color: white;
        padding: 20px 30px 20px 30px;
        max-width: 700px;
        margin: auto;
    }
    .form .form-group{
        text-align: left;
    }
</style>
<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            user: {
                userid: 'userid',
                name: 'name',
                qualification: 'Bhams',
                email: 'dummy@email.com',
                password: 'Bgt54321!123',
                age: 1, 
                speciality: 'speciality',
                experienceinyears: 0,
                previousexperience: 'previous work'
            },
            qualification_list: ['Bhams', 'Bams', 'Mbbs'],
            submitted: false,
            termsOfUse: false
        }
    },
    computed: {
        ...mapState('account', ['status'])
    },
    methods: {
        containsUppercase: function(value) {
          return /[A-Z]/.test(value)
        },
        containsLowercase: function(value) {
           return /[a-z]/.test(value)
        },
        containsNumber: function(value) {
            return /[0-9]/.test(value)
        },
        containsSpecial: function(value) {
            return /[#?!@$%^&*-]/.test(value)
        },
        validPassword: function(value) {
            return this.containsUppercase(value) && this.containsLowercase(value) && this.containsNumber(value)
        },
        validEmail: function(value) {
            return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(value);
        },
        ...mapActions('account', ['doctorregister']),
        handleSubmit(e) {
            this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid && this.validPassword(this.user.password) && this.validEmail(this.user.email)) {
                    this.doctorregister(this.user);
                }
            });
        }
    }
};
</script>