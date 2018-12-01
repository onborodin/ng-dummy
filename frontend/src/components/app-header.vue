<template src="./app-header.html"></template>
<style src="./app-header.css"></style>

<script lang="ts">

import { Vue, Component, Prop } from "vue-property-decorator"
import { Action, Getter } from 'vuex-class'

import * as esCookies from 'es-cookie'


@Component
export default class AppHeader extends Vue {

    @Getter('isAuth') isAuth : boolean
    @Action('setLogout') setLogout : () => void

    cookieName : string = 'session'

    logout() {
        esCookies.remove(this.cookieName)
        this.setLogout()
        this.$router.push('/login')
    }


    updated() {
        this.$foundation('#app-header')
    }

}
</script>
