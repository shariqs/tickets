import { Component } from '@angular/core';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

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