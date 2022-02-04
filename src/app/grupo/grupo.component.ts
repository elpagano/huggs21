import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { delay, Observable } from 'rxjs';

interface Groups {
  id: string;
  creator_uid: string;
  nameGroup: string;
}

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {
  readonly pathAlertas = 'grupos';
  items: Observable<Groups[]>;
  private itemsCollection: AngularFirestoreCollection<Groups>;

  constructor(
    private readonly afs: AngularFirestore,
    ) {
      this.itemsCollection = afs.collection<Groups>('grupos');
      this.items = this.itemsCollection.valueChanges({ idField: 'grupos' });
     }

  ngOnInit(): void {

  }


}
