<template src="./domains.html"></template>
<style lang="scss" src="./domains.scss"></style>

<script lang="ts">
import { Vue, Component, Prop, Mixins } from "vue-property-decorator"
import { State, Action, Getter } from 'vuex-class'

import AppHeader from '../components/app-header.vue'
import AppFooter from '../components/app-footer.vue'

import DataModel from '../models/domain'

@Component({
    components: { AppHeader, AppFooter }
})
export default class Domains extends Vue {

    apiURL: string = '/api/domains' 
    dataList: DataModel[] = []

    firstItem: number = 0
    itemStep: number = 5
    itemCount: number = 0

    alertMessage: string = ''
    infoMessage: string = ''

    @Action setInfo: (message: string) => void

    currentDataList() : DataModel[] {
        return this.dataList.slice(
            this.firstItem,
            this.firstItem + this.itemStep
        )
    }

    shiftIndex(index: number) : number {
        return index + this.firstItem + 1
    }

    fetchData() {
        this.checkLogin()
        this.$client(this.apiURL, 'list', {})
            .then((res: any) => {
                if(this.$lodash.has(res, 'data.result')) {
                    this.dataList = res.data.result
                } else {
                    this.alertMessage = 'RPC problem'
                }
            })
            .catch((err: any) => {
                this.alertMessage = 'Communication problem'
            })
    }

    checkLogin() {
        this.$client('/api/login', 'check', {})
            .then((res: any) => {
                if (!this.$lodash.has(res, 'data.result') || res.data.result != true) {
                    this.setInfo('Login check return false')
                    this.$router.push('/login')
                }
            })
            .catch((err: any) => {
                    this.setInfo('Communication problem with session check')
                    this.$router.push('/login')
            })
    }

    mounted() {
        this.fetchData()
    }

}
</script>
