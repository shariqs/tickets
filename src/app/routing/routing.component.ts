import { Component, OnInit, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { BodyComponent} from '../body/body.component';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { MainMenuComponent } from '../Views/main-menu/main-menu.component';
import { AppComponent } from '../app.component';
import { InfoComponent } from '../info/info.component';
import { TransactionMenuComponent } from '../Views/transaction-menu/transaction-menu.component';
import { BrowseMenuComponent } from '../Views/browse-menu/browse-menu.component';
import { SellComponent } from '../sell/sell.component';
import { BuyComponent } from '../buy/buy.component';
import { TicketInfoComponent} from '../ticket-info/ticket-info.component';
import { TransactionComponent } from '../transaction/transaction.component'; 
import { PurchasedMenuComponent } from '../Views/purchased-menu/purchased-menu.component';
import { AccountMenuComponent } from '../Views/account-menu/account-menu.component';

export const routes: Routes = [
  {path:'',         component: InfoComponent },
  {path:'Account', component: AccountMenuComponent},
  {path:'Purchased', component: PurchasedMenuComponent},
  {path:'Transactions', component: TransactionMenuComponent},
  {path:'Browse',       component: BrowseMenuComponent},
  {path:'Browse/:id',   component: BrowseMenuComponent,
    children: [
      {path:'', redirectTo: 'Browse', pathMatch:'full'},
      {path:'sell', component: SellComponent},
      {path:'buy', component: BuyComponent}
    ]
  },
  {path:'billings', component: TransactionComponent},
  {path:'**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(routes);
export const appRoutingProviders: any [] = [];