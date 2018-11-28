<template src="./PageNav.html"></template>
<style scoped src="./PageNav.css"></style>

<script lang="ts">

import { Vue, Component, Prop, Watch } from "vue-property-decorator"

@Component
export default class PageNav extends Vue {

    @Props recordStep: number = 5
    @Props dataLength: number = 0

    firstRecord: number = 0

    onChangePage(pageNumber) {
        this.firtsRecord = pageNumber * recordStep + 1
        this.$emit(pageNumberChanged, this.firtsRecord)
    }

    pageArray() : any[] {
        return Array
            .apply(null, {
                    length: Math.floor((this.dataLength)/this.recordStep + 0.999)
            })
            .map(function(value : any, index : number){ 
                    return index
            })
    }
}
</script>
