import {HttpClient, HttpParams, HttpRequest, HttpEvent, HttpEventType, HttpResponse} from '@angular/common/http'
import { Component, OnInit } from '@angular/core'

import { FormGroup, FormControl, FormBuilder, FormArray, Validators,  ValidationErrors } from '@angular/forms'
import { Subject, Observable } from 'rxjs'

import { fadeAnimation, rotateAnimation } from '../app.animations'
import { NoticesService } from '../notices.service'
import { UploadService } from '../upload.service'


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


    // At the drag drop area
    // (drop)="onDropFile($event)"
    onDropFile(event: DragEvent) {
        event.preventDefault()
        this.uploadFile(event.dataTransfer.files)
    }

    // At the drag drop area
    // (dragover)="onDragOverFile($event)"
    onDragOverFile(event) {
        event.stopPropagation()
        event.preventDefault()
    }




    ngOnInit() {
        this.formItems = new FormArray([ this.createFormItem() ])
        this.uploadForm = new FormGroup({
            formItems: this.formItems
        })
    }

    createFormItem(): FormGroup {
        return new FormGroup({
            name: new FormControl(),
            description: new FormControl(),
            file: new FormControl()
        })
    }

    addFormItem() : void {
        //this.formItems = this.uploadForm.get('formItems') as FormArray
        this.formItems.push(this.createFormItem())
    }

    deleteFormItem(index: number) : void {
        if (this.formItems.length > 1) {
            this.formItems.removeAt(index)
        }
    }

    changeFormItem(form: FormGroup, event) {
        //form.controls['description'].setValue(form.value.name)
        //console.log('event', event)
    }

    // At the file input element
    // (change)="selectFile($event)"
    selectFile(form: FormGroup, event) {
        console.log('$event', event)
        form.controls['description'].setValue(event.target.files[0].name)
        form.controls['file'].setValue(event.target.files[0])
        //this.uploadFile(event.target.files)
    }

    sendFile(form) {
        console.log(form)
        var length = form.controls.formItems.length

        var files: any[] = []
        for (var i = 0; i < length; i++) {
            files.push(form.controls.formItems.controls[i].controls.file.value)
        }
        console.log(files)
    }

    uploadFile(files: FileList) {

        if (files.length == 0) {
            console.log("No file selected!")
            return

        }
        let file: File = files[0]

        this.uploadService.uploadFile('/data/upload', file)
            .subscribe(
                (event) => {
                    if (event.type == HttpEventType.UploadProgress) {
                        const percentDone = Math.round(100 * event.loaded / event.total)
                        console.log(`File is ${percentDone}% loaded.`)
                    } else if (event instanceof HttpResponse) {
                        console.log('File is completely loaded!')
                    }
                },
                (err) => {
                    console.log("Upload Error:", err)
                },
                () => {
                    console.log("Upload done")
                }
            )
    }



    /*
    <div [formGroup]="myGroup">
      <div formArrayName="cities">
        <div *ngFor="let city of cityArray.controls; index as i">
          <input [formControlName]="i">
        </div>
      </div>
    </div>

    this.cityArray = new FormArray([new FormControl('SF')]);
    this.myGroup = new FormGroup({
      cities: this.cityArray
    });
    */

}
