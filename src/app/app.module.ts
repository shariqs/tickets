import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { AppComponent } from './app.component';

import { MenuBarComponent } from './menu-bar/menu-bar.component';

import { LoginComponent } from './login/login.component';


import { routing } from './routing/routing.component';
import { MainMenuComponent } from './Views/main-menu/main-menu.component';
import { DataService } from './data.service';
import { EventService } from './event.service';

import { InfoComponent } from './info/info.component';
import { BodyComponent} from './body/body.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { EventListComponent } from './event-list/event-list.component';
import { TransactionMenuComponent } from './transaction-menu/transaction-menu.component';


// Must export the config
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
    TransactionMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig,  myFirebaseAuthConfig),
    routing
  ],
  providers: [DataService, EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
