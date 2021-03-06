import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';
import { Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  auth: any;  // Instance of the User coming from app.component.
  user: any;
  userName: String;

  // Saves angularFire object as variable "af" that can be used anywhere in the component
  constructor(public af: AngularFire, private router: Router) {

    /**
     * You can subscribe to certain variables.
     * What this does is that when this variable is changed in any way, it runs the following callback (bit of code).
     */
    this.af.auth.subscribe(authenticationValue => {
      this.auth = authenticationValue;
    });
    
      this.af.auth.subscribe(currentUser => {
        if(currentUser != null){
          this.user = currentUser.google;
          this.userName = this.user.displayName;
        }
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
    alert('Please refresh after sign in!');
  }

// Logout button
  private logout() {
    this.af.auth.logout();
    this.router.navigateByUrl('/Browse');
    location.reload();
  }

  

}
