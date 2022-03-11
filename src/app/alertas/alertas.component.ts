import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { getAuth } from "firebase/auth";
import { Router } from "@angular/router";

import { Alert } from "./alertas"
import { AlertaService } from "../services/alerta.service";
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient, private AlertaService: AlertaService,
    private readonly afs: AngularFirestore, public router: Router) {
    if (router.url == '/alertas') {
      this.alertasCollection = afs.collection<Alert>('alertas');
    } else {
      this.alertasCollection = afs.collection<Alert>('alertas', ref => ref.limit(1).orderBy('fecha'));
    }
    this.alertas = this.alertasCollection.valueChanges({ idField: 'customID' })
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
    setTimeout(() => {
      this.alerta = false;
    }, 50000);
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
    const estado = "2"
    try {
      this.afs.collection('alertas').doc(key).update({ estado: estado });
    } catch (error) {
      console.log("atenderAlerta error", error)
    }
  }

  rechazarAlerta(key: string): void {
    const estado = "3"
    try {
      this.afs.collection('alertas').doc(key).update({ estado: estado });
    } catch (error) {
      console.log("rechazarAlerta", error)
    }
  }

  updateAlerta(key: string, msgVal: string): void {
    try {
      this.afs.collection('alertas').doc(key).update({ texto: msgVal });
    } catch (error) {
      console.log("updateAlerta", error)
    }
  }
}
