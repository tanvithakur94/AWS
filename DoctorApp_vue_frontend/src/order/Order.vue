<template>
    <div class="wrapper">
        <div class="container">
            <h2 class="title">Appointment</h2>
            <div class="custom-card">
                <table class="table">
                    <thead>
                    <tr>
                        <th>Patient Name</th>
                        <th>Booked Time</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item of appointment_list" :key="appointment_list.indexOf(item)">
                            <td>{{item.patientName}}</td>
                            <td>{{item.bookTime}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
    data () {
        return {
            appointment_list:[]
        }
    },
    computed: {
    },
    created () {
        const user = JSON.parse(localStorage.getItem('user'));
        axios.get(`http://34.204.14.58:3000/get-appointments`,{ params:{
            doctorId: user._id
        }}).then((res) => {
            const {appointments} = res.data;
            this.appointment_list = appointments;
            for( let i = 0; i < this.appointment_list.length; i ++){
                this.appointment_list[i].bookTime = moment(this.appointment_list[i].bookTime).format("yyyy-MM-DD HH:mm:ss");
            }
        }).catch(error => {
        });
    },
    methods: {
        
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