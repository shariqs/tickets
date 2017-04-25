import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class EventService {

      public eventList = [];//for the json data
      public eventStringList = [];
      public activeEvent: string;
      public activeEventData: Event; 
      public eventDetailsList: Array<Event> = [];//list of all local events cached clientside
      public eventListModel: Array<Event> = [];//the list that is shown to the user. This is so we can filter the list without having to refetch data
      private sortDescending = true;//default
      public transactionInProgress = "browse";

      
      constructor(public http: Http) { 
            this.getEventFromLocalArea(); 
      }

      getEventFromLocalArea() {
            var eventData: any = this.http.get('http://api.songkick.com/api/3.0/events.json?location=geo:37.3382,-121.8863&apikey=147UvqDDrnGJk7nh');
            eventData.subscribe(info => {
                  let response = JSON.parse(info._body);
                  this.eventList = (response.resultsPage.results.event);


                  for (var j in this.eventList) {
                        var event = this.eventList[j];
                        var name = JSON.stringify(event.displayName).replace(/\"/g, '');
                        name = name.substring(0, name.indexOf("(") - 1);
                        var venue = JSON.stringify(event.venue.displayName).replace(/\"/g, '');
                        var city = JSON.stringify(event.location.city).replace(/\"/g, '');
                        var date = JSON.stringify(event.start.date).replace(/\"/g, '');
                        var time = JSON.stringify(event.start.time).replace(/\"/g, '');
                        var link = JSON.stringify(event.uri).replace(/\"/g, '');
                        var id = new Number(JSON.stringify(event.id));
                        this.eventDetailsList.push(new Event(name, venue, date, time, city, id, link));

                  }
                  this.eventListModel = this.eventDetailsList.filter(event => event.displayName.length != 0);
                  console.log(this.eventListModel)
            });
      }

      search(searchTerm: string) {
            if (searchTerm != null)
                  this.eventListModel = this.eventDetailsList.filter(event => event.displayName.toLowerCase().includes(searchTerm.toLowerCase()));
            console.log(this.eventListModel)
      }
      

      setActiveEvent(event : Event) {
            
            this.activeEventData = event;
            this.activeEvent = event.toString();
            console.log(this.activeEvent);
      }

      sort(sortSetting: string) {
            console.log('sort by ' + sortSetting);

            if (sortSetting === "Date") {
                  this.sortByDate(this.sortDescending);
                  this.sortDescending = !this.sortDescending;

            } else if (sortSetting === "Event") {
                  this.sortByEvent(this.sortDescending);
                  this.sortDescending = !this.sortDescending;
            } else if (sortSetting === "City") {
                  this.sortByCity(this.sortDescending);
                  this.sortDescending = !this.sortDescending;
            }
      }

      sortByDate(sortDescending: boolean) {
            if (sortDescending) {
                  this.eventListModel = this.eventListModel.sort((event1, event2) => {
                        if (parseInt(event1.getYear()) != parseInt(event2.getYear())) {
                              return parseInt(event1.getYear()) - parseInt(event2.getYear());
                        } else if (event1.getMonthNumber() != event2.getMonthNumber()) {
                                    return event1.getMonthNumber() - event2.getMonthNumber();
                              } else if (event1.getDayNumber() != event2.getDayNumber())  {
                                    return event1.getDayNumber() - event2.getDayNumber();
                              
                              } else {
                                    return 0;
                              }
                        });
            } else {
                  this.eventListModel = this.eventListModel.sort((event1, event2) => {
                        if (parseInt(event1.getYear()) != parseInt(event2.getYear())) {
                              return parseInt(event2.getYear()) - parseInt(event1.getYear());
                        } else if (event1.getMonthNumber() != event2.getMonthNumber()) {
                                    return event2.getMonthNumber() - event1.getMonthNumber();
                              } else if (event1.getDayNumber() != event2.getDayNumber())  {
                                    return event2.getDayNumber() - event1.getDayNumber();
                              
                              } else {
                                    return 0;
                              }
                        });
            }
      }

      sortByEvent(sortDescending: boolean) {
            if (sortDescending) {
            this.eventListModel = this.eventListModel.sort((event1, event2) => {
                        if (event1.displayName < event2.displayName) {
                              return -1;
                        } else if (event1.displayName > event2.displayName) {
                              return 1;
                        } else {
                              return 0;
                        }
                  });
            } else {
                  this.eventListModel = this.eventListModel.sort((event1, event2) => {
                        if (event1.displayName > event2.displayName) {
                              return -1;
                        } else if (event1.displayName < event2.displayName) {
                              return 1;
                        } else {
                              return 0;
                        }
                  });
            }
      }

      sortByCity(sortDescending: boolean) {
            if (sortDescending) {
                  this.eventListModel = this.eventListModel.sort((event1, event2) => {
                        if (event1.city < event2.city) {
                              return -1;
                        } else if (event1.city > event2.city) {
                              return 1;
                        } else {
                              return 0;
                        }
                  });
            } else {
                  this.eventListModel = this.eventListModel.sort((event1, event2) => {
                        if (event1.city > event2.city) {
                              return -1;
                        } else if (event1.city < event2.city) {
                              return 1;
                        } else {
                              return 0;
                        }
                  });
            }
      }


      public findEventById(id: Number): Event {
            var data: any = this.http.get('http://api.songkick.com/api/3.0/events/' + id + '.json?apikey=147UvqDDrnGJk7nh');

            data.subscribe(info => {
                  let response = JSON.parse(info._body);
                  var event = (response.resultsPage.results.event);
                   var name = JSON.stringify(event.displayName).replace(/\"/g, '');
                        name = name.substring(0, name.indexOf("(") - 1);
                        var venue = JSON.stringify(event.venue.displayName).replace(/\"/g, '');
                        var city = JSON.stringify(event.location.city).replace(/\"/g, '');
                        var date = JSON.stringify(event.start.date).replace(/\"/g, '');
                        var time = JSON.stringify(event.start.time).replace(/\"/g, '');
                        var link = JSON.stringify(event.uri).replace(/\"/g, '');
                        var id = new Number(JSON.stringify(event.id));
                  return new Event(name, venue, city, date, time, id, link);
            });
            return null;
      }


}


class Event {
      displayName: string;
      venue: string;
      date: string;
      time: string;
      city: string;
      id: Number;
      link: string;
      tickets: number = 0;
      soldTickets: number = 0;

      constructor(displayName: string, venue: string, date: string, time: string, city: string, id: Number, link: string) {
            this.displayName = displayName;
            this.venue = venue;
            this.date = date;
            this.time = time;
            this.city = city;
            this.id = id;
            this.link = link;      

      }
// update the number of tickets available 
      addTicket(){
        this.tickets++;

      }
//update the number of tickets sold 
      soldT(){
            this.tickets--;

            this.soldTickets++;
             this.setTicketsSold(this.soldTickets);


      }
//get the number of tickets sold 
      getSoldT() {
      
            return this.soldTickets;
      }


       setTicketsSold(n: number){
       this.soldTickets = n;

      }

      toString(): string {

            return "Event Name: " + this.displayName + ";" +
                  "Venue: " + this.venue + ";" +
                  "Date & Time: " + this.getMonth() + " " + this.getDay() + ", " + this.getYear() +  ", " + this.time + ";" +
                  "City: " + this.city + ";" +
                  "Event Link: " + this.link
      }



      getYear() : string {
            return this.date.substring(0, 4);
      }

      getDay() : string {
            var day = this.date.substring(8);
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

      getDayNumber() : number {
            return parseInt(this.date.substring(8));
      }

      getMonthNumber() : number {

            return parseInt(this.date.substring(5, 7));
      }

      getMonth() : string {
            var month = this.date.substring(5, 7);
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