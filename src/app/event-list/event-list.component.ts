import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { TicketInfoComponent} from '../ticket-info/ticket-info.component'
@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent {

  constructor(public eventService: EventService) {   }


  eventClicked(inc){
    this.eventService.activeEvent = inc.toString();
  } 
}
