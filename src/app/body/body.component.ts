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

  clicked4(){
    var testDate = "21:00:00";
    var eventHour = parseInt(testDate.substring(0,2));
    var eventMin = parseInt(testDate.substring(3,5));

    var today = new Date();

    var currentDay = today.getDate();
    var currentMonth = today.getMonth()+1;
    var currentHour = today.getHours();
    var currentMin = today.getMinutes();

    var stringDay = currentDay.toString();
    var stringMonth = currentMonth.toString();
    var stringHour = currentHour.toString();
    var stringMin = currentMin.toString();

    //change to standard formatting
    if(currentDay < 10) stringDay = "0" + stringDay;
    if(currentMonth < 10) stringMonth = "0" + stringMonth;
    if(currentHour < 10) stringHour = "0" + stringHour;
    if(currentMin < 10) stringMin = "0" + stringMin;

    var getTime = stringDay + stringMonth + stringHour + stringMin;

  }
}

