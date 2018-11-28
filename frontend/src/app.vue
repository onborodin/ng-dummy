<template src="./app.html"></template>
<style src="./app.css"></style>

<script lang="ts">

import { Vue, Component, Prop } from "vue-property-decorator"
import { State, Action, Getter, Mutation, namespace } from 'vuex-class'

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

    cookie : string = ''
    debug : string = ''

    logout() {
        this.setLogout()
        this.$router.push('/login')
    }

    mounted() {
    }
}
</script>
