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

  alertasArr = {
    userId: '',
    grupo_id: '',
    lugar: '',
    texto: '',
    estado: 1,
    foto: '',
    fecha: '',
  }

  constructor(private readonly afs: AngularFirestore, public router: Router) {

    if(router.url == '/alertas'){
    this.alertasCollection = afs.collection<Alert>('alertas');
    } else {
    this.alertasCollection = afs.collection<Alert>('alertas', ref => ref.limit(1).orderBy('fecha'));
    }
    this.alertas = this.alertasCollection.valueChanges({ idField: 'customID' })
  }

  addItem(texto: string, event: Event) {

    this.alerta = true;
    const id = this.afs.createId();
    const grupo_id = 'aa';
    const lugar = 'aa';
    const estado = "1";
    let userId = this.auth.currentUser?.uid || '';
    const foto = this.auth.currentUser?.photoURL || '';
    const fecha = Date()
    console.log("auth", this.auth.currentUser?.displayName)
    console.log("auth", typeof (this.auth.currentUser?.uid.toString()))
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
      this.afs.collection('alertas').doc(coleccionForm.userId).update(coleccionForm);
    } catch (error) {
      console.log("updateUsuario", error)
    }
  }

  rechazarAlerta(key: string): void {

    console.log("rechazarAlerta", key)
    const estado = "2"
    let coleccionForm = this.dataform(estado)
    try {
      this.afs.collection('alertas').doc(key).update(estado);
    } catch (error) {
      console.log("rechazarAlerta", error)
    }
  }

  updateAlerta( key: string, msgVal: string): void {
    console.log("updateAlerta", key, msgVal)
    const estado = "3"
    let coleccionForm = this.dataform(estado)
    try {
      this.afs.collection('alertas').doc(key).update(estado);
    } catch (error) {
      console.log("updateAlerta", error)
    }
  }
}
