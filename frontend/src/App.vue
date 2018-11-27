<template src="./App.html"></template>
<style src="./App.css"></style>

<script lang="ts">

import { Vue, Component, Prop } from "vue-property-decorator"
import { State, Action, Getter, Mutation } from 'vuex-class'

import Users from './components/Users.vue'
import NotFound from './components/NotFound.vue'


@Component({
    components: { Users, NotFound }
})
export default class App extends Vue {

    @Getter isAuth: boolean
    @Action setLogout: () => void

    cookie : string = ''
    debug : string = ''

    logout() {
        this.setLogout()
        this.$router.push('/login')
    }

    mounted() {
        setInterval(
            () => {
                // find cookie with name, else push to login page
                var cookieName = 'session'
                var name = cookieName + "="
                var decodedCookie = decodeURIComponent(document.cookie)

                console.log('cookie: '+ decodedCookie)

                var cookArray = decodedCookie.split(';')

                for (var i = 0; i < cookArray.length; i++) {
                    var c = cookArray[i]
                    while (c.charAt(0) == ' ') {
                        c = c.substring(1)
                    }

                    if (c.indexOf(name) == 0) {
                        this.cookie = c.substring(name.length, c.length)
                    } else {
                        this.cookie = ''
                    }
                }

                if (this.cookie === '') {
                    this.setLogout()
                    this.$router.push('/login')
                }
            }, 1000)
    }

}
</script>
