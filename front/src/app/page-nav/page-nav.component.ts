import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators, ValidationErrors } from '@angular/forms'

interface Page {
    num: number
    firstElem: number
}


@Component({
    selector: 'page-nav',
    templateUrl: './page-nav.component.html',
    styleUrls: ['./page-nav.component.scss']
})
export class PageNavComponent implements OnInit {

    pageList: Page[] = []

    @Input() listLength: number = 0
    @Input() pageSize: number = 5
    @Input() firstElem: number = 0

    currentPageNum: number = 0
    firstPageNum: number = 0
    lastPageNum: number = 0
    pageWindow: number = 2
    simpleViewLimit: number = 10

    @Output() changePageEvent = new EventEmitter<number>();

    setPage(page: Page) {
        this.currentPageNum = page.num
        this.changePageEvent.emit(this.pageList[this.currentPageNum].firstElem)
    }

    nextPage() {
        if (this.currentPageNum < this.lastPageNum) {
            this.setPage(this.pageList[this.currentPageNum + 1])
        }
    }

    prevPage() {
        if (this.currentPageNum > this.firstPageNum) {
            this.setPage(this.pageList[this.currentPageNum - 1])
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['listLength']) {
            this.createPageList()
        }

        if (changes['firstElem']) {
            this.createPageList()
        }

        if (changes['pageSize']) {
            if (this.pageSize < 1) this.pageSize = 1
            this.createPageList()
        }
    }

    createPageList() {
        var page = 0
        var list: Page[] = []
        for (var i = 0; i < (this.listLength); i += this.pageSize) {
            list.push({ num: page, firstElem: i })
            page += 1
        }
        this.pageList = list
        this.lastPageNum = this.pageList.length - 1
        this.currentPageNum = Math.round((this.listLength / this.pageSize) + 0.500001)
    }



    ngOnInit() {
    }



}
