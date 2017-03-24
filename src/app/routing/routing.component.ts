import { Component, OnInit, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { BodyComponent} from '../body.component';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { MainMenuComponent } from '../main-menu/main-menu.component';
import { AppComponent } from '../app.component';
import { InfoComponent } from '../info/info.component';

const appRoutes: Routes = [
  //{  path:'',      component: BodyComponent  },
  {
    path:'',
    component: MainMenuComponent
  },
  {
    path:'Info',
    component: InfoComponent
  },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
export class RoutingComponent { }