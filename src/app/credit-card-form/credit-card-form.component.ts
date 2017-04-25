import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { DataService } from '../data.service';
import {AngularFire, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2';



@Component({
  selector: 'app-credit-card-form',
  templateUrl: './credit-card-form.component.html',
  styleUrls: ['./credit-card-form.component.css']
})

export class CreditCardFormComponent implements OnInit {

  private form: FormGroup;

  public firstName; 
  public lastName;
  public billingAddress;
  public city;
  private cardNo;
  private zipCode;
  private exMon;
  private secCode;
  private exYear;


  constructor(public fb: FormBuilder, dataService: DataService) {

    this.form = this.fb.group({
      firstName: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(15)])],
      lastName: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(15)])],
      billingAddress: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      city: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      zipCode: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{5}')])],
      cardNo: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{16}')])],
      exMon: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{2}')])],
      exYear: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{4}')])],
      secCode: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{3}')])]
    });

   }

  ngOnInit() {
    
  }

  onSubmit(value: any): void {
    console.log('Reactive Form Data: ');
    console.log(value);
    alert('submitted');
  }

  getUserDataString(): string {
    return (this.firstName != undefined ? this.firstName : "First") + ", " 
    + (this.lastName != undefined ? this.lastName : "Last") + ", " 
    + (this.billingAddress != undefined ? this.billingAddress : "Billing Address") + ", " 
    + (this.city != undefined ? this.city : "City");
  }
   /*this.addCreditCard(this.cardNo, this.secCode, this.exMon, this.exYear);
  }
  dataService.addAddress(this.billingAddress, this.city, this.zipCode); */

}
