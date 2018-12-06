<template src="./not-found.html"></template>
<style lang="scss" src="./not-found.scss"></style>

<script lang="ts">
import { Vue, Component, Prop, Mixins } from "vue-property-decorator"

import AppHeader from '../components/app-header.vue'
import AppFooter from '../components/app-footer.vue'

@Component({
    components: { AppHeader, AppFooter }
})
export default class Domains extends Vue {

}
</script>
