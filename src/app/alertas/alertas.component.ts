import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { getAuth } from "firebase/auth";
import { Router } from "@angular/router";

import { Alert } from "./alertas"
import { AlertaService } from "../services/alerta.service";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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

  alertasArr: any = [];

  alertArr: Array<{
    id: string, userId: string, grupo_id: string,
    lugar: string, texto: string, estado: string,
    foto: string, fecha: string
  }> = [];

  constructor(private http: HttpClient, private AlertaService: AlertaService,
    private readonly afs: AngularFirestore, public router: Router) {
    if (router.url == '/alertas') {
      this.alertasCollection = afs.collection<Alert>('alertas');
    } else {
      this.alertasCollection = afs.collection<Alert>('alertas', ref => ref.limit(1).orderBy('fecha'));
    }
    this.alertas = this.alertasCollection.valueChanges({ idField: 'customID' })
  }

  getal(key: string, est: string) {
/*     const a = this.AlertaService.getalerta(key).subscribe(
      (data) => {
        data.forEach(element => {
          this.alertArr.push({
            id: element.id, userId: element.userId, grupo_id: element.grupo_id,
            lugar: element.lugar, texto: element.texto, estado: est,
            foto: element.foto, fecha: element.fecha
          })
        })
      }); */
    //*************

    let collection =  this.afs.collection
    ('alertas', ref => ref.where('id', '==', key));

    this.alertArr = [];

    collection.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        const data = action.payload.doc.data() as Alert;
        this.alertArr.push({ id: data.id, 
          userId: data.userId, grupo_id: data.grupo_id,
          lugar: data.lugar, texto: data.texto, estado: est,
          foto: data.foto, fecha: data.fecha
        });
      });
    });

    console.log("alertArr",  this.alertArr )

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

  clearAlerta() {
    this.alertArr = [];
  }

  atenderAlerta(key: string): void {
    const estado = "1"
    this.getal(key, estado)

    if (this.alertArr[0] !== null && this.alertArr[0] !== undefined) {
      try {
        console.log("AAAA", this.alertArr[0].id)
        this.afs.collection('alertas').doc(this.alertArr[0].id).update(this.alertasCollection);
      } catch (error) {
        console.log("atenderAlerta", error)
      }
    }

  }

  rechazarAlerta(key: string, msgVal: string): void {
    const estado = "0"
    this.getal(key, estado)
    console.log("rechazarAlerta", this.alertArr[0])
    try {
      this.afs.collection('alertas').doc(this.alertArr[0].id).update(this.alertasArr);
    } catch (error) {
      console.log("rechazarAlerta", error)
    }
  }

  updateAlerta(key: string, msgVal: string): void {
    const estado = "3"
    this.getal(key, estado)
    console.log("updateAlerta", this.alertArr[0])

    try {
      // this.afs.collection('alertas').doc(key).update(this.alertasArr);
    } catch (error) {
      console.log("updateAlerta", error)
    }
  }
}
