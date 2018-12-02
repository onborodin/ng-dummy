<template src="./login.html"></template>
<style src="./login.css"></style>

<script lang="ts">

import { Vue, Component, Prop, Watch } from "vue-property-decorator"
import { State, Action, Getter } from 'vuex-class'

@Component
export default class Login extends Vue {

    loginName : string = ''
    password : string = ''
    message : string = ''
    debug : any = ''
    attemptsCount : number = 0

    @Getter isAuth: boolean
    @Action setLogin: () => void

    submitLogin() {
        this.$client('/api/login', 'login', { 
                loginName: this.loginName,
                password: this.password
        })
        .then((res : any) => {
            if (typeof res.data.result[0] !== 'undefined' ) {
                if (res.data.result[0].id > 0) {
                    this.message = 'Login OK'
                    this.setLogin()
                    this.$router.push('/domains')
                } else {
                    this.message = 'Login incorrect'
                }
            } else {
                this.attemptsCount += 1
                this.message = 'Login incorrect, attempt ' + this.attemptsCount
            }
        })
        .catch((err : any) => {
            this.message = 'Communication problem'
        })
    }
}
</script>
