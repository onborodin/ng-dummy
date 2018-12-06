import Vue from 'vue'
import Vuex from 'vuex'

import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

@Module
class Login extends VuexModule {

    auth: boolean = false

    infoMessage: string = ''

    @Mutation
    infoMessageMutation(message: string) {
        this.infoMessage = message
    }

    @Action
    setInfo(message: string) {
        this.context.commit('infoMessageMutation', message)
    }

    get storeInfo() :string {
        return this.infoMessage
    }

    @Mutation
    loginMutation() {
        this.auth = true
    }


    @Mutation
    logoutMutation() {
        this.auth = false
    }

    @Action
    setLogin() {
        this.context.commit('loginMutation')
    }

    @Action
    setLogout() {
        this.context.commit('logoutMutation')
    }

    get isAuth() : boolean {
        return this.auth
    }
}

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    modules: {
        Login
    }
})

