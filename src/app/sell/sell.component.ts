/// <reference path="../../../typings/index.d.ts" />
import { Component, NgModule, NgZone, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AgmCoreModule, MapsAPILoader } from 'angular2-google-maps/core';
import { EventService } from '../event.service';
import { ActivatedRoute, Router  } from '@angular/router';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})



export class SellComponent implements OnInit {
  
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  private id: any;
  private idNum: number;
  private sub: any;
  
  @ViewChild("search")
  public searchElementRef: ElementRef;
  
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public eventService: EventService,
    private route: ActivatedRoute, 
    private router: Router
  ) { }
  
  ngOnInit() {
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;
    
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

    this.sub = this.route.parent.params.subscribe(params => {
      this.id = +params["id"];
      console.log("this is the id2:"+this.id);
      this.idNum = this.id;
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

  onClick(){
    this.router.navigate(['/Browse']);
    this.eventService.transactionInProgress = 'browse';
  }

  private ngOnDestroy(){
    this.sub.unsubscribe();
  }
}

