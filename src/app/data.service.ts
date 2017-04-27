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

  public addTicketListing(long, lat, price, event, eventName){
    
    var id: Number = event.id + 0;
    var info = this.af.database.list('Active_Listings/' + id + '/').push({
      longitude: long,
      latitude: lat,
      price: price,
      owner: this.uid,
      name: this.user.displayName,
      eventName: eventName
     });

    var key = info.key;
    this.af.database.list('Users/' + this.uid + '/Active_Listings/' + id).push(key);
  }

  

  public addCreditCard(number: Number, code: Number, expMonth: Number, expYear: Number){
    var info = this.af.database.list('Cards').push({
      number: number,
      code: code,
      expMonth: expMonth,
      expYear: expYear
    });
   var key = info.key;

    this.af.database.list('Users/' + this.uid + '/Cards/').push(key);
  }

  public addAddress(streetNumber: String, city: String, zipCode: Number) {
    var info = this.af.database.list('Addresses').push({
      streetNumber: streetNumber,
      city: city,
      zipCode: zipCode,
    });
    var key = info.key;

    this.af.database.list('Users/' + this.uid + '/Addresses/').push(key);
  }
  
  private getUserFullname(): string {
    return this.user.displayName;
  }

  private getUserEmailAddress(): string {
    return this.user.email;
  }

}
