import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { fadeAnimation } from '../app.animations'

import { RPCService, RPCResponce, RPCError } from '../rpc.service'
import { UsersService } from '../users.service'
import { User } from '../models/user.model'

interface Modal {
    name: string
    active: boolean
}

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    animations: [ fadeAnimation ]
})
export class UsersComponent implements OnInit {

    list: User[] = []

    modalList: Modal[] = [
        { name: 'list', active: true },
        { name: 'create', active: false },
        { name: 'update', active: false },
        { name: 'drop', active: false },
    ]

    constructor(
        private usersService: UsersService,
    ) {}

    updateItem(item: User) {
    }

    dropItem(item: User) {
    }

    createItem() {
    }

    getList() {
        this.usersService
            .list()
            .subscribe((res: RPCResponce<User[]>) => {
                this.list = res.result
            })
    }

    ngOnInit() {
        this.getList()
    }
}
