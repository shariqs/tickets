import { Component, NgModule, NgZone, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AgmCoreModule, MapsAPILoader } from 'angular2-google-maps/core';
import { EventService } from '../event.service';
import { ActivatedRoute, Router  } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {

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
}
