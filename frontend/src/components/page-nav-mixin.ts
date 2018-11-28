import { Vue, Component } from "vue-property-decorator"

@Component
export default class PageNavMixin extends Vue {

    recordStep : number = 5
    firstRecord : number = 0

    onPageNumberChanged(firstRecord : number) {
        this.firstRecord = firstRecord
    }
}
