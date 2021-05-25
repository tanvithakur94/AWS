<template>
    <div class="header">
        <p class="contact">
            +91 345 698 7890
        </p>
        <div class="login-buttons">
            <button v-if="OTPverified" @click="gotoLogin()" class="btn btn-primary">Logout</button>
            <button v-if="!(OTPverified)" @click="gotoDoctorLogin()" class="btn btn-primary">Doctor login</button>
            <button v-if="!(OTPverified)" class="btn btn-primary  patient-button" @click="gotoPatientLogin()"> Patient login</button>
        </div>
    </div>
</template>

<style>
    .header{
        background-color: rgb(80, 186, 137);
        height: 70px;
        padding: 20px 220px 20px 220px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .contact{
        display: inline-block;
        color: white;
    }
    .login-buttons .patient-button{
        margin-left: 20px;
    }
</style>

<script>
import { mapState, mapActions } from 'vuex'
import { store } from '../_store/index'

export default {
    name: 'header',
    methods: {
        ...mapActions('account', ['patientlogin', 'logout']),
        gotoDoctorLogin() {
            this.$router.push('/doctor_login');
        },
        gotoPatientLogin(){
            this.$router.push('/patient_login');
        },
        gotoLogin(){
            const userType = localStorage.getItem('userType');
            this.logout();
            if(userType == 1)
                this.gotoDoctorLogin();
            else
                this.gotoPatientLogin();
        }
    },
    // data() {
    //     return {
    //         OTPverified: false
    //     };
    // },
    computed: {
        ...mapState({
            OTPverified: state => state.account.OTPverified,
            users: state => state.users.all
        }),
    },
};
</script>