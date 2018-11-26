
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

@Module
export default class login extends VuexModule {

    auth : boolean = false

    @Mutation
    login() {
        this.auth = true
    }

    @Mutation
    logout() { 
        this.auth = false
    }

    @Action
    setLogin() {
        this.context.commit('login')
    }

    @Action
    setLogout() {
        this.context.commit('logout')
    }

    get isAuth() : boolean {
        return this.auth
    }
}
