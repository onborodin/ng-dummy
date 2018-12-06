<template src="./app-header.html"></template>
<style lang="scss" src="./app-header.scss"></style>

<script lang="ts">

import { Vue, Component, Prop } from "vue-property-decorator"

@Component
export default class Header extends Vue {

    logout() {
        this.$emit('logout')
    }

    updated() {
        this.$foundation('#header')
    }

    mounted() {
        this.$foundation('#header')
    }

}
</script>
