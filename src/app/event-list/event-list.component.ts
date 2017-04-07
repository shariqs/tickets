import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { TicketInfoComponent} from '../ticket-info/ticket-info.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent {

  private id: number;
  private sub: any;

  constructor(public eventService: EventService, private route: ActivatedRoute, private router: Router) {   }

  private ngOnInit(){
    this.sub = this.route.params.subscribe(params => {
      this.id += params['id'];
    })
  }

  private ngOnDestroy(){
    this.sub.unsubscribe();
  }

  eventClicked(inc){
    this.eventService.activeEvent = inc.toString();
  } 
}
