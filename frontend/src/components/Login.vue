<template src="./Login.html"></template>

<script lang="ts">

import { Vue, Component, Prop, Watch } from "vue-property-decorator"
import { State, Action, Getter, Mutation } from 'vuex-class'


@Component
export default class Login extends Vue {

    loginName : string = ''
    password : string = ''
    message : string = ''
    debug : any = ''

    @Getter isAuth: boolean
    @Action setLogin: () => void

    submitLogin() {
        this.$client('/api/users', 'login', { 
                loginName: this.loginName,
                password: this.password
        })
        .then((res : any) => {
            if (typeof res.data.result[0] !== 'undefined' ) {
                if (res.data.result[0].id > 0) {
                    this.message = 'Login OK'
                    this.setLogin()
                    this.$router.push('/users')
                } else {
                    this.message = 'Login incorrect'
                }
            } else {
                this.message = 'Login incorrect'
            }
        })
        .catch((err : any) => {
            this.message = 'Communication problem'
        })
    }

}
</script>
