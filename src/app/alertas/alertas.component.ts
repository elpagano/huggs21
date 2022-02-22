import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { delay, Observable } from 'rxjs';
import { getAuth } from "firebase/auth";
import { Router } from "@angular/router";

import { Alert } from "./alertas"

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})

export class AlertasComponent {
  alertas: Observable<Alert[]>;
  auth = getAuth();

  private alertasCollection: AngularFirestoreCollection<Alert>;
  texto = new FormControl('');
  msgVal = '';
  alerta = false;
  selectedAlerta = ''; //un valor de entrada para el input de autenticación

  alertasArr = { userId: '', grupo_id: '', lugar: '', texto: '', estado: '', foto: '', fecha: '' }

  constructor(private readonly afs: AngularFirestore, public router: Router) {
    if (router.url == '/alertas') {
      this.alertasCollection = afs.collection<Alert>('alertas');
    } else {
      this.alertasCollection = afs.collection<Alert>('alertas', ref => ref.limit(1).orderBy('fecha'));
    }
    this.alertas = this.alertasCollection.valueChanges({ idField: 'customID' })
  }

  getalerta(key: string) {

    let alertasCollection = this.afs.collection('/alertas',
      ref => ref.where('id', '==', key));

    alertasCollection.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        const data = action.payload.doc.data() as Alert;
        this.alertasArr.userId = data.userId;
        this.alertasArr.grupo_id = data.grupo_id;
        this.alertasArr.lugar = data.lugar;
        this.alertasArr.texto = data.texto;
        this.alertasArr.estado = data.estado;
        this.alertasArr.foto = data.foto;
        this.alertasArr.fecha = data.fecha;
      });
    });
  }


  addItem(texto: string) {

    this.alerta = true;
    const id = this.afs.createId();
    const grupo_id = 'aa';
    const lugar = 'aa';
    const estado = "1";
    let userId = this.auth.currentUser?.uid || '';
    const foto = this.auth.currentUser?.photoURL || '';
    const fecha = Date()
    // Persist a document id
    const item: Alert = { id, userId, grupo_id, lugar, texto, estado, foto, fecha };
    this.alertasCollection.doc(id).set(item);
  }

  close() {
    this.alerta = false;
  }

  deleteDoc(id: string) {
    try {

      this.afs.collection('alertas').doc(id).delete();
    } catch (error) {
      console.log("deleteDoc", error)
    }
  }

  dataform(estado: string) {
    const id = this.afs.createId();
    let userId = this.alertasArr.userId;
    let grupo_id = this.alertasArr.grupo_id;
    let lugar = this.alertasArr.lugar;
    let texto = this.alertasArr.texto;
    let foto = this.alertasArr.foto;
    let fecha = this.alertasArr.fecha;
    const colecciones: Alert = {
      id, userId, grupo_id, lugar,
      texto, estado, foto, fecha
    };
    return colecciones;
  }

  onSelect(dato: string): void {
    this.selectedAlerta = dato;
  }

  atenderAlerta(key: string): void {
    const estado = "1"
    let coleccionForm = this.dataform(estado)
    try {
      // this.afs.collection('alertas').doc(coleccionForm.userId).update(this.alertasCollection);
    } catch (error) {
      console.log("updateUsuario", error)
    }
  }

  rechazarAlerta(key: string): void {
    this.getalerta(key)
    // const estado = "2"
    //const data = this.dataform(estado)
    console.log("rechazarAlerta() data",key, this.alertasArr)
    try {
      // this.afs.collection('alertas').doc(key).update(this.alertasArr);
    } catch (error) {
      console.log("rechazarAlerta", error)
    }
  }

  updateAlerta(key: string, msgVal: string): void {
    const estado = "3"
    try {
      // this.afs.collection('alertas').doc(key).update(this.alertasCollection);
    } catch (error) {
      console.log("updateAlerta", error)
    }
  }
}
