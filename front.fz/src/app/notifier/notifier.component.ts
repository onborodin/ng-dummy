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
            .subscribe((notice : Notice) => {
                this.notices.push(notice)
                $('#notifier' ).foundation('open') 
            })
    }

    close() {
        $('#notifier' ).foundation('close')
        this.notices = []
    }

    class(notice: Notice) : string {
        switch (notice.type) {
            case NoticeType.success: {
                return "callout success"
            }
            case NoticeType.alert: {
                return "callout alert"
            }
            case NoticeType.warning: {
                return "callout warning"
            }
        }
        return "callout secondary"
    }

    ngOnInit() {
        $('#notifier').foundation()
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }
}
