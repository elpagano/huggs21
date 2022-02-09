import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { delay, Observable, of, switchMap, Subject } from 'rxjs';
import { getAuth,  } from "firebase/auth";
import { Opciones } from "./opcionesInt"
import { collection, query, where } from "firebase/firestore";
import { filter, map, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.css']
})

export class OpcionesComponent implements OnInit {

  texto = new FormControl('');
  auth = getAuth();
  email =  '';
  nomUsuer =  '';
  userId =  this.auth.currentUser?.uid || '';
  rol =  '';
  nombre =  '';
  apellido =  '';
  lugar =  '';
  horarioydia =  Date();
  lenguaje =  '';
  titulo =  '';
  facultad =  '';
  capasitaciones =  '';
  // opciones = { email:'', userId:'', rol:'',  lugar:'', horarioydia:Date(), lenguaje:'',  titulo:'',facultad:'', capasitaciones:''}
  mDistricts =  '';

  private itemDoc: AngularFirestoreDocument<Opciones>;
  item: Observable<Opciones>;

  constructor(private afs: AngularFirestore) {
    this.itemDoc = afs.doc<Opciones>('options/1');
    this.item = this.itemDoc.valueChanges() as Observable<Opciones>;
    console.log('options', this.itemDoc, this.item )

  }
/* 

  getOptions() {

    this.itemDoc.valueChanges().subscribe(data => {
      this.email = data.email;
      this.nomUsuer = data.nomUsuer;
      this.userId = data.userId;
      this.rol = data.rol;
      this.nombre = data.nombre;
      this.apellido = data.apellido;
      this.lugar = data.lugar;
      this.horarioydia = data.horarioydia;
      this.lenguaje = data.lenguaje;
      this.titulo = data.titulo;
      this.facultad = data.facultad;
      this.capasitaciones = data.capasitaciones;
      this.mDistricts = data.mDistricts;
    });
  }
       */



  ngOnInit() {
    const uId =  this.auth.currentUser?.uid || '';

    let districtCollectionRef: AngularFirestoreCollection<Opciones> = this.afs.collection("options", ref => {
      return ref.where('userId', '==', uId);
    });

    const mDistricts = districtCollectionRef.valueChanges();
    console.log('options', mDistricts, districtCollectionRef )

  }

  updateUsuario() {

    const id = this.afs.createId();
    let userId = this.userId;
    let nomUsuer = this.nomUsuer;
    let email = this.email;
    let nombre =  this.nombre;
    let apellido =  this.apellido;
    let rol = this.rol;
    let lugar = this.lugar;
    let horarioydia = new Date();
    let lenguaje = this.lenguaje;
    let titulo = this.titulo;
    let facultad = this.facultad;
    let capasitaciones = this.capasitaciones;
    
    // Persist a document id
    const item: Opciones = { id, email, nombre, apellido, nomUsuer, userId, rol, lugar, horarioydia, lenguaje, titulo, facultad, capasitaciones };
    delay(500)
   // this.itemsCollection.doc(`options/${id}`).update(item);

    const name = "mipinga";

    try {
    this.afs.collection('options').doc(userId ).update( item );
    } catch (error) {
      console.log("deleteDoc", error)
    } 
  }

}
