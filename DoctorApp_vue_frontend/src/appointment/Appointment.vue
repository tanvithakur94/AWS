<template>
    <div class="wrapper">
        <div class="container">
            <h2 class="title">Appointment</h2>
            <div class="custom-card">
                <form @submit.prevent="bookAppointment" class="form">
                    <div class="form-group" v-if="submitted && message">
                        <div class="alert alert-success">
                            {{message}}
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-md-4">Booking Date and time</label>
                        <div class="col-md-8">
                            <v-date-picker
                                v-model="dateTime"
                                mode="dateTime"
                                popover-visibility='visible'
                                timezone="US/Eastern"
                                :input-props='inputProps'>
                            </v-date-picker>
                            <!-- <input type="text" v-model="dateTime" v-validate="'required'" name="dateTime" class="form-control" :class="{ 'is-invalid': submitted && errors.has('dateTime') }" style="display:none"/> -->
                            <input type="text" v-model="dateTime" v-validate="'required'" name="dateTime" class="form-control" :class="{ 'is-invalid': submitted && errors.has('dateTime') }"/>
                            <div v-if="submitted" class="invalid-feedback">Please select Date and Time</div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-md-4">Doctor</label>
                        <div class="col-md-8">
                            <select v-model="doctorId" name="doctorList" class="form-control" v-validate="{ required: true, excluded: '0'}" :class="{ 'is-invalid': submitted && errors.has('doctorList') }">
                                <option v-for="item in doctorList" v-bind:key="item._id" v-bind:value="item._id" >{{ item.name }}</option>
                            </select>
                            <div v-if="submitted" class="invalid-feedback">Please select doctor</div>
                        </div>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-success">Book</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import doctorProfile from '../components/doctorProfile.vue';
import patientProfile from '../components/patientProfile.vue';

export default {
  components: { patientProfile, doctorProfile },
    data () {
        return {
            userType: 0,
            date: new Date(),
            inputProps: {
                class: 'input',
            },
            dateTime: '',
            doctorId: 0,
            doctorList: [{_id:0, name: 'Select Doctor'}],
            submitted: false,
            message: ''
        }
    },
    computed: {
    },
    created () {
        this.userType = localStorage.getItem('userType');
        console.log('here');
        axios.get(`http://34.204.14.58:3000/doctor-list`).then((res) => {
            const {doctor_list} = res.data;
            this.doctorList = [...this.doctorList, ...doctor_list];
        }).catch(error => {
        });
    },
    methods: {
        bookAppointment() {
            this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid) {
                    const user = JSON.parse(localStorage.getItem("user"));
                    const data = {
                        doctorId: this.doctorId,
                        patientId: user._id,
                        patientName: user.name,
                        bookTime: new Date(this.dateTime).toISOString()
                    }
                    axios.post(`http://34.204.14.58:3000/book-appointment`, data).then((res) => {
                        this.message = 'booked successfully.';
                    }).catch(error => {
                    });
                }
            });
        }
    }
};
</script>

<style>
    .wrapper{
        background-color: #f0f0f0;
        padding-top:50px;
        padding-bottom: 50px;
    }
    .title{
        font-size: 32px;
        color: #444444;
    }
    .custom-card{
        background: white;
        padding: 20px;
    }
</style>