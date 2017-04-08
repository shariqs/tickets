import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { AppComponent } from './app.component';

import { MenuBarComponent } from './menu-bar/menu-bar.component';

import { LoginComponent } from './login/login.component';

import { PopupModule } from 'ng2-opd-popup';

import { routing, appRoutingProviders } from './routing/routing.component';
import { MainMenuComponent } from './Views/main-menu/main-menu.component';
import { DataService } from './data.service';
import { EventService } from './event.service';

import { InfoComponent } from './info/info.component';
import { BodyComponent} from './body/body.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { EventListComponent } from './event-list/event-list.component';
import { BrowseMenuComponent } from './Views/browse-menu/browse-menu.component';
import { SearchMenuComponent } from './Views/search-menu/search-menu.component';
import { TransactionMenuComponent } from './Views/transaction-menu/transaction-menu.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { AccountMenuComponent } from './Views/account-menu/account-menu.component';
import { PurchasedMenuComponent } from './Views/purchased-menu/purchased-menu.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TicketInfoComponent } from './ticket-info/ticket-info.component';
import { BuyComponent } from './buy/buy.component';
import { SellComponent } from './sell/sell.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { AgmCoreModule } from "angular2-google-maps/core";
import { CreditCardFormComponent } from './credit-card-form/credit-card-form.component';


// Must export the confis
export const firebaseConfig = {
    apiKey: 'AIzaSyBWGRvdZwAd7x0-zvCjo4R9wUvJXY-sNQA',
    authDomain: 'ticketsheister.firebaseapp.com',
    databaseURL: 'https://ticketsheister.firebaseio.com',
    storageBucket: 'ticketsheister.appspot.com',
    messagingSenderId: '596010525706'
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    LoginComponent,
    MainMenuComponent,
    InfoComponent,
    BodyComponent,
    ShoppingCartComponent,
    EventListComponent,
    BrowseMenuComponent,
    SearchMenuComponent,
    TransactionMenuComponent,
    TicketListComponent,
    AccountMenuComponent,
    PurchasedMenuComponent,
    TransactionComponent,
    TicketInfoComponent,
    BuyComponent,
    SellComponent,
    SearchBarComponent,
    CreditCardFormComponent
  ],
  imports: [
      AgmCoreModule.forRoot({
      apiKey: "AIzaSyCT69ZTIW-awHVfckjduLvQ8I0Sy_Zf2gA",
      libraries: ["places"]
    }),
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig,  myFirebaseAuthConfig),
    routing,
    PopupModule.forRoot(),
     ReactiveFormsModule
  ],
  providers: [DataService, EventService, appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
