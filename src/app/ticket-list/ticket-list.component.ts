import { Component, OnInit } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { EventService } from '../event.service';



@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

   uid;
  activeListings = [];
  
   constructor(public eventService: EventService, public af: AngularFire) {
   this.af.auth.subscribe(user => {
      this.uid = user.uid;


 if(this.eventService.activeEventData != undefined){
  this.af.database.object('/Active_Listings/' + this.uid ).subscribe(listings => {
        this.activeListings = []
        Object.keys(listings).forEach(ticket => {  
          
        });
      });

 }
 else return "NA";

   });

}

 ngOnInit() {
  }

}