import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { AppHeaderComponent } from '../app-header/app-header.component'
import { AppFooterComponent } from '../app-footer/app-footer.component'

import { LoginService } from '../login.service'

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    constructor(
        private router: Router,
        private loginService: LoginService
    ) {}

    ngOnInit() {
        this.loginService.checkSuperuser()
    }
}

