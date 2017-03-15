import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})

export class MenuBarComponent {
    menuItems = ['Home', 'Buy', 'Sell', 'Transactions'];
    // Useless example methods
    itemClicked(inputs) {   console.log(inputs);        }
    public addMenuItem(newMenuItem) {    this.menuItems.push(newMenuItem);    }
}
