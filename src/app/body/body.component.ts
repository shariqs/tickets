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

  constructor(public af: AngularFire, public dataService:DataService) {
    af.auth.subscribe(auth => {
      if (auth == null) {
        this.view = "splash";
      } else {
        this.view = "browse";
      }
    });
  }

  clicked(){
     var address = "Some street";
     var city = "COVINGTON";
     var zipCode = 988888;
     this.dataService.addAddress(address, city, zipCode);
  }

  clicked2(){
     var number = 1233444422223334;
     var code = 123;
     var month = 12;
     var year = 1231;

     this.dataService.addCreditCard(number, code, month, year);
  }

  clicked3(){
    this.dataService.removeOldEvents();
  }
}

