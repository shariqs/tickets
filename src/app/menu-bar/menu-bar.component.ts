import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})

export class MenuBarComponent {
    constructor(public eventService: EventService, private router: Router) { }

    menuItems = ['Browse'];
    
    onClick(){
      this.eventService.transactionInProgress = 'browse';
      this.eventService.activeEvent = null;
    }
}
