import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { fadeAnimation, rotateAnimation } from '../app.animations'
import { NoticesService, NoticeType, Notice } from '../notices.service'

declare var $: any

@Component({
    selector: 'notifier',
    templateUrl: './notifier.component.html',
    styleUrls: ['./notifier.component.scss'],
    animations: [ fadeAnimation, rotateAnimation ]
})
export class NotifierComponent implements OnInit, OnDestroy {

    notices: Notice[] = []

    @Input() type : NoticeType = NoticeType.success
    noticeType = NoticeType

    private subscription: any

    constructor(private noticesService: NoticesService) {

        this.subscription = this.noticesService.subject
            .subscribe((notice: Notice) => {
                var index = this.notices.push(notice) - 1
            })
    }

    noticeId(index) : string {
        var noticeId = `notice${index}`
        return
    }

    hide(index) {
        var notices = this.notices.filter(function(item, i, arr){
            return i !== index
        })
        this.notices = notices
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }
}
