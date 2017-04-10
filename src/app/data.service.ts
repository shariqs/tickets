import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class DataService {
  uid;

  constructor(public af: AngularFire) { 
    af.auth.subscribe(auth => this.uid = auth.uid);
    
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

}
