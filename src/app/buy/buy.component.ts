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


  private ngOnDestroy() {
      this.sub.unsubscribe(); 
  }


}
