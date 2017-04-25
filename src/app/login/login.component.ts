import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  auth: any;  // Instance of the User coming from app.component.
  user: any;

  // Saves angularFire object as variable "af" that can be used anywhere in the component
  constructor(public af: AngularFire) {

    /**
     * You can subscribe to certain variables.
     * What this does is that when this variable is changed in any way, it runs the following callback (bit of code).
     */
    this.af.auth.subscribe(authenticationValue => {
      this.auth = authenticationValue;
    });
    this.af.auth.subscribe(currentUser => {
      this.user = currentUser;
      console.log(this.user);
    })
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

  private getUserFullname(): string {
    return this.user.displayName;
  }

  private getUserEmailAddress(): string {
    return this.user.email;
  }

}
