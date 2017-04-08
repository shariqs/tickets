import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-credit-card-form',
  templateUrl: './credit-card-form.component.html',
  styleUrls: ['./credit-card-form.component.css']
})
export class CreditCardFormComponent implements OnInit {

  form: FormGroup;

  constructor(public fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: '',
      lastName: '',
      billingAdress: '',
      city: '',
      zipCode: '',
      cardNo: '',
    });

   }

  ngOnInit() {
    
  }
  
  onSubmit(){
    console.log(this.form.value);
    alert('work in process!');
  }

}
