import { Component } from '@angular/core';

@Component({
  selector: 'app-menubar',
  template: `
    <nav class="navbar navbar-inverse">
    <div class="container-fluid">
        <div class="navbar-header">
        <a class="navbar-brand" href="#">TicketSheister</a>
        </div>
        <ul class="nav navbar-nav" *ngFor="let item of menuItems">
        <li (click)="itemClicked(item)" > <a href="#"> {{ item }} </a> </li> 
        </ul>
    </div>
    </nav>
  `,
  styles: [`
  .navbar{
      border-radius: 0px;
  }


   `],

})

export class MenuBarComponent {
    menuItems = ['Home', 'Buy', 'Sell', 'Transactions'];
    // Useless example methods
    itemClicked(inputs) {   console.log(inputs);        }
    public addMenuItem(newMenuItem) {    this.menuItems.push(newMenuItem);    }
}
