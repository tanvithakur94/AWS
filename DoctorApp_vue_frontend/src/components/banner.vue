<template>
    <div class="banner">
        <a class="logo" href="/">
            <img src="../assets/images/logoCircle.png" class="logo-img"/>
            DOCTOR
        </a>
        <ul>
            <li @click="gotoHomePage()"><a>Home</a></li>
            <li v-if="OTPverified" @click="gotoProfile()"><a>Profile</a></li>
            <li v-if="OTPverified && account.userType" @click="gotoOrder()"><a>Appointment</a></li>
            <li v-if="OTPverified && !account.userType" @click="gotoAppointment()"><a>Book an appointment</a></li>
            <li v-if="!OTPverified" @click="gotoRegistration()"><a>Doctor Registration</a></li>
            <li v-if="!OTPverified" @click="gotoPatientRegistration()"><a>Patient Registration</a></li>
        </ul>
    </div>
</template>
<style>
    .banner{
        padding: 20px 220px 20px 220px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    }
    .banner ul{
        float: right;
        list-style-type: none;
        display: flex;
    }
    .banner ul li{
        color: rgb(80, 186, 137);
        padding: 6px 12px 6px 12px;
    }
    .logo{
        display: inline-block;
        color: rgb(80, 186, 137);
        font-size: 36px;
    }
    .logo:hover{
        text-decoration: none;
    }
    .logo-img{
        width: 42px;
        height: 42px;
    }
</style>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'banner',
    methods: {
        gotoHomePage () {
            this.$router.push('/');
        },
        gotoProfile(){
            this.$router.push('/profile');
        },
        gotoOrder(){
            this.$router.push('/order');
        },
        gotoAppointment(){
            this.$router.push('/appointment');
        },
        gotoRegistration(){
            this.$router.push('/doctor_register');
        },
        gotoPatientRegistration(){
            this.$router.push('/patient_register');
        },
    },
    computed: {
        ...mapState({
            account: state => state.account,
            OTPverified: state => state.account.OTPverified,
            users: state => state.users.all
        })
    },
};
</script>