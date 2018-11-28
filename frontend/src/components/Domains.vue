<template src="./Domains.html"></template>
<style scoped src="./Domains.css"></style>

<script lang="ts">

import { Vue, Component, Prop, Watch } from "vue-property-decorator"

import * as moment from 'moment-mini'
import foundation from '../foundation'

interface Domain {
    id: number,
    name: string,
    gecos?: string
}

interface formState {
    create: boolean,
    update: boolean,
    drop: boolean
}

@Component
export default class Domains extends Vue {

    infoMessage: string = ''
    alertMessage: string = ''
    dataRecords: any[] = []
    updateStamp: string = ''

    firstRecord: number = 0
    recordStep: number = 5

    formData: Domain = {
        id: 0,
        name: '',
    }

    formState: formState = {
        create: false,
        update: false,
        drop: false
    }


    sortData(prop : string, dir : string ) {
        this.dataRecords = this.dataRecords.sort(function(itemA, itemB) {
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
        this.$client('/api/domains', 'list', {})
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

    showUpdateForm(item: Domain) {
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

    showDropForm(item: Domain) {
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

    handleCreate(item: Domain) {
        this.formState.create = false
        this.formState.update = false
        this.$client('/api/domains', 'create', item)
            .then((res : any) => {
                this.infoMessage = 'Domain ' + this.$lodash.clone(this.formData.name) + ' created'
                this.fetchData()
            })
            .catch((err : any) => {
                this.alertMessage = 'Communication problem'
            })
    }

    handleUpdate(item: Domain) {
        this.formState.update = false
        this.$client('/api/domains', 'update', item)
            .then((res : any) => {
                this.infoMessage = 'Domain ' + this.$lodash.clone(this.formData.name) + ' updated'
                this.fetchData()
            })
            .catch((err : any) => {
                this.alertMessage = 'Communication problem'
            })
    }

    handleDrop(item: Domain) {
        this.formState.drop = false
        this.formState.update = false
        this.$client('/api/domains', 'drop', item)
            .then((res : any) => {
                this.infoMessage = 'Domain ' + this.$lodash.clone(this.formData.name) + ' deleted'
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
