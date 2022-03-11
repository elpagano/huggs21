import { Component, OnInit } from '@angular/core';
import { AlertaService } from "../../services/alerta.service";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Alert } from '../alertas';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { getAuth } from "firebase/auth";
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-alertas-notif',
  templateUrl: './alertas-notif.component.html',
  styleUrls: ['./alertas-notif.component.css']
})
export class AlertasNotifComponent implements OnInit {

  alertas: Observable<Alert[]>;
  auth = getAuth();
  private alertasCollection: AngularFirestoreCollection<Alert>;
  texto = new FormControl('');
  msgVal = '';
  alerta = false;
  selectedAlerta = ''; //un valor de entrada para el input de autenticación

  constructor(private AlertaService: AlertaService,
    private readonly afs: AngularFirestore,
    public router: Router) {
    if (router.url == '/alertas') {
      this.alertasCollection = afs.collection<Alert>('alertas');
    } else {
      this.alertasCollection = afs.collection<Alert>('alertas', ref => ref.limit(1).orderBy('fecha'));
    }
    this.alertas = this.alertasCollection.valueChanges({ idField: 'customID' })
  }

  ngOnInit(): void {
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


}