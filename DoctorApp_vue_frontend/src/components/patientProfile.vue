<template>
    <div class="wrapper">
        <div class="container">
            <h2 class="title">Patient Profile</h2>
            <form @submit.prevent class="form">
                <h3 class="form-title text-center mb-3">Profile</h3>
                <div class="form-group row" :class="!isEditing ? 'bordered' : ''">
                    <label for="userid" class="col-md-4">User ID</label>
                    <div class="col-md-8" v-if="!isEditing">
                        {{user._id}}
                    </div>
                    <div class="col-md-8" v-if="isEditing">
                        <input type="text" v-model="user._id" v-validate="'required'" name="userID" class="form-control" :class="{ 'is-invalid': submitted && errors.has('userID') }" disabled/>
                    </div>
                </div>
                <div class="form-group row" :class="!isEditing ? 'bordered' : ''">
                    <label for="name" class="col-md-4">Patient Name</label>
                    <div class="col-md-8" v-if="!isEditing">
                        {{user.name}}
                    </div>
                    <div class="col-md-8" v-if="isEditing">
                        <input type="text" v-model="user.name" v-validate="'required'" name="patientName" class="form-control" :class="{ 'is-invalid': submitted && errors.has('patientName') }" />
                        <div v-if="submitted && errors.has('patientName')" class="invalid-feedback">{{ errors.first('patientName') }}</div>
                    </div>
                </div>
                <div class="form-group row" :class="!isEditing ? 'bordered' : ''">
                    <label for="phone" class="col-md-4">Phone Number</label>
                    <div class="col-md-8" v-if="!isEditing">
                        {{user.phone}}
                    </div>
                    <div class="col-md-8" v-if="isEditing">
                        <input type="text" v-model="user.phone" v-validate="'required'" name="phoneNumber" class="form-control" :class="{ 'is-invalid': submitted && errors.has('phoneNumber') || !validPhoneNumber(user.phone) }" />
                        <div v-if="submitted && errors.has('phoneNumber')" class="invalid-feedback">{{ errors.first('phoneNumber') }}</div>
                        <div v-if="submitted && !errors.has('phoneNumber') && !validPhoneNumber(user.phone)" class="invalid-feedback">Invalid phone number</div>
                    </div>
                </div>
                <div class="form-group row" :class="!isEditing ? 'bordered' : ''">
                    <label for="email" class="col-md-4">Email</label>
                    <div class="col-md-8" v-if="!isEditing">
                        {{user.email}}
                    </div>
                    <div class="col-md-8" v-if="isEditing">
                        <input type="email" v-model="user.email" v-validate="'required'" name="email" class="form-control" :class="{ 'is-invalid': submitted && errors.has('email') }" disabled/>
                        <div v-if="submitted && errors.has('email')" class="invalid-feedback">{{ errors.first('email') }}</div>
                    </div>
                </div>
                <div class="form-group row" :class="!isEditing ? 'bordered' : ''">
                    <label for="password" class="col-md-4">Password</label>
                    <div class="col-md-8" v-if="!isEditing">
                        {{'*'.repeat(8)}}
                    </div>
                    <div class="col-md-8" v-if="isEditing">
                        <input type="password" v-model="user.password" placeholder="Password" v-validate="{ required: true, min: 6 }" name="password" class="form-control" :class="{ 'is-invalid': submitted && ( errors.has('password') || !containsUppercase(user.password) || !containsLowercase(user.password) || !containsNumber(user.password) || !containsSpecial(user.password)) }" />
                        <div v-if="submitted && errors.has('password')" class="invalid-feedback">{{ errors.first('password') }}</div>
                        <div v-if="submitted && !errors.has('password') && !containsUppercase(user.password)" class="invalid-feedback">The password should contain Uppercase</div>
                        <div v-if="submitted && !errors.has('password') && !containsLowercase(user.password)" class="invalid-feedback">The password should contain Lowercase</div>
                        <div v-if="submitted && !errors.has('password') && !containsNumber(user.password)" class="invalid-feedback">The password should contain Number</div>
                        <div v-if="submitted && !errors.has('password') && !containsSpecial(user.password)" class="invalid-feedback">The password should contain Special character</div>
                    </div>
                </div>
                <div class="form-group row" :class="!isEditing ? 'bordered' : ''">
                    <label htmlFor="gemder" class="col-md-4">Gender</label>
                    <div class="col-md-8" v-if="!isEditing">
                        {{user.gender}}
                    </div>
                    <div class="col-md-8" v-if="isEditing">
                        <div style="display:flex; flex-direction:row;">
                            <label v-for="({key, text}) in gender_options" :key="key" style="flex:1">
                                <input type="radio" v-model="user.gender"
                                    name="gender_options"
                                    :value="key" 
                                    :checked="user.gender == key">
                                {{ text }}
                            </label>
                        </div>
                    </div>
                </div>
                
                <div class="form-group row" :class="!isEditing ? 'bordered' : ''">
                    <label for="userid" class="col-md-4">Age</label>
                    <div class="col-md-8" v-if="!isEditing">
                        {{user.age}}
                    </div>
                    <div class="col-md-8" v-if="isEditing">
                        <input type="text" v-model="user.age" placeholder="Age" v-validate="'required'" name="age" class="form-control" :class="{ 'is-invalid': submitted && errors.has('age') }" />
                        <div v-if="submitted && errors.has('age')" class="invalid-feedback">{{ errors.first('age') }}</div>
                    </div>
                </div>

                <div class="form-group row" :class="!isEditing ? 'bordered' : ''">
                    <label for="address" class="col-md-4">Address</label>
                    
                    <div class="col-md-8" v-if="!isEditing">
                        {{user.address}}
                    </div>
                    <div class="col-md-8" v-if="isEditing">
                        <textarea type="text" v-model="user.address" placeholder="Address" v-validate="'required'" name="address" class="form-control" :class="{ 'is-invalid': submitted && errors.has('address') }" />
                        <div v-if="submitted && errors.has('address')" class="invalid-feedback">{{ errors.first('address') }}</div>
                    </div>
                </div>
                <div class="form-group row" :class="!isEditing ? 'bordered' : ''">
                    <label for="userid" class="col-md-4">Pin Code</label>
                    
                    <div class="col-md-8" v-if="!isEditing">
                        {{user.pincode}}
                    </div>
                    <div class="col-md-8" v-if="isEditing">
                        <input type="text" v-model="user.pincode" placeholder="Pin Code" v-validate="'required'" name="pincode" class="form-control" :class="{ 'is-invalid': submitted && errors.has('pinCode') }" />
                        <div v-if="submitted && errors.has('pincode')" class="invalid-feedback">{{ errors.first('pincode') }}</div>
                    </div>
                </div>
                <div class="form-group row" :class="!isEditing ? 'bordered' : ''">
                    <label for="userid" class="col-md-4">Health Issue</label>
                    
                    <div class="col-md-8" v-if="!isEditing">
                        {{user.issue}}
                    </div>
                    <div class="col-md-8" v-if="isEditing">
                        <input type="text" v-model="user.issue" placeholder="Health Issue" v-validate="'required'" name="healthIssue" class="form-control" :class="{ 'is-invalid': submitted && errors.has('healthIssue') }" />
                        <div v-if="submitted && errors.has('healthIssue')" class="invalid-feedback">{{ errors.first('healthIssue') }}</div>
                    </div>
                </div>
                <div class="form-group" style="text-align:center">
                    <button class="btn btn-primary" v-if="!isEditing" @click="editProfile()">Edit Profile</button>
                    <button class="btn btn-primary" v-if="isEditing" @click="updateProfile()" :disabled="status.registering">Save</button>
                    <img v-show="status.registering" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    <button class="btn btn-primary" v-if="isEditing" @click="cancelEditing()">Cancel</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            user: {
                userid: 'userid',
                name: 'name',
                phone: '1231231234',
                email: 'test@email.com',
                password: '1231231234',
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
            isEditing: false
        }
    },
    computed: {
    },
    created () {
        // if(this.$route.query.success){
        //     this.$toastr.s("Success", "Profile Updated Successfully");
        // }
        this.user = JSON.parse(localStorage.getItem("user"));
        this.user.passwordtoken = this.user.password;
        this.user.password = '';
    },
    methods: {
        editProfile: function() {
            console.log('editPoile');
            this.isEditing = true;
        },
        cancelEditing: function () {
            this.isEditing = false;
        },
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
        ...mapActions('account', ['updatepatientprofile', 'status']),
        updateProfile() {
            this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid) {
                    if(this.updatepatientprofile(this.user)){
                        this.isEditing = false;
                        this.$toastr.s("Success", "Profile Updated Successfully");
                    }
                }
            });
        }
    }
};
</script>

<style lang="css" scoped>
    .container{
        padding:30px;
    }
    .bordered{
        border-bottom: 1px solid lightgrey;
    }
</style>