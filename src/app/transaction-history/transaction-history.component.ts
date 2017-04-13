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
  purchased = [];
  sold = [];

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
            });
          })
        });
      });








    });

  }

  ngOnInit() {




  }

}
