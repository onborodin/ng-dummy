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
    simpleViewLimit: number = 9

    @Output() changeFirstElemEvent = new EventEmitter<number>();

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

    setPage(page: Page) {
        this.currentPageNum = page.num
        this.changeFirstElemEvent.emit(this.pageList[this.currentPageNum].firstElem)
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['listLength'] || changes['pageSize']) {
            if (this.pageSize < 1) this.pageSize = 1
            this.createPageList()
        }

        if (changes['firstElem']) {
            this.setCurrentPage()
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
    }

    setCurrentPage() {
        this.currentPageNum = Math.abs((this.firstElem / this.pageSize))
        this.createPageList()
    }

    ngOnInit() {
    }
}
