import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { doc, deleteDoc } from "firebase/firestore";

export interface Item { id: string; name: string; }

@Component({
  selector: 'app-toma-datos',
  templateUrl: './toma-datos.component.html',
  styleUrls: ['./toma-datos.component.css']
})

export class TomaDatosComponent{
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  constructor(private readonly afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Item>('items');
    this.items = this.itemsCollection.valueChanges({ idField: 'customID' });
  }
  
  addItem() {
    const name = "DSFSFDDS";
    // Persist a document id
    const id = this.afs.createId();
    const item: Item = { id, name };
    this.itemsCollection.doc(id).set(item);
  }
/* 
  deleteDoc(){
    db.collection('item').doc('DSFSFDDS').delete();
  } */
}