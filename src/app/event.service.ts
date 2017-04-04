import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Http } from '@angular/http';



@Injectable()
export class EventService {

      public eventList = [];
      public activeEvent; 

      public transactionInProgress = "browse";
      constructor(public http: Http) { this.getEventFromLocalArea(); }

      getEventFromLocalArea() {
            var eventData: any = this.http.get('http://api.songkick.com/api/3.0/events.json?location=geo:37.3382,-121.8863&apikey=147UvqDDrnGJk7nh');
            eventData.subscribe(info => {
                  let response = JSON.parse(info._body);
                  this.eventList = (response.resultsPage.results.event);
            })

      }






}
