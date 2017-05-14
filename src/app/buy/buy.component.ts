/// <reference path="../../../typings/index.d.ts" />
import { EventService } from '../event.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Popup } from 'ng2-opd-popup';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { DataService } from '../data.service';
import { AgmCoreModule, MapsAPILoader } from 'angular2-google-maps/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Component, NgModule, NgZone, OnInit, ViewChild, ElementRef } from '@angular/core';




@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit{


  availableListings : Event[] = [];
  private sub: any;
  private parentRouteId: number;
  private id: any;
  private idNum: number;
  private uid;
  private uid_seller;
  private isConfirmed: boolean;
  private price;
  private fee;
  private totalPrice;
  private event;
  public searchControl: FormControl;
  public latitude: number;
  public longitude: number;
  public zoom: number;
  public time: String;

  @ViewChild("search")
  public searchElementRef: ElementRef;


  constructor(
    public eventService: EventService, 
    private popup:Popup,
    private router: Router,
    private route: ActivatedRoute, 
    public af : AngularFire,
    public dataService: DataService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    ) { 
      this.isConfirmed = false;
    }
    
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
  onClick2(){
    this.isConfirmed = false;
  }
  onClick3(){
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

    var time = stringDay + stringMonth + stringHour + stringMin;
    console.log(this.latitude);
    console.log(this.longitude);
    this.event["purchasedTime"] = time;
    this.event["buyerLatitude"] = this.latitude;
    this.event["buyerLongitude"] = this.longitude;
    this.dataService.buyTicket(this.event,this.eventService,this.uid_seller,this.router);
  }
  checkConfirm(purchased){
    this.price = purchased.price;
    this.fee = this.discount(purchased.price);
    this.totalPrice = this.price + this.fee;
    this.isConfirmed = true;
    this.event = purchased;
    this.zoom = 4;
    this.latitude;
    this.longitude;

    //create search FormControl
    this.searchControl = new FormControl();
    
    //set current position
    this.setCurrentPosition();
    
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
    //get the time of purchase made 

  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
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

     if (this.availableListings.length == 0 || null ) return "Currently, there are no available tickets at this event" 
    else {
    for (var i = 0; i < this.availableListings.length; i++){
        this.eventService.activeEventData.addTicket();
    }
 return "Available tickets at this event: " + this.availableListings.length + " tickets";
    }
 }




  //gets number of sold tickets 

 // getSoldTickets(){
     //eturn this.eventService.activeEventData.getSoldT();

  //}


  private ngOnDestroy() {
      this.sub.unsubscribe(); 
  }

  public discount(cost: number): number {
   var p = cost;
   var f = cost;
   f = cost * .10;
   p = p + f;
   return p;
  }

}
