import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {
  uid;
  activeListings = [];
  activeTicketListings: Array<Ticket> = [];
  purchased = [];
  purchaseTickets: Array<Ticket>;
  sold = [];
  soldTickets: Array<Ticket>;

  constructor(public eventService: EventService, public af: AngularFire) {
    this.af.auth.subscribe(user => {
      this.uid = user.uid;

      //REALLY F'ING STUPID
      this.af.database.object('/Users/' + this.uid + '/Active_Listings/').subscribe(listings => {
        this.activeListings = []
        Object.keys(listings).forEach(ticket => {  
          Object.keys(listings[ticket]).forEach(item => {
            this.af.database.object('/Active_Listings/' + ticket + '/' + listings[ticket][item] + '/').subscribe(listing => {
                this.activeListings.push(listing);
                this.activeTicketListings.push(new Ticket(listing.eventName, listing.price, listing.name))
            });
          })
        });
      });

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

        this.af.database.object('/Users/' + this.uid + '/Sold/').subscribe(listings => {
        this.sold = []
        Object.keys(listings).forEach(ticket => {  
          Object.keys(listings[ticket]).forEach(item => {
            this.af.database.object('/Completed_Transactions/' + ticket + '/' + listings[ticket][item] + '/').subscribe(listing => {
                this.sold.push(listing);
                this.soldTickets.push(new Ticket(listing.eventName, listing.price, listing.name))
            });
          })
        });
      });

    });

    
  }

  /*getActiveEventListings() {
    for (var ticket in this.activeListings) {
      for (var item in ticket) {
        var listing = this.activeListings[ticket][item];
        var owner = JSON.stringify(listing.owner).replace(/\"/g, '');
        var price = JSON.stringify(listing.price).replace(/\"/g, '');
        this.activeTicketListings.push( new Event("null", parseInt(price), owner));
      }
    }
  }*/

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
