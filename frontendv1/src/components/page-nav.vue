<template src="./page-nav.html"></template>
<style scoped src="./page-nav.css"></style>

<script lang="ts">

import { Vue, Component, Prop, Watch } from "vue-property-decorator"

@Component
export default class PageNav extends Vue {

    @Prop({ default: 5 }) recordStep!: number
    @Prop({ default: 5 }) dataLength!: number

    firstRecord: number = 0

    onChangePage(pageNumber : number) {
        this.firstRecord = (pageNumber * this.recordStep)
        this.$emit('pageNumberChanged', this.firstRecord)
    }

    pageArray() : any[] {
        return Array
            .apply(null, {
                    length: Math.floor((this.dataLength/this.recordStep) + 0.999)
            })
            .map(function(value : any, index : number){ 
                    return index
            })
    }
}
</script>
