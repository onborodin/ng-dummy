import { Vue, Component } from "vue-property-decorator"
import { State, Action, Getter } from 'vuex-class'

@Component
export default class CheckLoginMixin extends Vue {

    @Getter('isAuth') isAuth : boolean
    @Action('setLogout') setLogout : () => void

    checkLogin() {
        if (this.isAuth == false) {
            this.$emit('logout')
        }
    }
}








