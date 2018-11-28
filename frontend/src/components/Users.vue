<template src="./Users.html"></template>
<style scoped src="./Users.css"></style>

<script lang="ts">

import { Vue, Component, Prop, Watch } from "vue-property-decorator"
//import { State, Action, Getter, Mutation } from 'vuex-class'

import * as moment from 'moment-mini'
import foundation from '../foundation'

interface user {
    id: number,
    name: string,
    password?: string
}

interface formState {
    create: boolean,
    update: boolean,
    drop: boolean
}

@Component
export default class Users extends Vue {

    infoMessage: string = ''
    alertMessage: string = ''
    dataRecords: any[] = []
    updateStamp: string = ''

    //@Getter isAuth: boolean

    firstRecord: number = 0
    recordStep: number = 5

    formData: user = {
        id: 0,
        name: '',
        password: ''
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
        this.$client('/api/users', 'list', {})
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

    showUpdateForm(item: user) {
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

    showDropForm(item: user) {
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

    handleCreate(item: user) {
        this.formState.create = false
        this.formState.update = false
        this.$client('/api/users', 'create', item)
            .then((res : any) => {
                this.infoMessage = 'User ' + this.$lodash.clone(this.formData.name) + ' created'
                this.fetchData()
            })
            .catch((err : any) => {
                this.alertMessage = 'Communication problem'
            })
    }

    handleUpdate(item: user) {
        this.formState.update = false
        this.$client('/api/users', 'update', item)
            .then((res : any) => {
                this.infoMessage = 'User ' + this.$lodash.clone(this.formData.name) + ' updated'
                this.fetchData()
            })
            .catch((err : any) => {
                this.alertMessage = 'Communication problem'
            })
    }

    handleDrop(item: user) {
        this.formState.drop = false
        this.formState.update = false
        this.$client('/api/users', 'drop', item)
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
