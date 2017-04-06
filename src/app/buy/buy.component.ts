import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent{

  constructor(public eventService: EventService, private router: Router, private route: ActivatedRoute) { }
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
}
