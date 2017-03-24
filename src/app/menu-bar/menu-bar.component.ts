import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})

export class MenuBarComponent {
    menuItems = ['Info', 'Buy', 'Sell', 'Transactions'];
    /*menuItems: menuItems;

    constructor(){
      this.menuItems = {
        name: ['Home', 'Buy', 'Sell', 'Transactions'],
        path: ['./home', './buy', './sell', './transactions']
      }
    }
}

interface menuItems{
  name: string[];
  path: string[];
}*/
}
