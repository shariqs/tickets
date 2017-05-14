import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { AngularFire } from 'angularfire2';
import { DataService } from '../data.service';


@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {
  isSwitched: boolean;
  currentStatus: String;
  currentETA: any;
  checkString: String;
  event: any;


  uid;
  activeListings = [];
  activeTicketListings: Array<Ticket> = [];
 
  sold = [];
  soldTickets: Array<Ticket> = [];

  purchased = []
  purchasedTickets: Array<Ticket> = [];

  constructor(public eventService: EventService, public af: AngularFire, public dataService: DataService) { 
    try {
      this.af.auth.subscribe(user => {
        this.uid = user.uid;

        this.af.database.object('/Users/' + this.uid + '/Active_Listings/').subscribe(listings => {
          try{
            this.activeListings = []
            Object.keys(listings).forEach(ticket => {  
              Object.keys(listings[ticket]).forEach(item => {
                this.af.database.object('/Active_Listings/' + ticket + '/' + listings[ticket][item] + '/').subscribe(listing => {
                    this.activeListings.push(listing);
                    this.activeTicketListings.push(new Ticket(listing.eventName, listing.price, listing.name, listing.date, listing.time, listing.purchasedTime, listing.sellerLongitude, listing.sellerLatitude,listing.buyerLongitude,listing.buyerLatitude))
                });
              })
            });
         } catch(e){console.log("EMPTIED");}
        });

        ///
        this.af.database.object('/Users/' + this.uid + '/Purchased/').subscribe(listings => {
          try{
            this.purchased = []
            Object.keys(listings).forEach(ticket => {  
              Object.keys(listings[ticket]).forEach(item => {
                this.af.database.object('/Completed_Transactions/' + ticket + '/' + listings[ticket][item] + '/').subscribe(listing => {
                    this.purchased.push(listing);
                    this.purchasedTickets.push(new Ticket(listing.eventName, listing.price, listing.name, listing.date, listing.time,listing.purchasedTime, listing.sellerLongitude, listing.sellerLatitude,listing.buyerLongitude,listing.buyerLatitude))
                });
              })
            });
          }catch(e){console.log("EMPTIED");}
        });

        this.af.database.object('/Users/' + this.uid + '/Sold/').subscribe(listings => {
          try{
            this.sold = []
            Object.keys(listings).forEach(ticket => {  
              Object.keys(listings[ticket]).forEach(item => {
                this.af.database.object('/Completed_Transactions/' + ticket + '/' + listings[ticket][item] + '/').subscribe(listing => {
                    this.sold.push(listing);
                    this.soldTickets.push(new Ticket(listing.eventName, listing.price, listing.name, listing.date, listing.time, listing.purchasedTime, listing.sellerLongitude, listing.sellerLatitude,listing.buyerLongitude,listing.buyerLatitude))
                });
              })
            });
          } catch(e){console.log("EMPTIED");}
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

  private onClicked(event,check){
    this.event = event;
    this.isSwitched = true;
    this.checkDate(event);
    if(check == 1) {this.checkString = "(To buyer's location)";}
    else if(check ==2) {this.checkString = "(To your location)";}
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

    this.currentETA = this.dataService.getETA(event);
    console.log(this.currentETA);

  }


}

class Ticket {

  eventName: string;
  price: Number;
  seller: string;
  date: string;
  time: string;
  purchasedTime: string;
  sellerLongitude: number;
  sellerLatitude: number;
  buyerLongitude: number;
  buyerLatitude: number;

  constructor(eventName: string, price: Number, seller: string, date: string, time: string, purchasedTime: string, sellerLongitude: number , sellerLatitude: number, buyerLongitude:number, buyerLatitude: number ) {
    this.eventName = eventName;
    this.price = price;
    this.seller = seller;
    this.date = date;
    this.time = time;
    this.purchasedTime = purchasedTime;
    this.sellerLongitude = sellerLongitude;
    this.sellerLatitude = sellerLatitude;
    this.buyerLongitude = buyerLongitude;
    this.buyerLatitude = buyerLatitude;
  }

  public toString() {
    return this.eventName + ", $" + this.price + ", " + this.seller;
  }
}
