import {HttpClient, HttpParams, HttpRequest, HttpEvent, HttpEventType, HttpResponse} from '@angular/common/http'
import { Component, OnInit } from '@angular/core'

import { FormGroup, FormControl, FormBuilder, FormArray, Validators,  ValidationErrors } from '@angular/forms'
import { Subject, Observable } from 'rxjs'

import { fadeAnimation, rotateAnimation } from '../app.animations'
import { NoticesService } from '../notices.service'
import { UploadService } from '../upload.service'

interface Progress {
    percent: number
    label: string
    id: string
}

type Progresses = Progress[]

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: [ './home.component.scss' ],
    animations: [ fadeAnimation, rotateAnimation ]
})
export class HomeComponent implements OnInit {


    uploadForm: FormGroup
    formItems: FormArray

    constructor(
        public noticesService: NoticesService,
        public uploadService: UploadService,
        public formBuilder: FormBuilder
    ) {}


    sendNotices() {
        this.noticesService
            .sendAlertMessage('Alert! Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.')
        setTimeout(() => {
            this.noticesService
                .sendWarningMessage('Warning! Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.')
        }, 700)
        setTimeout(() => {
            this.noticesService
                .sendSuccessMessage('Success. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.')
        }, 1400)
        setTimeout(() => {
            this.noticesService
                .sendInfoMessage('Info. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.')
        }, 2100)
    }

    ngOnInit() {
        this.createUploadForm()

        //this.createProgress()
        //const id = this.createProgress("qwerty.yui")
        //setInterval(() => {
        //    this.setProgressPercent(id, this.getProgressPercent(id) + 1)
        //}, 500)
        //setTimeout(() => {
        //    this.dropProgress(id)
        //}, 15000)
        //const id2 = this.createProgress("qwerty.yui")
        //setInterval(() => {
        //    this.setProgressPercent(id2, this.getProgressPercent(id2) + 1)
        //}, 700)
    }

    progresses: Progresses = []

    createProgress(label = "") : string {
        var nextNum = this.progresses.length
        var progress: Progress = {
            id: "xprogress-" + nextNum,
            percent: 0,
            label: label
        }
        this.progresses.push(progress)
        return progress.id
    }

    getProgressPercent(id: string) {
        var percent = 0
        this.progresses.forEach((item) => {
            if (item.id === id) {
                percent = item.percent
            }
        })
        return percent
    }


    setProgressPercent(id: string, percent: number) {
        if (percent >= 0 && percent <= 100) {
            this.progresses.forEach((item) => {
                if (item.id === id) {
                    item.percent = percent
                }
            })
        }
    }

    dropProgress(id: string) {
        this.progresses = this.progresses.filter((item) => {
            if (id === item.id) return false
            return true
        })
    }

    createUploadForm() {
        this.formItems = new FormArray([])
        this.uploadForm = new FormGroup({
            formItems: this.formItems
        }, this.uploadFormValidator)
    }

    fileIsNotZero(control: FormControl) : ValidationErrors | null {
        if (!control['value']) {
            return null
        }
        if (control.value.size === 0) {
            return { fileNotZero: 'File too small' }
        }
        return null
    }

    fileIsNotMore(control: FormControl) : ValidationErrors | null {
        if (!control['value']) {
            return null
        }
        if (control.value.size > 64 * 1024 * 1024) {
            return { fileIsNotMore: 'File too big' }
        }
        return null
    }

    fileIsDefined(control: FormControl) : ValidationErrors | null {
        if (!control['value']) {
            return { fileIsDefined: 'File undefined' }
        }
        return null
    }

    nameValidator(control: FormControl) : ValidationErrors | null {
        return null
    }

    uploadFormValidator(form: FormGroup) : ValidationErrors | null {
        const formItems = form.get('formItems') as FormArray
        var error = false
        formItems.controls.forEach((subForm, i) => {
            if (subForm.get('file').errors) {
                error = true
            }
        })
        if (error) {
            return { uploadFormValidator: 'Form Error' }
        }
        return null
    }


    createFormItem(): FormGroup {
        return new FormGroup({
            name: new FormControl(),
            secondName: new FormControl(),
            file: new FormControl(null, [
                this.fileIsDefined,
                this.fileIsNotZero,
                this.fileIsNotMore
            ]),
        })
    }

    addFormItem() : void {
        this.formItems.push(this.createFormItem())
    }

    deleteFormItem(index: number) : void {
            this.formItems.removeAt(index)
    }

    selectFile(form: FormGroup, event) {
        form.controls.file.setValue(event.target.files[0])
        form.controls.secondName.setValue(event.target.files[0].name)
    }

    sendFile(form) {
        var length = form.controls.formItems.length

        form.controls.formItems.controls.forEach((subForm, i) => {

            var file = subForm.controls.file.value
            var name = subForm.controls.secondName.value
            var progressId = this.createProgress(name)

            console.log(i, name, file)

            this.uploadService.uploadFile('/data/upload', file, name)
                .subscribe(
                    (event) => {
                        console.log(event)
                        if (event.type == HttpEventType.UploadProgress) {
                            var percent = Math.round(100 * event.loaded / event.total)
                            this.setProgressPercent(progressId, percent)
                        }
                    },
                    (err) => {
                        console.log('upload', name, err)
                        var errText = JSON.stringify(err)
                        this.noticesService.sendAlertMessage(`002 Error when upload ${name}: ${errText}`)
                    },
                    () => {
                        console.log(progressId, 'done')
                        this.noticesService.sendSuccessMessage(`Upload ${name} done`)

                    }
                )
        })
        this.createUploadForm()
    }

}
