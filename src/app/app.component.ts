import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/compat/auth';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'huggs';
  showLogin = '';
  
  constructor( public router: Router, public auth: AngularFireAuth, ) 
  {
  }

}
