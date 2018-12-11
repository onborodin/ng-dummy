<template src="./super-users.html"></template>
<style scoped src="./super-users.css"></style>

<script lang="ts">

import { Vue, Component, Mixins } from "vue-property-decorator"

import * as moment from 'moment-mini'

interface DataRecord {
    id: number,
    name: string,
    password: string
}

import PageNav from "./page-nav"

import PageNavMixin from "./mixins/page-nav-mixin"
import SortRecordsMixin from "./mixins/sort-records-mixin"
import CRUDFormsMixin from './mixins/crud-forms-mixin'
import CheckLoginMixin from './mixins/check-login-mixin'

@Component({
   components: { PageNav },
})
export default class Domains extends Mixins(PageNavMixin, CRUDFormsMixin, SortRecordsMixin, CheckLoginMixin) {

    dataRecords : DataRecord[] = []
    apiURL : string = '/api/superusers'

    formData : DataRecord = {
        id: 0,
        name: '',
        password: '',
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

    created() {
        this.checkLogin()
    }

}
</script>
