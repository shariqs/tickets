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
    if(this.eventService.activeEventData != undefined ){
      this.af.database.list('Active_Listings/'+ this.eventService.activeEventData.id +'/').subscribe(allListings => {
        this.availableListings = allListings;
      });
    }
    else 
    return null
  }

  //gets number of tickets 

  toString(): string {
    if (this.availableListings.length == 0 ) return "Currently, there are no available tickets at this event" 
    else {
    for (var i = 0; i < this.availableListings.length; i++){
        this.eventService.activeEventData.addTicket();
    }
 return "Available tickets at this event: " + this.availableListings.length + " tickets";
    }
 }

prompt(): string {
  return
}




  //gets number of sold tickets 

 // getSoldTickets(){
     //eturn this.eventService.activeEventData.getSoldT();

  //}


  private ngOnDestroy() {
      this.sub.unsubscribe(); 
  }

  discount(cost: number): number {
   var p = cost;
   var f = cost;
   f = cost * .10;
   p = p + f;
   return p;
  }


//THIS SHOULD NOT BE HERE IT SHOULD BE IN DATASERVICE BUT I HAVE NO ENERGY
  buyTicket(purchased){
  var price = purchased.price;
  var fee = this.discount(price);
  var ppt = "Are you sure you want to buy this ticket?" +"\n"+ "Ticket Price: $" + price +"\n" + "Ticket Miester's Price: $" + fee;
  var text = "no";
  
  if (confirm( ppt) == true) {
      text = "yes";
    }
    else 
    {
      text = "no";
    }

    if (text == "yes"){

    if(this.eventService.activeEventData != undefined){
      
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
          else if (listing.$value == null) return null;
        });
      });
      //Adds Listing to User's Sold
      this.af.database.list('/Users/' + this.uid + '/Sold/' + this.eventService.activeEventData.id).push(info.key);
      alert('Ticket was purchased')
    }
    else return null; 

    }
    else 
       {
      console.log("user did not buy the ticket");
      alert('The ticket was not purchased');

       }
  }
}
