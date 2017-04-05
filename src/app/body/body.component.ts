import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { EventService } from '../event.service';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styles: [`./body.component.css`],
})

export class BodyComponent {
  // <a routerLink="menus" routerLinkActive="active">next page</a>
  /**
   *   <footer class="container-fluid text-center">
      <p>Footer Text</p>
      </footer>
   */
public view;

  constructor(public af: AngularFire) {
    af.auth.subscribe(auth => {
      if (auth == null) {
        this.view = "splash";
      } else {
        this.view = "browse";
      }
    });
  }
}

