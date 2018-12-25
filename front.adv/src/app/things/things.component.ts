import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router'


import { AppHeaderComponent } from '../app-header/app-header.component'
import { AppFooterComponent } from '../app-footer/app-footer.component'

import { ThingCreateComponent } from '../thing-create/thing-create.component'
import { ThingUpdateComponent } from '../thing-update/thing-update.component'
import { ThingDropComponent } from '../thing-drop/thing-drop.component'
import { ThingCardComponent } from '../thing-card/thing-card.component'

import { RPCService, RPCResponce, RPCError } from '../rpc.service'
import { ThingsService } from '../things.service'
import { Thing } from '../models/thing.model'

import { fadeAnimation } from '../app.animations'

@Component({
    selector: 'things',
    templateUrl: './things.component.html',
    styleUrls: ['./things.component.scss'],
    animations: [ fadeAnimation ]
})
export class ThingsComponent implements OnInit {

    showCreateForm: boolean = false
    showUpdateForm: boolean = false
    showDropForm: boolean = false
    showListRecords: boolean = true
    showItemCard: boolean = false

    firstElem: number = 0
    pageSize: number = 5
    elemNumList: number[] = []

    list: Thing[] = []

    currentThing : Thing = {
        id: -1,
        name: '',
    }

    constructor(
        private thingsService: ThingsService,
    ) {}

    changePage(eventData) {
        this.setFirstElem(eventData)
    }

    changePageSize(size: number) {
        this.pageSize = size
        var list: number[] = []
        for (var i: number = this.firstElem; i < (this.firstElem + this.pageSize) && i < this.list.length; i += 1) {
            list.push(i)
        }
        this.elemNumList = list
    }

    setFirstElem(num: number) {
        var list: number[] = []
        this.firstElem = num
        for (var i: number = this.firstElem; i < (this.firstElem + this.pageSize) && i < this.list.length; i += 1) {
            list.push(i)
        }
        this.elemNumList = list
    }

    dropItem(item: Thing) {
        this.currentThing = item
        this.showDrop()
    }

    updateItem(item: Thing) {
        this.currentThing = item
        this.showUpdate()
    }

    showItem(item: Thing) {
        this.currentThing = item
        this.showCard()
    }


    getList() {
        this.thingsService
            .list()
            .subscribe((res: RPCResponce<Thing[]>) => {
                this.list = res.result
                this.setFirstElem(0)
            })
    }

    ngOnInit() {
        this.getList()
        this.setFirstElem(0)
    }

    escapeForm() {
        this.showList()
    }

    successForm($event) {
        this.getList()
        this.showList()
    }

    showCreate() {
        this.showCreateForm = true
        this.showUpdateForm = false
        this.showDropForm = false
        this.showListRecords = false
        this.showItemCard = false
    }

    showUpdate() {
        this.showCreateForm = false
        this.showUpdateForm = true
        this.showDropForm = false
        this.showListRecords = false
        this.showItemCard = false
    }

    showDrop() {
        this.showCreateForm = false
        this.showUpdateForm = false
        this.showDropForm = true
        this.showListRecords = false
        this.showItemCard = false
    }

    showList() {
        this.showCreateForm = false
        this.showUpdateForm = false
        this.showDropForm = false
        this.showListRecords = true
        this.showItemCard = false
    }

    showCard() {
        this.showCreateForm = false
        this.showUpdateForm = false
        this.showDropForm = false
        this.showListRecords = true
        this.showItemCard = true
    }
}
