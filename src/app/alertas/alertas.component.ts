import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { delay, Observable } from 'rxjs';
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface Alert {
  id: string;
  usuario_id: string;
  grupo_id: string;
  lugar: string;
  texto: string;
  estado: number;
}

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})

export class AlertasComponent {
  items: Observable<Alert[]>;
  private itemsCollection: AngularFirestoreCollection<Alert>;
  texto = new FormControl('');
  msgVal = '';
  alerta = false;

  constructor(private readonly afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Alert>('items');
    this.items = this.itemsCollection.valueChanges({ idField: 'customID' });
  }

  addItem(texto: string, event: Event) {
    const auth = getAuth();

    this.alerta = true;

    const id = this.afs.createId();
    const grupo_id = 'aa';
    const lugar = 'aa';
    const estado = 1;
    let usuario_id = auth.currentUser?.uid || '';

    console.log("auth", auth.currentUser?.displayName)
    console.log("auth", typeof (auth.currentUser?.uid.toString()))
    // Persist a document id
    const item: Alert = { id, usuario_id, grupo_id, lugar, texto, estado };
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


}
