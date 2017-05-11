import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class DataService {
  uid;
  user: any;

  constructor(public af: AngularFire) { 
    af.auth.subscribe(auth => this.uid = auth.uid); 

    this.af.auth.subscribe(currentUser => {
      this.user = currentUser.google;
      console.log(this.user);
    })
  }

  public addTicketListing(long, lat, price, event, eventName, date, time){
    
    var id: Number = event.id + 0;
    var info = this.af.database.list('Active_Listings/' + id + '/').push({
      longitude: long,
      latitude: lat,
      price: price,
      owner: this.uid,
      name: this.user.displayName,
      eventName: eventName,
      date: date,
      time: time
     });

    var key = info.key;
    this.af.database.list('Users/' + this.uid + '/Active_Listings/' + id).push(key);
  }



  public addCreditCard(number: Number, code: Number, expMonth: Number, expYear: Number){
    var checkDup = false;

    this.af.database.object('/Users/' + this.uid + '/Cards/').subscribe(listings => {
          Object.keys(listings).forEach(ticket => {  
            this.af.database.object('/Cards/' + listings[ticket] + '/').subscribe(listing => {
              //flag if the CC is same
              if(number == listing.number && expMonth == listing.expMonth && expYear == listing.expYear && code == listing.code){
                checkDup = true;
              }
          });
        });
    });

    setTimeout(()=>{
        //if no duplications in the db
        if(checkDup == false){
          var info = this.af.database.list('Cards').push({
          number: number,
          code: code,
          expMonth: expMonth,
          expYear: expYear
        });
        var key = info.key;

        this.af.database.list('Users/' + this.uid + '/Cards/').push(key);

        }else {console.log('Card is already presented in DB. Transaction successed!');}
    },1000);

  }

  public addAddress(streetNumber: String, city: String, zipCode: Number) {
    var checkDup = false;

    this.af.database.object('/Users/' + this.uid + '/Addresses/').subscribe(listings => {
          Object.keys(listings).forEach(ticket => {  
            this.af.database.object('/Addresses/' + listings[ticket] + '/').subscribe(listing => {
              //flag if there's a duplications
              if(streetNumber == listing.streetNumber && city == listing.city && zipCode == listing.zipCode){
                checkDup = true;
              }
          });
        });
      });

      setTimeout(()=>{
        //if no duplications in the db
        if(checkDup == false){
          var info = this.af.database.list('Addresses').push({
            streetNumber: streetNumber,
            city: city,
            zipCode: zipCode,
          });
          var key = info.key;
          //push to DB
          this.af.database.list('Users/' + this.uid + '/Addresses/').push(key);
        }else {console.log('Address is already presented in DB. Transaction successed!');}
      },1000);

  }
  
  private getUserFullname(): string {
    return this.user.displayName;
  }

  private getUserEmailAddress(): string {
    return this.user.email;
  }


  // Should be implement on the server side daily routine
  // We don't have a running server so this performs every time app is initialized / refreshed
  // Does not check for event's TIME 
  removeOldEvents(){
    var today = new Date();
    var currentDay = today.getDate();
    var currentMonth = today.getMonth()+1;
    var dd = currentDay.toString();
    var mm = currentMonth.toString();

    console.log("Updating database using DataSerive..");

    this.af.database.list('/Active_Listings/').subscribe(listings => {
        //console.log(listings)
        listings.forEach(list => {
          // event.$key: get the event ID numbers
          // console.log(event.$key);
          Object.keys(list).forEach( event=>{
            //details: get the hash key of the event 
            //console.log(details)
            this.af.database.object('/Active_Listings/'+list.$key+'/'+event+'/').subscribe(details=>{
              if(details.date != null){
                //console.log(details.date);
                var temp1 = details.date.substring(5,7);
                var temp2 = details.date.substring(8,10);
                var eventMonth = +temp1;
                var eventDay = +temp2;

                if(currentMonth == eventMonth){

                  if(currentDay > eventDay){
                    //delete event
                    console.log("Removing out-dated events..")
                    this.af.database.object('/Users/'+details.owner+"/Active_Listings/"+list.$key).remove();
                    this.af.database.object('/Active_Listings/'+list.$key).remove();
                  }
                }
                // this is not necessary if runs daily 
                else if(currentMonth > eventMonth){
                  this.af.database.object('/Users/'+details.owner+"/Active_Listings/"+list.$key).remove();
                  this.af.database.object('/Active_Listings/'+list.$key).remove();
                }
              }
            });
          });            
        });
      });
  }



}
