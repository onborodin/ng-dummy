<template src="./app.html"></template>
<style lang="scss" src="./app.scss"></style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

import * as cookies from 'es-cookie'

@Component
export default class App extends Vue {

    @Getter isAuth: boolean
    @Action setLogout: () => void
    @Action setLogin: () => void

    @Action setInfo: (message: any) => void

    cookieName: string = 'session'

    mounted() {
        setInterval(() => {
            if (typeof(cookies.get(this.cookieName)) === 'undefined' && this.isAuth == true ) {
                this.setInfo('Session expired')
                this.setLogout()
                this.$router.push('/login')
            }
        }, 1000)
    }

}
</script>
