import { Component } from '@angular/core';


@Component({
  selector: 'app-body',
  template: `
    <div class="container-fluid text-center">    
        <div class="row content">
            <div class="col-sm-6 text-left"> 
              <h1>Welcome</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <hr>
              <h3>Test</h3>
              <p>Lorem ipsum...</p>
            </div>
            <div class="col-sm-6 text-left"> 
              <h1>Welcome</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <hr>
              <h3>Test</h3>
              <p>Lorem ipsum...</p>
            </div>
        </div>
    </div>

    <footer class="container-fluid text-center">
    <p>Footer Text</p>
    </footer>
  `,
  styles: [`
  /* Set height of the grid so .sidenav can be 100% (adjust as needed) */
    .row.content {height: 450px}
    
    /* Set gray background color and 100% height */
    .sidenav {
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
      .row.content {height:auto;} 
    }

    .body {
      height: 100%
    }
    }
   `],
})

export class BodyComponent {
    menuItems = ['Home', 'Buy', 'Sell', 'Transactions'];
    // Useless example methods
    itemClicked(inputs) {   console.log(inputs);        }
    public addMenuItem(newMenuItem) {    this.menuItems.push(newMenuItem);    }

    constructor(){
    console.log('body is in');
  }
}

