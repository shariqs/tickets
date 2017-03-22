import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-menu-bar',
  templateUrl: '../app.component.html',
  styleUrls: ['../app.component.css']
})

export class MenuBarComponent {
    menuItems = ['Home', 'Buy', 'Sell', 'Transactions'];
    // Useless example methods
    itemClicked(inputs) {   console.log(inputs);        }
    public addMenuItem(newMenuItem) {    this.menuItems.push(newMenuItem);    }
}
