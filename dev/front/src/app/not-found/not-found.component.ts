import { Component } from '@angular/core';
import { fadeAnimation } from '../app.animations'

@Component({
  selector: 'not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
    animations: [ fadeAnimation ]
})
export class NotFoundComponent {

}
