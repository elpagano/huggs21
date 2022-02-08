import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { doc, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export interface Item { id: string; name: string; }

@Component({
  selector: 'app-toma-datos',
  templateUrl: './toma-datos.component.html',
  styleUrls: ['./toma-datos.component.css']
})

export class TomaDatosComponent{

  items: Observable<Item[]>;
  private itemsCollection: AngularFirestoreCollection<Item>;
  
  constructor(private readonly afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Item>('items');
    this.items = this.itemsCollection.valueChanges({ idField: 'customID' });
  }

 
  updateItem() {
    const auth = getAuth();
    const name = "mipinga";
    let id = '8hl21GTuVvm1AvkmetWl';

    try {
    this.afs.collection('items').doc(id).update({ grupo_id: name });
    } catch (error) {
      console.log("deleteDoc", error)
    } 
  }
  
  addItem() {
    const name = "DSFSFDDS";
    // Persist a document id
    const id = this.afs.createId();
    const item: Item = { id, name };
    this.itemsCollection.doc(id).set(item);
  }

}