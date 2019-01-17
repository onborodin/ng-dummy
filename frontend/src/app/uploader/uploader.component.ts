import { HttpClient, HttpParams, HttpRequest, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http'
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
    selector: 'uploader',
    templateUrl: './uploader.component.html',
    styleUrls: [ './uploader.component.scss' ],
    animations: [ fadeAnimation, rotateAnimation ]
})
export class UploaderComponent implements OnInit {

    uploadForm: FormGroup
    formItems: FormArray

    constructor(
        public noticesService: NoticesService,
        public uploadService: UploadService,
        public formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.createUploadForm()
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
        if (control.value.size > 320 * 1024 * 1024) {
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

            this.uploadService.uploadFile('/data/upload', file, name)
        })
        this.createUploadForm()
    }
}
