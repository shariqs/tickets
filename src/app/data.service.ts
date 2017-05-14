import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class DataService {
  private uid;
 private user: any;

  constructor(public af: AngularFire) { 
    af.auth.subscribe(auth => this.uid = auth.uid); 

    this.af.auth.subscribe(currentUser => {
      this.user = currentUser.google;
      //console.log(this.user);
    })
  }

  public addTicketListing(long, lat, price, event, eventName, date, time){
    
    var id: Number = event.id + 0;
    var info = this.af.database.list('Active_Listings/' + id + '/').push({
      sellerLongitude: long,
      sellerLatitude: lat,
      buyerLongitude: 0,
      buyerLatitude: 0,
      price: price,
      //hashkey for this user
      owner: this.uid,
      //display name for this user
      name: this.user.displayName,
      eventName: eventName,
      date: date,
      time: time,
      purchasedTime: 0
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

  public buyTicket(purchased:any, eventService: any, uid_seller: any, router: any){

    if(eventService.activeEventData != undefined){
      //Removes Listing from Active_Listings
      this.af.database.object('Active_Listings/'+ eventService.activeEventData.id +'/' + purchased.$key).remove();
      //Adds Listing to Completed_Transactions
      var info = this.af.database.list('Completed_Transactions/'+ eventService.activeEventData.id).push(purchased);
      //Adds Listing to Purchased for specific user
      this.af.database.list('Users/' + this.uid + '/Purchased/' + eventService.activeEventData.id).push(info.key);
      //Removes Listing from User's Active_Listing
      this.af.database.list('Users/' + this.uid + '/Active_Listings/' + eventService.activeEventData.id).subscribe(listings => {
        listings.forEach(listing => {
          if(listing.$value == purchased.$key){
            this.af.database.list('Users/' + this.uid + '/Active_Listings/' + eventService.activeEventData.id + "/"  + listing.$key).remove();
          }
          else if (listing.$value == null) return "N/A";
        });
      });
      //Adds Listing to User's Sold
      uid_seller = purchased.owner;
      this.af.database.list('/Users/' + uid_seller + '/Sold/' + eventService.activeEventData.id).push(info.key);
      router.navigateByUrl('/billings');
    }
    else return "NA"; 

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
  public removeOldEvents(){
    var today = new Date();
    var currentDay = today.getDate();
    var currentMonth = today.getMonth()+1;

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
  public getETA(event){
    //assuming car speed is 40MPH 
    var carSpeed = 40;
    var distance = this.distance(event.sellerLatitude,event.sellerLongitude,event.buyerLatitude,event.buyerLongitude);
    // miles / ( miles / hour ) => hour units 
    var deliverTime = distance/carSpeed;

    //today's date in INT
    var today = new Date();

    var currentDate = today.getDate();
    var currentMonth = today.getMonth()+1;
    var currentHour = today.getHours();
    var currentMin = today.getMinutes();

    // get the time of purchased in INT
    var buyTime = event.purchasedTime;
    console.log(buyTime);
    var buyDate = parseInt(buyTime.substring(0,2));
    var buyMonth = parseInt(buyTime.substring(2,4));
    var buyHour = parseInt(buyTime.substring(4,6));
    var buyMin = parseInt(buyTime.substring(6,8));

    //estimate the time to deliver
    var tempHour;
    var tempMins;
    var tempDays;

    //if longer than 1 day 
    if(deliverTime >= 24){
      tempDays = deliverTime % 24;
      return tempDays.toString() + " days";
    }
    //if longer than 1 hour
    else if(deliverTime >= 1) {
      //console.log(deliverTime);
      tempHour = deliverTime / 1;
      tempHour = Math.round(tempHour);
      //console.log(tempHour);
      tempMins = deliverTime - tempHour;
      //console.log(tempMins);
      tempMins = Math.round(tempMins * 60);
      
    }
    else if(deliverTime < 1){
      tempHour = 0;
      tempMins = Math.ceil(deliverTime * 60);
    }

    if(currentMonth == buyMonth){
      //console.log("in month");
      if(currentDate == buyDate){
        //console.log("in date");
        if(currentHour == (buyHour+tempHour)){
          //console.log("in hour");
          if(currentMin >= (buyMin+tempMins)){
            //console.log("in min");
            return "Delivered";
          }
          else{return ((buyMin+tempMins)-currentMin).toString()+ " mins";}
        }
        else if(currentHour < (buyHour+tempHour)){ return ((buyHour+tempHour)-currentHour).toString() + " hours" + ((buyMin+ tempMins)-currentMin)+ " mins"; }
        else if(currentHour > (buyHour+tempHour)) { return "Delivered"; } 
      }
      else if (currentDate < buyDate ){ return ((buyDate+tempDays)-currentDate).toString() + " days";}
      else if (currentDate > buyDate ){ return "Delivered"; }
    }else return "no data";


  }

  private distance(lat1, lon1, lat2, lon2) {
      var p = 0.017453292519943295;    // Math.PI / 180
      var c = Math.cos;
      var a = 0.5 - c((lat2 - lat1) * p)/2 + 
              c(lat1 * p) * c(lat2 * p) * 
              (1 - c((lon2 - lon1) * p))/2;

      var km = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
      //convert km to mil
      var temp = km / 2;
      var temp2 = temp / 2
      return temp + temp2;
  } 



}
