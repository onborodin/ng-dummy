import { Component, OnInit } from '@angular/core';

import { AppHeaderComponent } from '../app-header/app-header.component'
import { AppFooterComponent } from '../app-footer/app-footer.component'


@Component({
  selector: 'not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  ngOnInit() {
  }

}
