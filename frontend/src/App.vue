<template src="./App.html"></template>
<style src="./App.css"></style>

<script lang="ts">

import { Vue, Component, Prop } from "vue-property-decorator"
import { State, Action, Getter, Mutation, namespace } from 'vuex-class'

import Domains from './components/Domains.vue'
import Users from './components/Users.vue'
import SuperUsers from './components/SuperUsers.vue'
import NotFound from './components/NotFound.vue'

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
