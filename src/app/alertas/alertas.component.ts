import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { getAuth } from "firebase/auth";
import { Router } from "@angular/router";

import { Alert } from "./alertas"
import { AlertaService } from "../services/alerta.service";

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})

export class AlertasComponent {
  selectAlert?: Alert;
  alert: Alert[] = [];


  alertas: Observable<Alert[]>;
  auth = getAuth();


  private alertasCollection: AngularFirestoreCollection<Alert>;
  texto = new FormControl('');
  msgVal = '';
  alerta = false;
  selectedAlerta = ''; //un valor de entrada para el input de autenticación

  alertasArr: Alert = { id: '', userId: '', grupo_id: '', lugar: '', texto: '', estado: '', foto: '', fecha: '' }

  constructor(private AlertaService: AlertaService, private readonly afs: AngularFirestore, public router: Router) {
    if (router.url == '/alertas') {
      this.alertasCollection = afs.collection<Alert>('alertas');
    } else {
      this.alertasCollection = afs.collection<Alert>('alertas', ref => ref.limit(1).orderBy('fecha'));
    }
    this.alertas = this.alertasCollection.valueChanges({ idField: 'customID' })
  }

  getalerta(key: string, estate: string): void {
    this.AlertaService.getalerta(key).subscribe(alertas => {
      this.alertasArr.id = alertas[0].id;
      this.alertasArr.userId = alertas[0].userId;
      this.alertasArr.grupo_id = alertas[0].grupo_id;
      this.alertasArr.lugar = alertas[0].lugar;
      this.alertasArr.texto = alertas[0].texto;
      this.alertasArr.estado = estate;
      this.alertasArr.foto = alertas[0].foto;
      this.alertasArr.fecha = alertas[0].fecha;
    });
/*     this.AlertaService.getalerta(key).subscribe(actions => actions
      .forEach(action => {

        let id = action.id
        let userId = action.userId
        let grupo_id = action.grupo_id
        let lugar = action.lugar
        let texto = action.texto
        let estado = estate
        let foto = action.foto
        let fecha = action.fecha

        this.alertasArr = {
          id, userId, grupo_id, foto, lugar, 
          texto, estado, fecha
        };
      
      })
      ); */
    /* this.alertasCollection = this.afs.collection('/alertas',
      ref => ref.where('id', '==', key));

      this.alertasCollection.snapshotChanges().subscribe(actions => {
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
    }); */
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

  onSelect(dato: string): void {
    this.selectedAlerta = dato;
  }

  atenderAlerta(key: string): void {
    const estado = "1"
    try {
      // this.afs.collection('alertas').doc(coleccionForm.userId).update(this.alertasCollection);
    } catch (error) {
      console.log("updateUsuario", error)
    }
  }

  rechazarAlerta(key: string, msgVal: string): void {
    const estado = "0"
    this.getalerta(key, estado)
    console.log("rechazarAlerta()alertasArr", this.alertasArr)
    try {
      // this.afs.collection('alertas').doc(key).update(this.alertasArr);
    } catch (error) {
      console.log("rechazarAlerta", error)
    }
  }

  updateAlerta(key: string, msgVal: string): void {
    const estado = "3"
    this.getalerta(key, estado)
    console.log("updateAlerta()alertasArr", this.alertasArr)

    try {
      // this.afs.collection('alertas').doc(key).update(this.alertasArr);
    } catch (error) {
      console.log("updateAlerta", error)
    }
  }
}
