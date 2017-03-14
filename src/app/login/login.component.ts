import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  auth: any;  // Instance of the User coming from app.component.


  // Saves angularFire object as variable "af" that can be used anywhere in the component
  constructor(public af: AngularFire) {

    /**
     * You can subscribe to certain variables.
     * What this does is that when this variable is changed in any way, it runs the following callback (bit of code).
     */
    this.af.auth.subscribe(authenticationValue => {
      this.auth = authenticationValue;
    });
  }

  /**
   * Logs in through Google.
   */
  private loginGoogle() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    });
  }

// Logout button
  private logout() {
    this.af.auth.logout();
  }

}
