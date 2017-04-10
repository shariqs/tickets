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
export class BuyComponent{

  constructor(public eventService: EventService, private popup:Popup, private router: Router, private route: ActivatedRoute) { }
    private sub: any;
    private parentRouteId: number;
    private id: any;
    private idNum: number;
  

  ngOnInit() {
      this.sub = this.route.parent.params.subscribe(params => {
      this.id = +params["id"];
      console.log("this is the id (buy form):"+this.id);
      this.idNum = this.id;
    });

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

  private ngOnDestroy() {
      this.sub.unsubscribe(); 
  }
}
