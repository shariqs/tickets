/// <reference path="../../../typings/index.d.ts" />
import { Component, NgModule, NgZone, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AgmCoreModule, MapsAPILoader } from 'angular2-google-maps/core';
import { EventService } from '../event.service';
import { ActivatedRoute, Router  } from '@angular/router';
import { DataService } from '../data.service';
@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})



export class SellComponent implements OnInit {
  
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public price: number;
  public zoom: number;
  private id: any;
  private idNum: number;
  private sub: any;
  private activeEvent: Event;

  @ViewChild("search")
  public searchElementRef: ElementRef;
  
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public eventService: EventService,
    private route: ActivatedRoute, 
    private router: Router,
    public dataService: DataService
  ) { }
  
  ngOnInit() {
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    this.sub = this.route.parent.params.subscribe(params => {
      this.id = +params["id"];
      this.idNum = this.id;
    });
    
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
  }

  private ngDoCheck(){
    this.eventService.transactionInProgress = "sell";
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

  onBack(){
    this.eventService.transactionInProgress = 'browse';
  }
  
  onSubmit(){
    if(this.eventService.activeEventData != null ) {
      if ( this.price != null && this.longitude != null && this.latitude != null && this.price != 0){
        this.dataService.addTicketListing(
        this.longitude,
        this.latitude,
        this.price, 
        this.eventService.activeEventData,
        this.eventService.activeEventData.displayName,
        this.eventService.activeEventData.date,
        this.eventService.activeEventData.time
);
      this.router.navigateByUrl('/billings');
      }
      else alert("the form was not correclty filled out");
    } else {
      // error 160: occurs when on Sell page and got refreshed
      // => can't get the event ID
      // => thefor can't register with Selling
      alert("Error code: 160. Redirecting..");
      this.router.navigateByUrl('/Browse');
      location.reload();
    }
  }
  private ngOnDestroy(){
    this.sub.unsubscribe();
  }
}


