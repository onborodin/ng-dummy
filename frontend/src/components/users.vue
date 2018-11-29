<template src="./users.html"></template>
<style scoped src="./users.css"></style>

<script lang="ts">

import { Vue, Component, Mixins } from "vue-property-decorator"

import * as moment from 'moment-mini'
import foundation from '../foundation'

interface DataRecord {
    id: number,
    name: string,
    password: string
}

import PageNav from './page-nav'

import PageNavMixin from './mixins/page-nav-mixin'
import CRUDFormsMixin from './mixins/crud-forms-mixin'
import SortRecordsMixin from "./mixins/sort-records-mixin"

@Component({
   components: { PageNav }
})
export default class Users extends Mixins(PageNavMixin, CRUDFormsMixin, SortRecordsMixin) {

    dataRecords : DataRecord[] = []
    apiURL : string = '/api/users'

    formData: DataRecord = {
        id: 0,
        name: '',
        password: ''
    }

    resetFormData() {
        this.formData = {
            id: 0,
            name: '',
            password: ''
        }
    }

    mounted() {
        this.fetchData()
    }

}
</script>
