
import { Vue, Component, Mixins } from "vue-property-decorator"

import * as moment from 'moment-mini'
//import foundation from '../foundation'

interface DataRecord {
    id: number,
    name: string,
}

interface FormState {
    create: boolean,
    update: boolean,
    drop: boolean
}

@Component
export default class Users extends Vue {

    dataRecords : DataRecord[] = []
    apiURL : string = '/api/crud-mixin-dummy'

    infoMessage : string = ''
    alertMessage : string = ''
    updateStamp : string = ''

    formData: DataRecord = {
        id: 0,
        name: ''
    }

    formState: FormState = {
        create: false,
        update: false,
        drop: false
    }

    resetFormData() {
        this.formData = {
            id: 0,
            name: ''
        }
    }

    hideForms() {
        this.hideUpdate()
        this.hideDrop()
        this.hideCreate()
        this.resetFormData()
    }

    hideInfo() {
        this.infoMessage = ''
    }

    hideAlert() {
        this.alertMessage = ''
    }

    hideCreate() {
        this.formState.create = false
        this.resetFormData()
    }

    hideUpdate() {
        this.formState.update = false
        this.resetFormData()
    }

    hideDrop() {
        this.formState.drop = false
        this.resetFormData()
    }

    showCreateForm() {
        this.hideInfo()
        this.hideUpdate()
        this.hideDrop()
        this.resetFormData()
        this.formState.create = !this.formState.create
    }

    showUpdateForm(item : DataRecord) {
        this.hideInfo()
        this.hideDrop()
        this.hideCreate()

        if (this.formData.id == item.id) {
            this.hideUpdate()
            this.resetFormData()
        } else {
            this.formData = this.$lodash.clone(item)
            this.formState.update = true
        }

    }

    showDropForm(item : DataRecord) {
        this.hideInfo()
        this.hideUpdate()
        this.hideCreate()

        if (this.formData.id == item.id) {
            this.hideDrop()
            this.resetFormData()
        } else {
            this.formData = this.$lodash.clone(item)
            this.formState.drop = true
        }
    }

    //handleCreate(item : DataRecord) {
    //    this.hideCreate()
    //    this.hideUpdate()
    //    console.log('#Dummy handleCreate')
    //}

    //handleUpdate(item : DataRecord) {
    //    this.hideUpdate()
    //    console.log('#Dummy handleDrop')
    //}

    //handleDrop(item : DataRecord) {
    //    this.hideDrop()
    //    this.hideUpdate()
    //    console.log('#Dummy handleDrop')
    //
    //}

    fetchData() {
        this.$client(this.apiURL, 'list', {})
            .then((res : any) => {
                this.dataRecords = res.data.result
                this.updateStamp = moment().format('h:mm:ss a')
            })
            .catch((err : any) => {
                this.alertMessage = 'Communication problem'
            })
    }


    handleCreate(item : DataRecord) {
        const dataRecord = this.$lodash.clone(this.formData)
        this.hideCreate()
        this.$client(this.apiURL, 'create', item)
            .then((res : any) => {
                this.infoMessage = 'Record ' + dataRecord.name + ' created'
                this.fetchData()
            })
            .catch((err : any) => {
                this.alertMessage = 'Communication problem'
            })
    }

    handleUpdate(item : DataRecord) {
        const dataRecord = this.$lodash.clone(this.formData)
        this.hideUpdate()
        this.$client(this.apiURL, 'update', dataRecord)
            .then((res : any) => {
                this.infoMessage = 'Record ' + dataRecord.name + ' updated'
                this.fetchData()
            })
            .catch((err : any) => {
                this.alertMessage = 'Communication problem'
            })
    }

    handleDrop(item : DataRecord) {
        const dataRecord = this.$lodash.clone(this.formData)
        this.hideDrop()
        this.$client(this.apiURL, 'drop', item)
            .then((res : any) => {
                this.infoMessage = 'Record ' + dataRecord.name + ' deleted'
                this.fetchData()
            })
            .catch((err : any) => {
                this.alertMessage = 'Communication problem'
            })
    }

    //mounted() {
    //    this.fetchData()
    //}
}
