<template src="./app-header.html"></template>
<style src="./app-header.css"></style>

<script lang="ts">

import { Vue, Component, Prop } from "vue-property-decorator"
import { Action, Getter } from 'vuex-class'

@Component
export default class AppHeader extends Vue {

    logout() {
        this.$emit('logout')
    }

    updated() {
        this.$foundation('#app-header')
    }

    mounted() {
        this.$foundation('#app-header')
    }

}
</script>
