import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router'

import { AppHeaderComponent } from '../app-header/app-header.component'
import { AppFooterComponent } from '../app-footer/app-footer.component'

import { LoginService } from '../login.service'

@Component({
  selector: 'domain',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.scss']
})
export class DomainsComponent implements OnInit {

    constructor(
        private router: Router,
        private loginService: LoginService
    ) {}

    ngOnInit() {
        this.loginService.check()
    }
}

