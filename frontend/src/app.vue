<template src="./app.html"></template>
<style src="./app.css"></style>

<script lang="ts">

import { Vue, Component, Prop } from "vue-property-decorator"
import { State, Action, Getter, Mutation, namespace } from 'vuex-class'

import * as esCookies from 'es-cookie'

import Domains from './components/domains.vue'
import Users from './components/users.vue'
import SuperUsers from './components/super-users.vue'
import NotFound from './components/not-found.vue'

const login = namespace('./modules')

@Component({
    components: { Domains, Users, SuperUsers, NotFound }
})
export default class App extends Vue {

    @Getter isAuth: boolean
    @Action setLogout: () => void

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
        this.setLogout()
        esCookies.remove('session')
        this.$router.push('/login')
    }

    mounted() {
        setInterval(() => {
                if (typeof(esCookies.get(this.cookieName)) === 'undefined' && this.isAuth == true ) {
                    this.alertMessage = 'Session expired'
                    this.logout()
                }
        }, 1000)
    }
}
</script>
