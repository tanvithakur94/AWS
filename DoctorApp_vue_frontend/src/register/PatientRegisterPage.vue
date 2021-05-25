<template>
    <div class="wrapper">
        <div class="container">
            <h2 class="title">Patient Registration</h2>
            <h4 class="breadcrumbs"> Home / Registration</h4>
            <form @submit.prevent="handleSubmit" class="form">
                <h3 class="form-title text-center">Registration</h3>
                <div class="form-group">
                    <label for="name">Patient Name</label>
                    <input type="text" v-model="user.name" v-validate="'required'" name="patientName" class="form-control" :class="{ 'is-invalid': submitted && errors.has('patientName') }" />
                    <div v-if="submitted && errors.has('patientName')" class="invalid-feedback">{{ errors.first('patientName') }}</div>
                </div>
                <div class="form-group">
                    <label for="phone">Phone Number</label>
                    <input type="text" v-model="user.phone" v-validate="'required'" name="phoneNumber" class="form-control" :class="{ 'is-invalid': submitted && errors.has('phoneNumber') || !validPhoneNumber(user.phone) }" />
                    <div v-if="submitted && errors.has('phoneNumber')" class="invalid-feedback">{{ errors.first('phoneNumber') }}</div>
                    <div v-if="submitted && !errors.has('phoneNumber') && !validPhoneNumber(user.phone)" class="invalid-feedback">Invalid phone number</div>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="text" v-model="user.email" placeholder="Email" v-validate="'required'" name="email" class="form-control" :class="{ 'is-invalid': submitted && (errors.has('email') || !validEmail(user.email)) }" />
                    <div v-if="submitted && errors.has('email')" class="invalid-feedback">{{ errors.first('email') }}</div>
                    <div v-if="submitted && !errors.has('email') && !validEmail(user.email)" class="invalid-feedback">Email is not valid</div>
                </div>
                <div class="form-group">
                    <label for="userid">Password</label>
                    <input type="password" v-model="user.password" placeholder="Password" v-validate="{ required: true, min: 6 }" name="password" class="form-control" :class="{ 'is-invalid': submitted && errors.has('password') || !containsUppercase(user.password) || !containsLowercase(user.password) || !containsNumber(user.password) || !containsSpecial(user.password) }" />
                    <div v-if="submitted && errors.has('password')" class="invalid-feedback">{{ errors.first('password') }}</div>
                    <div v-if="submitted && !errors.has('password') && !containsUppercase(user.password)" class="invalid-feedback">The password should contain Uppercase</div>
                    <div v-if="submitted && !errors.has('password') && !containsLowercase(user.password)" class="invalid-feedback">The password should contain Lowercase</div>
                    <div v-if="submitted && !errors.has('password') && !containsNumber(user.password)" class="invalid-feedback">The password should contain Number</div>
                    <!-- <div v-if="submitted && !errors.has('password') && !containsSpecial(user.password)" class="invalid-feedback">The password should contain Special character</div> -->
                </div>
                <div class="form-group" style="display: flex">
                    <label htmlFor="gemder" style="width:50%">Your gender</label>
                    <div style="width:50%;display:flex; flex-direction:row;">
                        <label v-for="({key, text}) in gender_options" :key="key" style="flex:1">
                            <input type="radio" v-model="user.gender"
                                name="gender_options"
                                :value="key" 
                                :checked="user.gender == key">
                            {{ text }}
                        </label>
                    </div>
                </div>

                <div class="form-group">
                    <label for="userid">Age</label>
                    <input type="text" v-model="user.age" placeholder="Age" v-validate="'required'" name="age" class="form-control" :class="{ 'is-invalid': submitted && errors.has('age') }" />
                    <div v-if="submitted && errors.has('age')" class="invalid-feedback">{{ errors.first('age') }}</div>
                </div>
                
                <div class="form-group">
                    <label for="address">Address</label>
                    <textarea type="text" v-model="user.address" placeholder="Address" v-validate="'required'" name="address" class="form-control" :class="{ 'is-invalid': submitted && errors.has('address') }" />
                    <div v-if="submitted && errors.has('address')" class="invalid-feedback">{{ errors.first('address') }}</div>  
                </div>
                <div class="form-group">
                    <label for="pincode">Pin Code</label>
                    <input type="text" v-model="user.pincode" placeholder="Pin Code" v-validate="'required'" name="pincode" class="form-control" :class="{ 'is-invalid': submitted && errors.has('pinCode') }" />
                    <div v-if="submitted && errors.has('pincode')" class="invalid-feedback">{{ errors.first('pincode') }}</div>
                </div>
                <div class="form-group" style="display: flex">
                    <label htmlFor="firstVisit" style="width:50%">First time visit</label>
                    <div style="width:50%;display:flex; flex-direction:row;">
                        <label v-for="({key, text}) in firstVisit_options" :key="key" style="flex:1">
                            <input type="radio" v-model="user.firsttimevisit"
                                name="firstVisit_options"
                                :value="key" 
                                :checked="user.firsttimevisit == key">
                            {{ text }}
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <label for="healthIssue">Health Issue</label>
                    <input type="text" v-model="user.issue" placeholder="Health Issue" v-validate="'required'" name="healthIssue" class="form-control" :class="{ 'is-invalid': submitted && errors.has('healthIssue') }" />
                    <div v-if="submitted && errors.has('healthIssue')" class="invalid-feedback">{{ errors.first('healthIssue') }}</div>
                </div>
                <div class="form-group">
                    <label>
                        <input type="checkbox" v-model="termsOfUse" />
                        I agree to the terms of use
                    </label>
                </div>
                <div class="form-group" style="text-align:center">
                    <button class="btn btn-primary" :disabled="status.registering">Register</button>
                    <img v-show="status.registering" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                </div>
                <div style="text-align:center">
                    Have an account with us? <router-link to="/patient_login" style="color: #ff1b00!important;">login here</router-link>
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
</style>
<script>
import { mapState, mapActions } from 'vuex'
import Datepicker from 'vuejs-datepicker';
export default {
    components: {
        Datepicker
    },
    data () {
        return {
            user: {
                name: 'name',
                phone: '123-123-1234',
                email: 'dummy@email.com',
                password: 'Bgt54321!123',
                gender: 'male',
                age: 1,
                address: 'address',
                pincode: '1231234',
                firsttimevisit: 'yes',
                issue: 'issue'
            },
            qualification_list: ['Bhams', 'Bams', 'Mbbs'],
            experience_list:[
                {key: 20, text: '20+'},
                {key: 30, text: '20+'},
                {key: 40, text: '20+'}
            ],
            gender_options:[
                {key: 'male', text: 'Male'},
                {key: 'female', text: 'Female'},
            ],
            firstVisit_options:[
                {key: true, text: 'Yes'},
                {key: false, text: 'No'},
            ],
            submitted: false,
            termsOfUse: false,
        }
    },
    computed: {
        ...mapState('account', ['status'])
    },
    created(){
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
        validPhoneNumber: function(value) {
            return /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(value);
        },
        validMonth: function(value) {
            return /^([1-9]|1[012])$/.test(value);
        },
        validDay: function(value) {
            return /\b(0?[1-9]|[1-9][0-9]|100)\b/.test(value);
        },
        validYear: function(value) {
            return /^\d{4}$/.test(value);
        },
        validPassword: function(value) {
            return this.containsUppercase(value) && this.containsLowercase(value) && this.containsNumber(value)
        },
        ...mapActions('account', ['patientregister']),
        handleSubmit(e) {
            if(this.termsOfUse){
                this.submitted = true;
                this.$validator.validate().then(valid => {
                    if (valid && this.validPassword(this.user.password)) {
                        this.patientregister(this.user);
                    }
                });
            }
        }
    }
};
</script>