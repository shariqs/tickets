import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-purchased-history',
  templateUrl: './purchased-history.component.html',
  styleUrls: ['./purchased-history.component.css']
})
export class PurchasedHistoryComponent implements OnInit {

   uid;

  purchased = [];
  purchaseTickets: Array<Ticket>;
  

  constructor(public eventService: EventService, public af: AngularFire) {
    this.af.auth.subscribe(user => {
      this.uid = user.uid;

    

        this.af.database.object('/Users/' + this.uid + '/Purchased/').subscribe(listings => {
        this.purchased = []
        Object.keys(listings).forEach(ticket => {  
          Object.keys(listings[ticket]).forEach(item => {
            this.af.database.object('/Completed_Transactions/' + ticket + '/' + listings[ticket][item] + '/').subscribe(listing => {
                this.purchased.push(listing);

                this.purchaseTickets.push(new Ticket(listing.eventName, listing.price, listing.name))
            });
          })
        });
      });


    });

    
  }

  ngOnInit() {
  }


}

class Ticket {

  eventName: string;
  price: Number;
  owner: string;

  constructor(eventName: string, price: Number, owner: string) {
    this.eventName = eventName;
    this.price = price;
    this.owner = owner;
  }

  public toString() {
    return this.eventName + ", $" + this.price + ", " + this.owner;
  }
}
