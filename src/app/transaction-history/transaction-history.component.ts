import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {
  isSwitched: boolean;
  currentStatus: String;
  event: any;


  uid;
  activeListings = [];
  activeTicketListings: Array<Ticket> = [];
 
  sold = [];
  soldTickets: Array<Ticket> = [];

  purchased = []
  purchasedTickets: Array<Ticket> = [];

  constructor(public eventService: EventService, public af: AngularFire) { 
    try {
      this.af.auth.subscribe(user => {
        this.uid = user.uid;

        //REALLY F'ING STUPID
        this.af.database.object('/Users/' + this.uid + '/Active_Listings/').subscribe(listings => {
          this.activeListings = []
          Object.keys(listings).forEach(ticket => {  
            Object.keys(listings[ticket]).forEach(item => {
              this.af.database.object('/Active_Listings/' + ticket + '/' + listings[ticket][item] + '/').subscribe(listing => {
                  this.activeListings.push(listing);
                  if(listing.eventName != null) this.activeTicketListings.push(new Ticket(listing.eventName, listing.price, listing.name, listing.date, listing.time, listings.longtitude, listings.latitude))
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
                  this.purchasedTickets.push(new Ticket(listing.eventName, listing.price, listing.name, listing.date, listing.time, listings.longtitude, listings.latitude))
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
                  this.soldTickets.push(new Ticket(listing.eventName, listing.price, listing.name, listing.date, listing.time,listings.longtitude, listings.latitude))
              });
            })
          });
        });
      });
    } catch (e) {
      alert('Please log in to your Google account');
    }
    this.isSwitched = false;
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

  private onClicked(event){
    console.log(event);
    this.event = event;
    this.isSwitched = true;
    this.checkDate(event);
  }

  private onBack(){
    this.isSwitched = false;
  }

  public checkDate(event){
    var today = new Date();
    var currentDay = today.getDate();
    var currentMonth = today.getMonth()+1;

    if(event.date != null){

      var temp1 = event.date.substring(5,7);
      var temp2 = event.date.substring(8,10);
      var eventMonth = +temp1;
      var eventDay = +temp2;

      if(currentMonth == eventMonth){
        if(currentDay == eventDay){this.currentStatus = "Today";}
        else if(currentDay > eventDay) {this.currentStatus = "Expired";}
        else if(currentDay < eventDay) {this.currentStatus =  "Upcoming";}
      }
      else if(currentMonth > eventMonth) {this.currentStatus = "Expired";}
      else if(currentMonth < eventMonth) {this.currentStatus = "Upcoming";}
      //handle old tickets without time stamp 
    }else {this.currentStatus = "Expired";}

  }


}

class Ticket {

  eventName: string;
  price: Number;
  buyer: string;
  date: string;
  time: string;
  sellerLongitude: number;
  sellerLatitude: number;

  constructor(eventName: string, price: Number, buyer: string, date: string, time: string, sellerLongitude: number , sellerLatitude: number ) {
    this.eventName = eventName;
    this.price = price;
    this.buyer = buyer;
    this.date = date;
    this.time = time;
    this.sellerLongitude = sellerLongitude;
    this.sellerLatitude = sellerLatitude;
  }

  public toString() {
    return this.eventName + ", $" + this.price + ", " + this.buyer;
  }
}
