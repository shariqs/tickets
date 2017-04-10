import { Component, OnInit } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';


@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  items: FirebaseListObservable<any>;
  constructor(af: AngularFire) {
    this.items = af.database.list('/items');
  }

  ngOnInit() {
  }

}
