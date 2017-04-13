import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Http } from '@angular/http';



@Injectable()
export class EventService {

      public eventList = [];
      public eventStringList = [];
      public activeEvent: string;
      public activeEventData: Event;
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
                   "Time & Date: "       + this.time + ", " + this.getMonth(this.date) + " " + this.getDay(this.date) + ", " + this.getYear(this.date) + ";" + 
                   "City: "       + this.city
      }
      getYear(date: string) : string {
            return date.substring(0, 4);
      }

      getDay(date: string) : string {
            var day = date.substring(8);
            var dayInt = parseInt(day);
            if (dayInt == 1) {
                  day = day.concat("st");
            } else if (dayInt == 2) {
                  day = day.concat("nd");
            } else if (dayInt == 3) {
                  day = day.concat("rd");
            } else {
                  day = day.concat("th");
            }
            return day;
      }

      getMonth(date: string) : string {
            var month = date.substring(5, 7);
            switch (month) {
                  case '01' :{
                        month = "January";
                        break;
                  }
                  case '02' :{
                        month = "February";
                        break;
                  }
                  case '03' :{
                        month = "March";
                        break;
                  }
                  case '04' :{
                        month = "April";
                        break;
                  }
                  case '05' :{
                        month = "May";
                        break;
                  }
                  case '06' :{
                        month = "June";
                        break;
                  }
                  case '07' :{
                        month = "July";
                        break;
                  }
                  case '08' :{
                        month = "August";
                        break;
                  }
                  case '09' :{
                        month = "September";
                        break;
                  }
                  case '10' :{
                        month = "October";
                        break;
                  }
                  case '11' :{
                        month = "November";
                        break;
                  }
                  case '12' :{
                        month = "December";
                        break;
                  }
            }
      return month;
      }
}