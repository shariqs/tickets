import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Popup } from 'ng2-opd-popup';
import {AngularFire, FirebaseListObservable} from 'angularfire2';


@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit{


  availableListings : Event[] = [];

  constructor(
    public eventService: EventService, 
    private popup:Popup,
    private router: Router,
    private route: ActivatedRoute, 
    public af : AngularFire) { }

    private sub: any;
    private parentRouteId: number;
    private id: any;
    private idNum: number;
    private uid;
    
    
    
  ngOnInit() {

    this.af.auth.subscribe(x => {
      this.uid = x.uid;
    })
    
    this.sub = this.route.parent.params.subscribe(params => {
      this.id = +params["id"];
      console.log("this is the id (sell form):"+this.id);
      this.idNum = this.id;
    });

    this.eventService.activeEventData
    this.populateArray();
  }
  
  private ngDoCheck(){
    this.eventService.transactionInProgress = "buy";
  }

   showEvent(){
    this.popup.options = {
      cancleBtnClass: "btn btn-default",
      cancleBtnContent:"Cancel",
      confirmBtnClass: "btn btn-default",
  
      color: "#4180ab",
      header: "Your almost done.."
    }
    this.popup.show();
  }
  ConfirmEvent(){
    this.router.navigateByUrl('Transactions');
  }
  CancelEvent(){
    alert('Ticket was not purchased');
  }
  onClick(){
    this.eventService.transactionInProgress = 'browse';
    
  }



  //BAD CODE THIS NEEDS TO BE FIXED LATER THERE MUST BE SOME WAY TO LISTEN FOR CHANGES ON ACTIVEEVENT!
  populateArray(){
    //console.log(this.eventService.activeEventData.id + " FROM BUYCOMPONENT");
    if(this.eventService.activeEventData != undefined){
      this.af.database.list('Active_Listings/'+ this.eventService.activeEventData.id +'/').subscribe(allListings => {
        this.availableListings = allListings;
      });
    }
  }

  //gets number of tickets 

  toString(): string {
    for (var i = 0; i < this.availableListings.length; i++){
        this.eventService.activeEventData.addTicket();
    }
 return this.availableListings.length + "";
 
 }

  //gets number of sold tickets 

  getSoldTickets(): string{
     return this.eventService.activeEventData.getSoldT() + "";

  }


  private ngOnDestroy() {
      this.sub.unsubscribe(); 
  }


//THIS SHOULD NOT BE HERE IT SHOULD BE IN DATASERVICE BUT I HAVE NO ENERGY
  buyTicket(purchased){
    if(this.eventService.activeEventData != undefined){
          this.eventService.activeEventData.soldT()
      //Removes Listing from Active_Listings
      this.af.database.object('Active_Listings/'+ this.eventService.activeEventData.id +'/' + purchased.$key).remove();
      //Adds Listing to Completed_Transactions
      var info = this.af.database.list('Completed_Transactions/'+ this.eventService.activeEventData.id).push(purchased);
      //Adds Listing to Purchased for specific user
      this.af.database.list('Users/' + this.uid + '/Purchased/' + this.eventService.activeEventData.id).push(info.key);
      //Removes Listing from User's Active_Listing
      this.af.database.list('Users/' + this.uid + '/Active_Listings/' + this.eventService.activeEventData.id).subscribe(listings => {
        listings.forEach(listing => {
          if(listing.$value == purchased.$key){
            this.af.database.list('Users/' + this.uid + '/Active_Listings/' + this.eventService.activeEventData.id + "/"  + listing.$key).remove();
          }
        });
      });
      //Adds Listing to User's Sold
      this.af.database.list('/Users/' + this.uid + '/Sold/' + this.eventService.activeEventData.id).push(info.key);
  
      alert('sold');
    }
  }
}
