import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class DataService {
  uid;
  user: any;

  constructor(public af: AngularFire) { 
    if(this.uid == null){alert('Please login and refresh the browser!');}
    else{
      af.auth.subscribe(auth => this.uid = auth.uid); 

      this.af.auth.subscribe(currentUser => {
        this.user = currentUser.google;
        console.log(this.user);
      })
    }
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



}
