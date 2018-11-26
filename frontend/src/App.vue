<template>
    <div id="page" >
        <div class="top-bar-container" data-sticky-container>
            <div class="sticky sticky-topbar" data-sticky data-options="anchor: page; marginTop: 0; stickyOn: small;">

                <div class="top-bar" v-if="isAuth">
                    <div class="top-bar-left">
                        <ul class="menu">
                            <li><a href="/"><i class="my-menu-icon"></i></a></li>
                            <li class="menu-text">VuT</li>
                            <li><router-link to="/users">Users</router-link></li>
                            <li><a v-on:click="logout()"><i class="fi-power"></i></a></li>
                        </ul>
                    </div>
                </div>

                <div class="top-bar" v-if="!isAuth">
                    <div class="top-bar-left">
                        <ul class="menu">
                            <li><a href="/"><i class="my-menu-icon"></i></a></li>
                            <li class="menu-text">VuT</li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>


        <div class="margin-left-2 margin-right-2">
            <router-view />
        </div>

        <div class="grid-container">
            <div class="grid-x grid-margin-x align-center">
                <div class="cell medium-10">
                    <hr />
                    <p class="text-center">
                        <small>Made by <a href="http://wiki.unix7.org">Borodin Oleg</a></small>
                    </p>
                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"
import { State, Action, Getter, Mutation } from 'vuex-class'

import Users from './Users.vue'
import NotFound from './NotFound.vue'


@Component({
    components: { Users, NotFound }
})
export default class App extends Vue {

    @Getter isAuth: boolean
    @Action setLogout: () => void

    logout() {
        this.setLogout()
        this.$router.push('/login')
    }

    mounted() {
        if (!this.isAuth) {
            this.$router.push('/login')
        }
    }

}
</script>


<style>
html {
    font-size: 90% !important;
}
</style>
