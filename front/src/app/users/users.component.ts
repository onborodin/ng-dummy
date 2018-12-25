import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { fadeAnimation } from '../app.animations'

import { User } from '../models/user.model'

@Component({
    selector: 'users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    animations: [ fadeAnimation ]
})
export class UsersComponent implements OnInit {

    list: User[] = []

    ngOnInit() {
    }

}
