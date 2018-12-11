import { Vue, Component } from "vue-property-decorator"

@Component
export default class SortRecordsMixin extends Vue {

    // very unsafe decition
    dataRecords: any[] = []

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
}








