import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Popup } from 'ng2-opd-popup';


@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent{

  constructor(public eventService: EventService, private popup:Popup, private router: Router, private route: ActivatedRoute) { }
    private sub: any;
    private parentRouteId: number;

    ngOnInit() {
        this.sub = this.route.parent.params.subscribe(params => {
            this.parentRouteId = +params["id"];
        });

    }
    
    ngOnDestroy() {
      this.sub.unsubscribe();


    }

   showEvent(){
    this.popup.options = {
      cancleBtnClass: "btn btn-default",
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



}
