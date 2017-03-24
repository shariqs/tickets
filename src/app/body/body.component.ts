import { Component } from '@angular/core';
import { DataService } from '../data.service';
@Component({
  selector: 'app-body',
  template: `
    <div class="container-fluid text-center">    
        <div class="row content">
            <div class="col-sm-6"> 
              <h1>Welcome</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <hr>
              <h3>Test</h3>
              <p>Lorem ipsum...</p>
            </div>
        </div>
        <button (click)="clicked()"> Add to Database </button>
    </div> 
  `,
  styles: [`
  /* Set height of the grid so .sidenav can be 100% (adjust as needed) */
    
    /* Set gray background color and 100% height */
    .sidenav {
       text-align: center;
      padding-top: 20px;
      background-color: #f1f1f1;
      height: 100%;
    }
    
    /* Set black background color, white text and some padding */
    footer {
      background-color: #555;
      color: white;
      padding: 15px;
    }
    
    /* On small screens, set height to 'auto' for sidenav and grid */
    @media screen and (max-width: 767px) {
      .sidenav {
        height: auto;
        padding: 15px;
      }
      .row.content {height:auto; text-align: center;} 
    }

    }
   `],
})

export class BodyComponent {
// <a routerLink="menus" routerLinkActive="active">next page</a>
/**
 *   <footer class="container-fluid text-center">
    <p>Footer Text</p>
    </footer>
 */

    constructor(public dataService: DataService){ }



      clicked(){
    this.dataService.addCreditCard(623424231432412, 323, 12, 2018);
  }

}

