<template src="./login.html"></template>
<style lang="scss" src="./login.scss"></style>

<script lang="ts">

import { Vue, Component, Prop, Watch } from "vue-property-decorator"
import { State, Action, Getter } from 'vuex-class'

@Component
export default class Login extends Vue {

    name : string = ''
    password : string = ''

    message : string = ''
    attemptsCount : number = 0

    @Getter storeInfo: string
    @Getter isAuth: boolean
    @Action setLogin: () => void

    submitLogin() {
        this.$client('/api/login', 'login', { 
                name: this.name,
                password: this.password
        })
        .then((res: any) => {
            let result = res.data.result
            if (this.$lodash.has(result, '[0].id')) {
                    this.message = 'Login OK'
                    this.setLogin()
                    this.$router.push('/domains')
            } else {
                this.attemptsCount += 1
                this.message = 'Login incorrect, attempt ' + this.attemptsCount
            }
        })
        .catch((err: any) => {
            this.message = 'Communication problem'
        })
    }

    mounted() {
        this.message = this.storeInfo
    }
}
</script>
