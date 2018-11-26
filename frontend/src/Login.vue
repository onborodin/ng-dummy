<template>
    <div>

        <div class="grid-container margin-top-2">
            <div class="grid-x grid-padding-x align-center">
                <div class="cell small-8 medium-4 large-3">

                    <div class="card padding-1">
                        <form accept-charset="UTF-8" v-on:submit.prevent="submitLogin()">

                            <label>Login (qwerty@sample.org)
                                <input type="text" v-model.trim="loginName" placeholder="login">
                            </label>

                            <label>Password (12345)
                                <input type="password" v-model.trim="password" placeholder="password">
                            </label>

                            <div class="text-center">
                                <button class="button small" type="submit">Send</button>
                            </div>
                            <p class="text-center">
                                {{ message }}
                            </p>
                        </form>
                    </div>

                    <pre>{{ debug }}</pre>

                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Watch } from "vue-property-decorator"
import { State, Action, Getter, Mutation } from 'vuex-class'


@Component
export default class Login extends Vue {

    loginName : string = ''
    password : string = ''
    message : string = ''
    debug : any = ''

    @Getter isAuth: boolean
    @Action setLogin: () => void

    submitLogin() {
        

    }

    mounted() {
    }

}
</script>
