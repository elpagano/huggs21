import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Alert } from '../alertas/alertas';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Opciones } from "../opciones/opcionesInt";

@Injectable({
  providedIn: 'root'
})
export class OpcionesService {

  tipoUsuario = false;
  tipo = false;

  constructor(private readonly afs: AngularFirestore) {
  }

  getOptions(id: string): boolean {

    let expensesCollection = this.afs.collection('/options',
      ref => ref.where('userId', '==', id));
    expensesCollection.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        
        const data = action.payload.doc.data() as Opciones;
        //limpio si el array de usuarios está iniciado con 0
        if (data.rol === "CO" || data.rol === "PM" ) {
          console.log("rol true")
          this.tipo = true
        } else {
          console.log("rol false")
          this.tipo = false
        }
      });
    });
    console.log("getOptions SERVICE tipoUsuario", this.tipo)
    console.log("getOptions SERVICE id", id)
    return this.tipo
  }
}
