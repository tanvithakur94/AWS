<template>
    <div>
        <h2 class="title-style">OTP</h2>
        <div class="login-part">
            <h2 style="margin-bottom: 10px" class="text-center">Verify OTP</h2>
            <form @submit.prevent="handleSubmit">
                <div class="form-group">
                    <label for="username">Code</label>
                    <input type="text" v-model="code" name="code" placeholder="Enter Code" class="form-control" :class="{ 'is-invalid': submitted && !code }" />
                    <div v-show="submitted && !code" class="invalid-feedback">Code is required</div>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary">Verify</button>
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
            code: '',
            submitted: false
        }
    },
    computed: {
        ...mapState('account', ['status'])
    },
    created () {
    },
    methods: {
        ...mapActions('account', ['verifyOTP']),
        handleSubmit (e) {
            this.submitted = true;
            const { code } = this;
            if (code) {
                this.verifyOTP(code)
            }
        }
    }
};
</script>

<style lang="css" scoped>
.login-part {
    margin-top: 30px !important;
    margin-bottom: 100px !important;
    padding: 20px 10px;
    max-width: 500px;
    margin: auto;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}
.title-style {
    color: #777777;
    margin-top: 30px !important;
    text-align: center;
}
</style>