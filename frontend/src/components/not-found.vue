<template>
    <div>
        <div class="grid-container">
            <div class="grid-x grid-padding-x align-center">
                <div class="cell medium-8">
                    <div class="callout second margin-top-2 margin-bottom-2">

                        <h5>Page not found</h5>

                    </div>
                </div>
            </div>
        </div>

    </div>
</template>


<script lang="ts">

import { Vue, Component, Prop, Mixins } from "vue-property-decorator"

import CheckLoginMixin from './mixins//check-login-mixin'

@Component({
})
export default class Domains extends Mixins(CheckLoginMixin) {

    created() {
        this.checkLogin()
    }

}
</script>
