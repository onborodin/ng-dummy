import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { RPCService, RPCResponce, RPCError } from '../rpc.service'
import { UsersService } from '../users.service'

import { User } from '../models/user.model'

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

    list: User[] = []

    constructor(
        private usersService: UsersService,
    ) {}

    ngOnInit() {
        //this.rpc
        //    .request<null, User[]>('/api/users', 'list', null)
        //    .subscribe((res: RPCResponce<User[]>) => {
        //        this.list = res.result
        //    })
        this.usersService
            .list()
            .subscribe((res: RPCResponce<User[]>) => {
                this.list = res.result
            })
    }
}
