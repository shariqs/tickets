import { Component, OnInit } from '@angular/core';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-browse-menu',
  templateUrl: './browse-menu.component.html',
  styleUrls: ['./browse-menu.component.css']
})
export class BrowseMenuComponent{


  constructor(public eventService: EventService) { }




}
