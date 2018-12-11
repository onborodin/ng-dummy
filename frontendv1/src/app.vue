<template src="./app.html"></template>
<style src="./app.css"></style>

<script lang="ts">


import LoginHeader from './components/login-header'

import AppHeader from './components/app-header'
import AppFooter from './components/app-footer'

import Domains from './components/domains'
import Users from './components/users'
import SuperUsers from './components/super-users'
import NotFound from './components/not-found'

import * as Cookies from 'es-cookie'

import { Vue, Component, Prop } from "vue-property-decorator"
import { State, Action, Getter } from 'vuex-class'


@Component({
    components: { LoginHeader, AppHeader, AppFooter, Domains, Users, SuperUsers, NotFound }
})
export default class App extends Vue {

    @Getter isAuth : boolean
    @Action setLogout : () => void
    @Action setLogin : () => void

    debug : any = ''
    alertMessage : string = ''
    infoMessage : string = ''

    cookieName : string = 'session'

    checkLogin() {
        return this.isAuth
    }

    hideInfo() {
        this.infoMessage = ''
    }

    hideAlert() {
        this.alertMessage = ''
    }


    logout() {
        console.log('#received logout')
        Cookies.remove(this.cookieName)
        this.setLogout()
        this.$router.push('/login')
    }

    mounted() {

        //if (typeof(Cookies.get(this.cookieName)) !== 'undefined') {
        //    this.setLogin()
        //}

        setInterval(() => {
                if (typeof(Cookies.get(this.cookieName)) === 'undefined' && this.isAuth == true ) {
                    this.alertMessage = 'Session expired'
                    Cookies.remove(this.cookieName)
                    this.setLogout()
                    this.$router.push('/login')
                }
        }, 1000)
        this.$foundation(document)
    }

}
</script>
