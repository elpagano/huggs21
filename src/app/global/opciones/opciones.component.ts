import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { delay, Observable } from 'rxjs';
import { getAuth, onAuthStateChanged } from "firebase/auth";


interface Opciones {
  id: string;
  usuario: string;
  rol: string;
  lugar: string;
  horarioydia: Date;
  lenguaje: string;
  titulo: string;
  facultad: string;
  capasitaciones: string;
}

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.css']
})

export class OpcionesComponent {


  items: Observable<Opciones[]>;
  private itemsCollection: AngularFirestoreCollection<Opciones>;
  texto = new FormControl('');
  
  email = '';
  usuario = '';
  rol = "";
  lugar = "";
  horarioydia = '';
  lenguaje = "";
  titulo = "";
  facultad = "";
  capasitaciones = "";

  constructor(private readonly afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Opciones>('options');
    this.items = this.itemsCollection.valueChanges({ idField: 'customID' });
    console.log("itemsCollection", this.itemsCollection)
    console.log("items", this.items)

  }


  updateUsuario() {
    const auth = getAuth();
    const id = this.afs.createId();

    let usuario = auth.currentUser?.uid || '';
    let email = this.email;
    let rol = this.rol;
    let lugar = this.lugar
    let horarioydia = new Date();
    let lenguaje = this.lenguaje;
    let titulo = this.titulo;
    let facultad = this.facultad;
    let capasitaciones = this.capasitaciones;
    console.log("auth", auth.currentUser?.displayName)
    console.log("auth", typeof (auth.currentUser?.uid.toString()))
    // Persist a document id
    const item: Opciones = { id, usuario, rol, lugar, horarioydia, lenguaje, titulo, facultad, capasitaciones };
    delay(500)
    this.itemsCollection.doc(`options/${id}`).update(item);

  }

}
