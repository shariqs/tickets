import { Component, OnInit, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { BodyComponent} from '../body/body.component';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { MainMenuComponent } from '../Views/main-menu/main-menu.component';
import { AppComponent } from '../app.component';
import { InfoComponent } from '../info/info.component';
import { SearchMenuComponent } from '../Views/search-menu/search-menu.component';
import { TransactionMenuComponent } from '../Views/transaction-menu/transaction-menu.component';
import { BrowseMenuComponent } from '../Views/browse-menu/browse-menu.component';
import { SellComponent } from '../sell/sell.component';
import { BuyComponent } from '../buy/buy.component';

export const routes: Routes = [
  {path:'',      component: BodyComponent  },
  {path:'Info', component: InfoComponent },
  {path:'Search', component: SearchMenuComponent },
  {path:'Transactions', component: TransactionMenuComponent},
  {path:'Browse', component: BrowseMenuComponent},
  {path:'Browse/:id', component: BrowseMenuComponent,
    children: [
      {path:'', redirectTo: 'EventList', pathMatch:'full'},
      {path:'Sell', component: SellComponent},
      {path:'Buy', component: BuyComponent}
    ]
  },
];

export const routing = RouterModule.forRoot(routes);
export const appRoutingProviders: any [] = [];