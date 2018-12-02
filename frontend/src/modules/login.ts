
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

@Module
export default class login extends VuexModule {

    auth : boolean = false

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
