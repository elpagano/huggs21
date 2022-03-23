import { Component, OnInit } from '@angular/core';
import { AlertaService } from "../../services/alerta.service";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Alert } from '../alertas';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { getAuth } from "firebase/auth";
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alertas-notif',
  templateUrl: './alertas-notif.component.html',
  styleUrls: ['../alertas.component.css']
})
export class AlertasNotifComponent implements OnInit {

  alertas: Observable<Alert[]> | undefined;
  auth = getAuth();
  private alertasCollection: AngularFirestoreCollection<Alert>;
  texto = new FormControl('');
  msgVal = '';
  alerta = false;
  text = '';
  estado = '';
  foto = '';
  id = '';
  fecha = '';
  hoy = Date();

  constructor(private AlertaService: AlertaService,
    private readonly afs: AngularFirestore,
    public router: Router,
    private modalService: NgbModal) {
  if (this.router.url == '/alertas') {
      this.alertasCollection = this.afs.collection<Alert>('alertas');
    } else {
      this.alertasCollection = this.afs.collection<Alert>('alertas', ref => ref.orderBy('fecha').limitToLast(1) );
    }    
     this.alertas = this.alertasCollection.valueChanges({ idField: 'customID' })
    this.alertas.forEach(element => {
      console.log('element ', element[0].foto)
      this.text = element[0].texto
      this.estado = element[0].estado
      this.foto = element[0].foto
      this.id =  element[0].id
      this.fecha =  element[0].fecha
    });
  }

  ngOnInit(): void {
  }

  addItem(texto: string) {
    console.log(texto)
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
    this.msgVal = ""; // limpio el mensaje
    setTimeout(() => {
      this.alerta = false;
    }, 2000);
    this.modalService.dismissAll();
  }

  close() {
    this.alerta = false;
  }

  atenderAlerta(key: string): void {
    const estado = "2"
    try {
      this.afs.collection('alertas').doc(key).update({ estado: estado });
    } catch (error) {
      console.log("atenderAlerta error", error)
    }
  }

  openBackDropCustomClass(content: any) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  cerrarPop() {
    console.log('cerrarPop');
    this.modalService.dismissAll();
    this.msgVal = ""; // limpio el mensaje
  }
}