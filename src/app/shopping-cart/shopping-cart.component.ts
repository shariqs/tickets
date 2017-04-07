import { Component, ViewChild, OnInit } from '@angular/core';
import { Popup } from 'ng2-opd-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})

export class ShoppingCartComponent implements OnInit {

  constructor(private popup:Popup, private router: Router){  }

  ngOnInit(){ }

  showEvent(){
    this.popup.options = {
      cancleBtnClass: "btn btn-default",
      confirmBtnClass: "btn btn-default",
      color: "#4180ab",
      header: "Do you want to continue on purchasing this ticket"
    }
    this.popup.show();
  }
  ConfirmEvent(){
    this.router.navigateByUrl('Transactions');
  }
  CancelEvent(){
    alert('Removed from cart');
  }

}
