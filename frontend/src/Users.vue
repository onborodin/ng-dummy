<template src="./Users.html"></template>

<script lang="ts">
import { mapState, mapGetters, mapActions } from 'vuex'

import { Vue, Component, Prop, Watch } from "vue-property-decorator"

import foundation from './foundation'

import * as jquery from 'jquery'
import * as moment from "moment-mini"

interface user {
    id: number,
    name: string,
    password?: string
}

interface FormState {
    add: boolean,
    update: boolean,
    drop: boolean
}

@Component
export default class Users extends Vue {

    message: string = ''
    alert: string = ''
    users: any[] = []
    timestamp: string = ''

    first: number = 0
    last: number = 0
    step: number = 5

    formData: user = {
        id: 0,
        name: '',
        password: ''
    }

    formState: FormState = {
        add: false,
        update: false,
        drop: false
    }

    getList() {
        this.$client('/api/list', {})
            .then((res: any) => {
                this.users = res.data.result
                this.timestamp = moment().format('LTS')
            })
            .catch((err: any) => {
                this.alert = moment().format() + " Communication problem"
            })
    }

    pages() : any[] {
        return Array
            .apply(null, {
                    length: Math.floor((this.users.length/this.step) + 1)
            })
            .map(function(value : any, index : number){ 
                    return index
            })

    }

    mounted() {
        this.getList()
    }

    resetFormData() {
        this.formData = {
            id: 0,
            name: '',
            password: ''
        }
    }

    showAdd() {
        this.resetFormData()
        this.formState.update = false
        this.formState.drop = false
        this.formState.add = !this.formState.add
    }

    showUpdate(item: user) {
        this.formState.drop = false
        this.formState.add = false

        if (this.formData.id == item.id) {
            this.formState.update = false
            this.resetFormData()
        } else {
            this.formData = this.$lodash.clone(item)
            this.formState.update = true
        }

    }

    showDrop(item: user) {
        this.formState.update = false
        this.formState.add = false

        if (this.formData.id == item.id) {
            this.formState.drop = false
            this.resetFormData()
        } else {
            this.formData = this.$lodash.clone(item)
            this.formState.drop = true
        }
    }

    handleDrop(item: user) {
        this.formState.drop = false
        this.message='User ' + this.$lodash.clone(this.formData.name) + ' droped'
    }

    handleUpdate(item: user) {
        this.formState.update = false
        this.message='User ' + this.$lodash.clone(this.formData.name) + ' updated'
    }

    handleAdd(item: user) {
        this.formState.add = false
        this.message='User ' + this.$lodash.clone(this.formData.name) + ' added'
    }
}
</script>

<style scoped>

.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s ease;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}


.slide-fade-enter-active {
    transition: all .3s ease;
}

.slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to {
    opacity: 0;
}
</style>
