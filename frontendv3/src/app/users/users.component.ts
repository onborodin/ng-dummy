import { Component, OnInit, OnDestroy } from '@angular/core';

import { AppHeaderComponent } from '../app-header/app-header.component'
import { AppFooterComponent } from '../app-footer/app-footer.component'

import { UsersListComponent } from '../users-list/users-list.component'

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    ngOnInit() {
    }
}

