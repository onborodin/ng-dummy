<template src="./app.html"></template>
<style src="./app.css"></style>

<script lang="ts">

import { Vue, Component, Prop } from "vue-property-decorator"
import { State, Action, Getter, Mutation } from 'vuex-class'

import * as esCookies from 'es-cookie'

import AppHeader from './components/app-header'
import AppFooter from './components/app-footer'

import Domains from './components/domains'
import Users from './components/users'
import SuperUsers from './components/super-users'
import NotFound from './components/not-found'


@Component({
    components: { AppHeader, AppFooter, Domains, Users, SuperUsers, NotFound }
})
export default class App extends Vue {

    @Getter('isAuth') isAuth : boolean
    @Action('setLogout') setLogout : () => void
    @Action('setLogin') setLogin : () => void

    cookieName : string = 'session'
    debug : any = ''
    alertMessage : string = ''
    infoMessage : string = ''

    hideInfo() {
        this.infoMessage = ''
    }

    hideAlert() {
        this.alertMessage = ''
    }

    logout() {
        esCookies.remove(this.cookieName)
        this.setLogout()
        this.$router.push('/login')
    }

    mounted() {

        if (typeof(esCookies.get(this.cookieName)) !== 'undefined') {
            this.setLogin()
        }

        setInterval(() => {
                if (typeof(esCookies.get(this.cookieName)) === 'undefined' && this.isAuth == true ) {
                    this.alertMessage = 'Session expired'
                    this.logout()
                }
        }, 1000)

        this.$foundation(document)

    }
}
</script>
