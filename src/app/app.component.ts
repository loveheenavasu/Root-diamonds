import { Component , OnInit} from '@angular/core';
 
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<ng-content></ng-content>',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router) {
    this.router = router;
   }
  title = 'root-diamonds';
  
   
}
