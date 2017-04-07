import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-info',
  templateUrl: './ticket-info.component.html',
  styleUrls: ['./ticket-info.component.css']
})
export class TicketInfoComponent {

  private id: any;
  private idNum: number;
  private sub: any;

  constructor(public eventService: EventService, private route: ActivatedRoute, private router: Router) { }

  private ngOnInit(){
    this.sub = this.route.params.subscribe(params => {
      this.id += params['id'];
      this.idNum = +this.id.toString().replace( /^\D+/g, '');
      console.log('this is the id: '+this.idNum);
    })
  }
  private ngDoCheck(){
    if(this.idNum > 0){
        //loop to pick the event base on id
        for(let event of this.eventService.eventDetailsList){
          var temp = +event.id.toString();
          if(this.idNum == temp){
            console.log('found');
            this.eventService.activeEvent = event.toString();
            break;
          }else { console.log('error'); }
        }
      }else if(this.idNum != 0){
        this.router.navigate['/Info'];
      }
  }

  private ngOnDestroy(){
    this.sub.unsubscribe();
  }

  buyButtonClicked(){
    this.eventService.transactionInProgress = 'buy';
  }

  sellButtonClicked(){
    this.eventService.transactionInProgress = 'sell';
  }


}
