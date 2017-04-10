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
      firstName: '',
      lastName: '',
      billingAdress: '',
      city: '',
      zipCode: '',
      cardNo: '',
      exMon: '',
      exYear: '',
      secCode: ''
    });

   }

  ngOnInit() {
    
  }

  onSubmit(){
    console.log(this.form.value);
    alert('work in process!');
    
   /*this.addCreditCard(this.cardNo, this.secCode, this.exMon, this.exYear);
  dataService.addAddress(this.billingAddress, this.city, this.zipCode); */

  }

}
