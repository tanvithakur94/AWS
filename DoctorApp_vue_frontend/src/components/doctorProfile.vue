<template>
    <div class="wrapper">
        <div class="container">
            <h2 class="title">Doctor Profile</h2>
            <form @submit.prevent class="form">
                <h3 class="form-title text-center mb-3">Profile</h3>
                <div class="form-group row" :class="!isEditing ? 'bordered' : ''">
                    <label for="userid" class="col-md-4">User ID</label>
                    <div class="col-md-8" v-if="!isEditing">
                        {{user._id}}
                    </div>
                    <div class="col-md-8" v-if="isEditing">
                        <input type="text" v-model="user._id" v-validate="'required'" name="userID" class="form-control" :class="{ 'is-invalid': submitted && errors.has('userID') }" disabled/>
                        <div v-if="submitted && errors.has('userID')" class="invalid-feedback">{{ errors.first('userID') }}</div>
                    </div>
                </div>
                <div class="form-group row" :class="!isEditing ? 'bordered' : ''">
                    <label for="name" class="col-md-4">Doctor Name</label>
                    <div class="col-md-8" v-if="!isEditing">
                        {{user.name}}
                    </div>
                    <div class="col-md-8" v-if="isEditing">
                        <input type="text" v-model="user.name" v-validate="'required'" name="patientName" class="form-control" :class="{ 'is-invalid': submitted && errors.has('patientName') }" />
                        <div v-if="submitted && errors.has('patientName')" class="invalid-feedback">{{ errors.first('patientName') }}</div>
                    </div>
                </div>
                <div class="form-group row" :class="!isEditing ? 'bordered' : ''">
                    <label for="phone" class="col-md-4">Qualitification</label>
                    <div class="col-md-8" v-if="!isEditing">
                        {{user.qualification}}
                    </div>
                    <div class="col-md-8" v-if="isEditing">
                        <select v-model="user.qualification" name="qualitification" class="form-control" v-validate="{ required: true, excluded: 'Qualitification'}" :class="{ 'is-invalid': submitted && errors.has('qualitification') }">
                            <option v-for="item in qualification_list" v-bind:key="item" v-bind:value="item" >{{ item }}</option>
                        </select>
                        <div v-if="submitted" class="invalid-feedback">Please select qualitification</div>
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
                        <input type="password" v-model="user.password" placeholder="Password" v-validate="{ required: true, min: 6 }" name="password" class="form-control" :class="{ 'is-invalid': submitted && (errors.has('password') || !containsUppercase(user.password) || !containsLowercase(user.password) || !containsNumber(user.password) || !containsSpecial(user.password) )}" />
                        <div v-if="submitted && errors.has('password')" class="invalid-feedback">{{ errors.first('password') }}</div>
                        <div v-if="submitted && !errors.has('password') && !containsUppercase(user.password)" class="invalid-feedback">The password should contain Uppercase</div>
                        <div v-if="submitted && !errors.has('password') && !containsLowercase(user.password)" class="invalid-feedback">The password should contain Lowercase</div>
                        <div v-if="submitted && !errors.has('password') && !containsNumber(user.password)" class="invalid-feedback">The password should contain Number</div>
                        <div v-if="submitted && !errors.has('password') && !containsSpecial(user.password)" class="invalid-feedback">The password should contain Special character</div>
                    </div>
                </div>
                <div class="form-group row" :class="!isEditing ? 'bordered' : ''">
                    <label for="userid" class="col-md-4">Age</label>
                    <div class="col-md-8" v-if="!isEditing">
                        {{user.issue}}
                    </div>
                    <div class="col-md-8" v-if="isEditing">
                        <input type="text" v-model="user.age" placeholder="Age" v-validate="'required'" name="age" class="form-control" :class="{ 'is-invalid': submitted && errors.has('age') }" />
                        <div v-if="submitted && errors.has('age')" class="invalid-feedback">{{ errors.first('age') }}</div>
                    </div>
                </div>
                <div class="form-group row" :class="!isEditing ? 'bordered' : ''">
                    <label for="userid" class="col-md-4">Speciality</label>
                    <div class="col-md-8" v-if="!isEditing">
                        {{user.speciality}}
                    </div>
                    <div class="col-md-8" v-if="isEditing">
                        <input type="text" v-model="user.speciality" v-validate="'required'" name="speciality" class="form-control" :class="{ 'is-invalid': submitted && errors.has('speciality') }" />
                        <div v-if="submitted && errors.has('speciality')" class="invalid-feedback">{{ errors.first('speciality') }}</div>
                    </div>
                </div>
                <div class="form-group row" :class="!isEditing ? 'bordered' : ''">
                    <label for="experienceinyears" class="col-md-4">Experience in years</label>
                    <div class="col-md-8" v-if="!isEditing">
                        {{user.experienceinyears}}
                    </div>
                    <div class="col-md-8" v-if="isEditing">
                        <input type="text" v-model="user.experienceinyears" v-validate="{ required: true, decimal:0 }" name="experienceinyears" class="form-control" :class="{ 'is-invalid': submitted && errors.has('speciality') }" />
                        <div v-if="submitted && errors.has('experienceinyears')" class="invalid-feedback">Please select experience in years</div>
                    </div>
                </div>
                <div class="form-group row" :class="!isEditing ? 'bordered' : ''">
                    <label for="userid" class="col-md-4">Previous Work Experience</label>
                    <div class="col-md-8" v-if="!isEditing">
                        {{user.previousexperience}}
                    </div>
                    <div class="col-md-8" v-if="isEditing">
                        <input type="text" v-model="user.previousexperience" placeholder="Previous Work Experience" v-validate="'required'" name="previousexperience" class="form-control" :class="{ 'is-invalid': submitted && errors.has('previousexperience') }" />
                        <div v-if="submitted && errors.has('previousexperience')" class="invalid-feedback">{{ errors.first('previousexperience') }}</div>
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
                userid: '',
                name: '',
                qualification: '',
                email: '',
                password: '',
                age: 1,
                speciality: '',
                experienceinyears: 0,
                previousexperience: ''
            },
            qualification_list: ['Bhams', 'Bams', 'Mbbs'],
            submitted: false,
            isEditing: false
        }
    },
    computed: {
    },
    created () {
        this.user = JSON.parse(localStorage.getItem("user"));
        this.user.passwordtoken = this.user.password;
        this.user.password = null;
    },
    methods: {
        editProfile: function() {
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
        ...mapActions('account', ['updatedoctorprofile', 'status']),
        updateProfile() {
            this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid) {
                    if(this.updatedoctorprofile(this.user)){
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