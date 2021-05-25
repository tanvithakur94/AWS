<template>
    <div>
        <doctor-profile v-if="userType==1"/>
        <patient-profile v-if="userType==0"/>
    </div>
</template>

<script>
import doctorProfile from '../components/doctorProfile.vue';
import patientProfile from '../components/patientProfile.vue';

export default {
  components: { patientProfile, doctorProfile },
    data () {
        return {
            userType: 0
        }
    },
    computed: {
    },
    created () {
        this.userType = localStorage.getItem('userType');
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