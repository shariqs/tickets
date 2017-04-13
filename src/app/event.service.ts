import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Http } from '@angular/http';



@Injectable()
export class EventService {

      public eventList = [];
      public eventStringList = [];
      public activeEvent: string;
      public eventDetailsList: Event[] = [];
      public eventListModel: Event[] = [];

      public transactionInProgress = "browse";
      constructor(public http: Http) { this.getEventFromLocalArea(); }

      getEventFromLocalArea() {
            var eventData: any = this.http.get('http://api.songkick.com/api/3.0/events.json?location=geo:37.3382,-121.8863&apikey=147UvqDDrnGJk7nh');
            eventData.subscribe(info => {
                  let response = JSON.parse(info._body);
                  this.eventList = (response.resultsPage.results.event);

                  
                  var i = 0;
                  for (var j in this.eventList) {
                        var event = this.eventList[j]
                        var name = JSON.stringify(event.displayName).replace(/\"/g, '');
                        name = name.substring(0, name.indexOf("(") - 1);
                        var venue = JSON.stringify(event.venue.displayName).replace(/\"/g, '');
                        var city = JSON.stringify(event.location.city).replace(/\"/g, '');
                        var date = JSON.stringify(event.start.date).replace(/\"/g, '');
                        var time = JSON.stringify(event.start.time).replace(/\"/g, '');
                        var id = new Number(JSON.stringify(event.id));
                        this.eventDetailsList[j] = new Event(name, venue, date, time, city, id);

                  }
                  this.eventListModel = this.eventDetailsList;
                  console.log(this.eventListModel)
            });
      }

      search(searchTerm: string) {
            if (searchTerm != null)
                  this.eventListModel = this.eventDetailsList.filter(event => event.displayName.toLowerCase().includes(searchTerm.toLowerCase()));
            console.log(this.eventListModel)
      }

}

class Event {
      displayName: string;
      venue: string;
      date: string;
      time: string;
      city: string;
      id: Number;

      constructor(displayName: string, venue: string, date: string, time: string, city: string, id: Number) {
            this.displayName = displayName;
            this.venue = venue;
            this.date = date;
            this.time = time;
            this.city = city;
            this.id = id;
      }

      toString(): string {

            return "Event Name: " + this.displayName + ";" + 
                   "Venue: "      + this.venue + ";" +
                   "Date & Time: "       + this.time + ", " + this.date + ";" + 
                   "City: "       + this.city
      }
}