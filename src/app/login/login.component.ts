import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Query } from "firebase/firestore";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  title = 'huggs';
  showLogin = false;
  //auth = getAuth();

  constructor( public router: Router, public auth: AngularFireAuth, ) 
  { 

  }


  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

  }
  logout() {
    this.auth.signOut();
  }

}
