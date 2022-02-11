import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { delay, Observable } from 'rxjs';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Alert } from "./alertas"

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})

export class AlertasComponent {
  items: Observable<Alert[]>;
  auth = getAuth();

  private itemsCollection: AngularFirestoreCollection<Alert>;
  texto = new FormControl('');
  msgVal = '';
  alerta = false;
  selectedAlerta = ''; //un valor de entrada para el input de autenticación
 
  alertasArr = {
    userId: '', 
    grupo_id: '', 
    lugar: '',
    texto: '',
    estado: ''
  }

  constructor(private readonly afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Alert>('items', ref => ref.limit(1));
    this.items = this.itemsCollection.valueChanges({ idField: 'customID' })
    
  }

  getOpciones() {

    const uId = this.auth.currentUser?.uid || '';
    let expensesCollection = this.afs.collection('/options',
      ref => ref.where('userId', '==', uId));

    expensesCollection.valueChanges().subscribe(
      (data: any) => {
        console.log('data', data)
        
      }
    );
  }

  addItem(texto: string, event: Event) {
    const auth = getAuth();

    this.alerta = true;

    const id = this.afs.createId();
    const grupo_id = 'aa';
    const lugar = 'aa';
    const estado = "1";
    let userId = auth.currentUser?.uid || '';

    console.log("auth", auth.currentUser?.displayName)
    console.log("auth", typeof (auth.currentUser?.uid.toString()))
    // Persist a document id
    const item: Alert = { id, userId, grupo_id, lugar, texto, estado };
    delay(500)
    this.itemsCollection.doc(id).set(item);
  }

  close() {
    this.alerta = false;
  }

  deleteDoc(id: string) {
    try {
      this.afs.collection('items').doc(id).delete();
    } catch (error) {
      console.log("deleteDoc", error)
    }
  }

  dataform() {
    
    const id = this.afs.createId();
    let userId = this.alertasArr.userId;
    let grupo_id = this.alertasArr.grupo_id;
    let lugar = this.alertasArr.lugar;
    let texto = this.alertasArr.texto;
    let estado = this.alertasArr.estado;

    const colecciones: Alert = {
      id, userId, grupo_id, lugar,
      texto, estado
    };

    return colecciones;
  }

  onSelect(dato: string): void {
    this.selectedAlerta = dato;
  }

  atenderAlerta(key: string): void {
    let coleccionForm = this.dataform()
    try {
      this.afs.collection('items').doc(coleccionForm.userId).update(coleccionForm);
    } catch (error) {
      console.log("updateUsuario", error)
    }
  }
/* 
  rechazarAlerta(key: string): void {
    this.afs.update(key, { estado: 1 });
  }

  updateAlerta(msg: string, key: string): void {
    this.afs.update(key, { alert: msg, usuario: this.authS.currentUserId });
  } */
}
