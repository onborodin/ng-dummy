<template>
<div id="users">

    <div class="grid-container">
        <div class="grid-x grid-margin-x align-center">
            <div class="cell medium-8">

                <transition name="fade">
                    <div v-if="alertMessage" class="callout alert">
                        {{ alertMessage }}
                        <button class="button small float-right margin-bottom-1" v-on:click="hideAlert()">OK</button>
                    </div>
                </transition>

                <transition name="fade">
                    <div v-if="infoMessage" class="callout success">
                        {{ infoMessage }}
                        <button class="button small float-right margin-bottom-1" v-on:click="hideInfo()">OK</button>
                    </div>
                </transition>
            </div>
        </div>
    </div>


    <div class="grid-container">
        <div class="grid-x grid-margin-x align-center">
            <div class="cell medium-8">

                <pre>{{ debug }}</pre>

            </div>
        </div>
    </div>


    <div class="grid-container">
        <div class="grid-x grid-margin-x align-center">
            <div class="cell medium-4">


                <transition name="fade">
                    <div v-if="formState.create">
                        <form accept-charset="UTF-8" v-on:submit.prevent="handleCreate(formData)" class="callout">

                            <h5 class="text-center">Do create user {{ formData.name }}?</h5>

                            <label>Name
                                <input type="text" v-model.trim="formData.name" />
                            </label>

                            <label>Password
                                <input type="text" v-model.trim="formData.password" />
                            </label>

                            <div class="text-center">
                                <button class="button small" type="submit">Accept</button>
                                <div class="button small" v-on:click="hideForms()">Escape</div>
                            </div>
                        </form>
                    </div>
                </transition>


                <transition name="fade">
                    <div v-if="formState.update">
                        <form accept-charset="UTF-8" v-on:submit.prevent="handleUpdate(formData)" class="callout">

                            <h5 class="text-center">Do update user {{ formData.name }}?</h5>

                            <label>Name
                                <input type="text" v-model.trim="formData.name" />
                            </label>

                            <label>Password
                                <input type="text" v-model.trim="formData.password" />
                            </label>

                            <div class="text-center">
                                <button class="button small" type="submit">Accept</button>
                                <div class="button small" v-on:click="hideForms()">Escape</div>
                            </div>
                        </form>
                    </div>
                </transition>


                <transition name="fade">
                    <div v-if="formState.drop">
                        <form accept-charset="UTF-8" v-on:submit.prevent="handleDrop(formData)" class="callout">
                            <h5 class="text-center">Do drop user {{ formData.name }}?</h5>
                            <div class="text-center">
                                <button class="button small" type="submit">Accept</button>
                                <div class="button small" v-on:click="hideForms()">Escape</div>
                            </div>
                        </form>
                    </div>
                </transition>

            </div>
        </div>
    </div>


    <div class="grid-container">
        <div class="grid-x grid-margin-x align-center">
            <div class="cell medium-8">

                <h5>Users <a v-on:click="fetchData()"><i class="fi-refresh"></i></a>
                    <button class="float-right small button" v-on:click="showCreateForm()">+</button>
                </h5>

                <div class="cell">
                    <div class="float-left">
                        <small>Updated: {{ updateStamp }}</small>
                    </div>
                    <div class="float-right">
                        <small>
                            <ul class="menu">
                                <li><a v-on:click="recordStep = 5; firstRecord = 0">5</a></li>
                                <li><a v-on:click="recordStep = 10; firstRecord = 0">10</a></li>
                                <li><a v-on:click="recordStep = 20; firstRecord = 0">20</a></li>
                                <li><a v-on:click="recordStep = 50; firstRecord = 0">50</a></li>
                                <li><a v-on:click="recordStep = 1024; firstRecord = 0">all</a></li>
                            </ul>
                        </small>
                    </div>
                </div>


                <transition name="fade">
                    <div v-if="dataRecords">


                        <table>
                            <thead>
                                <tr>
                                    <th width="3em">#</th>
                                    <th width="20em">name
                                        <a v-on:click="sortData('name','up')"><i class="arrow-up"></i></a>
                                        <a v-on:click="sortData('name','down')"><i class="arrow-down"></i></a>
                                    </th>
                                    <th width="4em"><i class="fi-pencil"></i></th>
                                    <th width="4em"><i class="fi-trash"></i></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in dataRecords.slice(firstRecord, firstRecord + recordStep)">
                                    <td>{{ index + firstRecord + 1 }}</td>
                                    <td>{{ item.name }}</td>
                                    <td><a v-on:click="showUpdateForm(item)"><i class="fi-pencil"></i></a></td>
                                    <td><a v-on:click="showDropForm(item)"><i class="fi-trash"></i></a></td>
                                </tr>
                            </tbody>

                        </table>


                        <nav>
                            <ul class="pagination text-center">

                                <li v-if="firstRecord >= recordStep">
                                    <a v-on:click="firstRecord -= recordStep">
                                        <i class="arrow-left margin-right-1"></i>Prev
                                    </a>
                                </li>
                                <li v-if="firstRecord < recordStep">
                                    <a href="#">Prev</a>
                                </li>

                                <li v-for="(page) in pageArray()">
                                    <a v-if="page * recordStep == firstRecord" v-on:click="firstRecord = page * recordStep" class="current" >{{ page + 1 }}</a>
                                    <a v-if="page * recordStep != firstRecord" v-on:click="firstRecord = page * recordStep">{{ page + 1 }}</a>
                                </li>

                                <li v-if="firstRecord < (dataRecords.length - recordStep)">
                                    <a v-on:click="firstRecord += recordStep">Next<i class="arrow-right margin-left-1"></i></a>
                                </li>
                                <li v-if="firstRecord >= (dataRecords.length - recordStep)">
                                    <a href="#">Next</a>
                                </li>

                            </ul>
                        </nav>

                    </div>
                </transition>

            </div>
        </div>
    </div>

</div>




</template>

<script lang="ts">

import { Vue, Component, Prop, Watch } from "vue-property-decorator"

import * as moment from 'moment-mini'
import foundation from './foundation'

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
    debug: string = ''


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

<style scoped>

.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s ease;
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
