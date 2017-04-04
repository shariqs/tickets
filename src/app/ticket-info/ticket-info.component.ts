import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-ticket-info',
  templateUrl: './ticket-info.component.html',
  styleUrls: ['./ticket-info.component.css']
})
export class TicketInfoComponent {

  constructor(public eventService: EventService) { }

  buyButtonClicked(){
    this.eventService.transactionInProgress = 'buy';
  }

  sellButtonClicked(){
    this.eventService.transactionInProgress = 'sell';
  }


}
