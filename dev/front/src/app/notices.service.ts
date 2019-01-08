import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

export enum NoticeType {
    info = 1,
    success = 2,
    warning = 3,
    alert = 4
}

export interface Notice {
    type: NoticeType
    message: string
}


@Injectable({
  providedIn: 'root'
})
export class NoticesService {

    subject: Subject<Notice>

    constructor() {
        this.subject = new Subject<Notice>()
    }

    sendInfoMessage(message: string) {
        this.subject.next({ type: NoticeType.info, message: message })
    }

    sendSuccessMessage(message: string) {
        this.subject.next({ type: NoticeType.success, message: message })
    }

    sendWarningMessage(message: string) {
        this.subject.next({ type: NoticeType.warning, message: message })
    }

    sendAlertMessage(message: string) {
        this.subject.next({ type: NoticeType.alert, message: message })
    }
}

