import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { getAuth } from "firebase/auth";
import { Groups } from "./grupo";
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})

export class GrupoComponent implements OnInit {
  readonly pathAlertas = 'grupos';
  grupos: Observable<Groups[]>;
  private grupoCollection: AngularFirestoreCollection<Groups>;
  auth = getAuth();
  msgValGrup = '';
  msgUsuario = '';
  msgCreado = false;
  selected = '';
  agregarUsuaios = false;
  find = true;

  //texto = new FormControl('');
  /* grupoArr = {
    creator_uid: this.auth.currentUser?.uid || '',
    nameGroup: '', estado: '', fecha: '', users: '',
  } */

  constructor(
    private readonly afs: AngularFirestore,
  ) {
    this.grupoCollection = afs.collection<Groups>('grupos');
    this.grupos = this.grupoCollection.valueChanges({ idField: 'grupos' });
  }

  ngOnInit(): void {

  }

/*   onSelect(dato: string): void {
    this.selectedAlerta = dato;
  }
 */
  close() {
    this.msgCreado = false;
  }

  addGroup(texto: string) {
    const auth = getAuth();

    this.msgCreado = true;

    const id = this.afs.createId();
    let creator_uid = auth.currentUser?.uid || '';
    const nameGroup = texto;
    const users = [0];
    const estado = "1";
    const fecha = Date()
    console.log("auth", auth.currentUser?.displayName)
    console.log("texto", texto)
    // Persist a document id
    const item: Groups = { id, creator_uid, nameGroup, estado, fecha, users };
    this.grupoCollection.doc(id).set(item);

  }

  Delete(id: string) {
    try {
      this.afs.collection('grupos').doc(id).delete();
    } catch (error) {
      console.log("deleteDoc", error)
    }
  }

  selectGrupo(id: string): void {    
    this.agregarUsuaios = true;

    this.selected = id;
  }

  buscarUsuario(msgUsuario: string){
    console.log('buscarUsuario', msgUsuario)

    this.agregarUsuaios = true;

    const creator_uid = this.auth.currentUser?.uid || '';
    let expensesCollection = this.afs.collection('/grupos',
      ref => ref.where('creator_uid', '==', creator_uid));

    expensesCollection.valueChanges().subscribe(
      (data: any) => {
        console.log('data', data)
        if (data.length > 0) {
          this.find = true;
        } else {
          this.find = false;
        }
      }
      );
  }
}
