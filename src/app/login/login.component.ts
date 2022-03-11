import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireAuth, } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Query } from "firebase/firestore";
import { delay, Observable } from 'rxjs';
import { getAuth } from "firebase/auth";
import { Usuario } from "./user"
import { GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, GithubAuthProvider } from "firebase/auth";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent {
  items: Observable<Usuario[]>;
  private itemsCollection: AngularFirestoreCollection<Usuario>;

  title = 'huggs';
  showLogin = false;



  //auth = getAuth();
  constructor(public router: Router, public auth: AngularFireAuth, private readonly afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Usuario>('users', ref => ref.limit(1).orderBy('fecha'));
    this.items = this.itemsCollection.valueChanges({ idField: 'customID' })
  }

  login() {
    var googleProvider = new firebase.auth.GoogleAuthProvider();
    const AuthProvider = this.auth.signInWithPopup(googleProvider)
      .then((result) => {
        let token = result.additionalUserInfo?.isNewUser
        if (token) {
          this.addItem()
        }
      })
  }

  loginFace() {
    var facebookProvider = new firebase.auth.FacebookAuthProvider();
    const AuthProvider = this.auth.signInWithPopup(facebookProvider)
      .then((result) => {
        let token = result.additionalUserInfo?.isNewUser
        if (token) {
          this.addItem()
        }
      })
  }

  logout() {
    this.auth.signOut();
  }

  addItem() {
    const auth = getAuth();
    const id = this.afs.createId();
    const estado = "1";
    let userId = auth.currentUser?.uid || '';
    const foto = auth.currentUser?.photoURL || '';
    const email = auth.currentUser?.email || '';
    const nombre = auth.currentUser?.displayName || '';
    let nomLowercase = (auth.currentUser?.displayName || '').toLowerCase();

    console.log("nomLowercase", nomLowercase)

    const fecha = Date()
    const item: Usuario = { id, userId, estado, foto, fecha, email, nombre, nomLowercase };
    this.itemsCollection.doc(id).set(item);
  }
}
