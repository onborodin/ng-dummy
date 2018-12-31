import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Subject, Observable } from 'rxjs'


import { fadeAnimation } from '../app.animations'

import { RPCService, RPCResponce, RPCError } from '../rpc.service'
import { UsersService } from '../users.service'
import { User } from '../models/user.model'

export enum Form {
    all = 0,
    createUser = 1,
    updateUser = 2,
    dropUser = 3
}

export enum Action {
    closeAll = 0,
    open = 1,
    close = 2
}

export interface Event {
    destination: Form
    action: Action
}

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    animations: [ fadeAnimation ]
})
export class UsersComponent implements OnInit {

    users: User[] = []
    subject: Subject<Event>

    constructor(private usersService: UsersService) {
        this.subject = new Subject<Event>()
    }

    createUser() {
        this.subject.next({ 
            destination: Form.createUser,
            action: Action.open 
        })
    }

    getList() {
        this.usersService
            .list()
            .subscribe((res: RPCResponce<User[]>) => {
                this.users = res.result
            })
    }

    ngOnInit() {
        this.getList()
    }
}
