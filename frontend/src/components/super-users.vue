<template src="./super-users.html"></template>
<style scoped src="./super-users.css"></style>

<script lang="ts">

import { Vue, Component, Mixins } from "vue-property-decorator"

import * as moment from 'moment-mini'
import foundation from '../foundation'

interface DataRecord {
    id: number,
    name: string,
    gecos?: string,
    password?: string
}

interface FormState {
    create: boolean,
    update: boolean,
    drop: boolean
}

import PageNav from "./page-nav.vue"
import PageNavMixin from "./page-nav-mixin"

@Component({
   components: { PageNav },
})
export default class SuperUsers extends Mixins(PageNavMixin) {

    dataRecords : DataRecord[] = []

    infoMessage : string = ''
    alertMessage : string = ''
    updateStamp : string = ''

    formData : DataRecord = {
        id: 0,
        name: '',
        password: ''
    }

    formState : FormState = {
        create: false,
        update: false,
        drop: false
    }

    sortData(prop : string, dir : string ) {
        this.dataRecords = this.dataRecords.sort(function(itemA : any, itemB : any) : number {
            if (dir === 'up') {
                if (itemA[prop] < itemB[prop]) return 1
                if (itemA[prop] > itemB[prop]) return -1
                return 0
            } else {
                if (itemA[prop] > itemB[prop]) return 1
                if (itemA[prop] < itemB[prop]) return -1
                return 0
            }
        })
    }

    fetchData() {
        this.$client('/api/superusers', 'list', {})
            .then((res : any) => {
                this.dataRecords = res.data.result
                this.updateStamp = moment().format('h:mm:ss a')
            })
            .catch((err : any) => {
                this.alertMessage = 'Communication problem'
            })
    }

    pageArray() : any[] {
        return Array
            .apply(null, {
                    length: Math.floor((this.dataRecords.length)/this.recordStep + 0.999)
            })
            .map(function(value : any, index : number){ 
                    return index
            })
    }

    resetFormData() {
        this.formData = {
            id: 0,
            name: '',
            password: ''
        }
    }

    hideForms() {
        this.formState.create = false
        this.formState.update = false
        this.formState.drop = false

    }

    hideInfo() {
        this.infoMessage = ''
    }

    hideAlert() {
        this.alertMessage = ''
    }

    showCreateForm() {
        this.hideInfo()
        this.resetFormData()
        this.formState.update = false
        this.formState.drop = false
        this.formState.create = !this.formState.create
    }

    showUpdateForm(item : DataRecord) {
        this.hideInfo()
        this.formState.drop = false
        this.formState.create = false

        if (this.formData.id == item.id) {
            this.formState.update = false
            this.resetFormData()
        } else {
            this.formData = this.$lodash.clone(item)
            this.formState.update = true
        }

    }

    showDropForm(item : DataRecord) {
        this.hideInfo()
        this.formState.update = false
        this.formState.create = false

        if (this.formData.id == item.id) {
            this.formState.drop = false
            this.resetFormData()
        } else {
            this.formData = this.$lodash.clone(item)
            this.formState.drop = true
        }
    }

    handleCreate(item : DataRecord) {
        this.formState.create = false
        this.formState.update = false
        this.$client('/api/superusers', 'create', item)
            .then((res : any) => {
                this.infoMessage = 'User ' + this.$lodash.clone(this.formData.name) + ' created'
                this.fetchData()
            })
            .catch((err : any) => {
                this.alertMessage = 'Communication problem'
            })
    }

    handleUpdate(item : DataRecord) {
        this.formState.update = false
        this.$client('/api/superusers', 'update', item)
            .then((res : any) => {
                this.infoMessage = 'User ' + this.$lodash.clone(this.formData.name) + ' updated'
                this.fetchData()
            })
            .catch((err : any) => {
                this.alertMessage = 'Communication problem'
            })
    }

    handleDrop(item : DataRecord) {
        this.formState.drop = false
        this.formState.update = false
        this.$client('/api/superusers', 'drop', item)
            .then((res : any) => {
                this.infoMessage = 'User ' + this.$lodash.clone(this.formData.name) + ' deleted'
                this.fetchData()
            })
            .catch((err : any) => {
                this.alertMessage = 'Communication problem'
            })
    }

    mounted() {
        this.fetchData()
    }

}
</script>
