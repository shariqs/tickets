import { Component, OnInit } from '@angular/core';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-transaction-menu',
  templateUrl: './transaction-menu.component.html',
  styleUrls: ['./transaction-menu.component.css']
})
export class TransactionMenuComponent implements OnInit {

  isAvailable: false;
  constructor(public eventService: EventService) {   }
  


  ngOnInit() {
  }

}
