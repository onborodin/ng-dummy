<template src="./domains.html"></template>
<style scoped src="./domains.css"></style>

<script lang="ts">

import { Vue, Component, Mixins } from "vue-property-decorator"

import * as moment from 'moment-mini'

interface DataRecord {
    id: number,
    name: string,
    desc: string
}

import PageNav from "./page-nav"

import PageNavMixin from "./mixins/page-nav-mixin"
import SortRecordsMixin from "./mixins/sort-records-mixin"
import CRUDFormsMixin from './mixins/crud-forms-mixin'

@Component({
   components: { PageNav },
})
export default class Domains extends Mixins(PageNavMixin, CRUDFormsMixin, SortRecordsMixin) {

    dataRecords : DataRecord[] = []
    apiURL : string = '/api/domains'

    formData: DataRecord = {
        id: 0,
        name: '',
        desc: ''
    }

    resetFormData() {
        this.formData = {
            id: 0,
            name: '',
            desc: ''
        }
    }

    mounted() {
        this.fetchData()
    }

}
</script>
