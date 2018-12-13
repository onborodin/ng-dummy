import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'

import { AppHeaderComponent } from '../app-header/app-header.component'
import { AppFooterComponent } from '../app-footer/app-footer.component'

import { UserCreateComponent } from '../user-create/user-create.component'

import { RPCService, RPCResponce, RPCError } from '../rpc.service'
import { UsersService } from '../users.service'
import { User } from '../models/user.model'

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    showCreateForm: boolean = false
    showUpdateForm: boolean = false
    showDropForm: boolean = false
    showListRecords: boolean = true

    list: User[] = []

    currentUser : User = {
        id: -1,
        name: '',
        password: '',
        gecos: ''
    }

    constructor(
        private usersService: UsersService,
    ) {}

    dropItem(item: User) {
        console.log(item)
    }

    updateItem(item: User) {
        console.log({updateItem: item})
        this.currentUser = item
        this.showUpdate()
    }

    ngOnInit() {
        this.usersService
            .list()
            .subscribe((res: RPCResponce<User[]>) => {
                this.list = res.result
            })
    }

    escapeForm() {
        this.showList()
    }

    showCreate() {
        this.showCreateForm = true
        this.showUpdateForm = false
        this.showDropForm = false
        this.showListRecords = false
    }

    showUpdate() {
        this.showCreateForm = false
        this.showUpdateForm = true
        this.showDropForm = false
        this.showListRecords = false
    }

    showDrop() {
        this.showCreateForm = false
        this.showUpdateForm = false
        this.showDropForm = true
        this.showListRecords = false
    }

    showList() {
        this.showCreateForm = false
        this.showUpdateForm = false
        this.showDropForm = false
        this.showListRecords = true
    }

}



