<template>
    <div>
        <Header />
        <Banner />
        <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
        <router-view></router-view>
        <Footer />
    </div>
</template>

<style>
    
</style>

<script>
import { mapState, mapActions } from 'vuex'
import Header from '../components/header'
import Footer from '../components/footer'
import Banner from '../components/banner'

export default {
    name: 'app',
    computed: {
        ...mapState({
            alert: state => state.alert
        })
    },
    methods: {
        ...mapActions({
            clearAlert: 'alert/clear' 
        })
    },
    watch: {
        $route (to, from){
            // clear alert on location change
            this.clearAlert();
        }
    },
    components: {
        Header,
        Banner,
        Footer
    }
};
</script>