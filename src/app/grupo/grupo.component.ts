import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { getAuth } from "firebase/auth";
import { Groups } from "./grupo";
import { FormControl } from '@angular/forms';
import { Opciones } from "../opciones/opcionesInt";

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})

export class GrupoComponent implements OnInit {
  readonly pathAlertas = 'groups';
  groups: Observable<Groups[]>;
  private grupoCollection: AngularFirestoreCollection<Groups>;
  //busco en options porque es donde estan todos los datos del usuario completos.
  options: Observable<Opciones[]>;
  private optionsCollection: AngularFirestoreCollection<Opciones>;
  auth = getAuth();
  msgValGrup = '';
  msgUsuario = '';
  msgCreado = false;
  selected = '';
  agregarUsuaios = false;
  find = true;
  arrUsers = [
    { nomUsuer: '' }
  ];

  //texto = new FormControl('');
  /* grupoArr = {
    creator_uid: this.auth.currentUser?.uid || '',
    nameGroup: '', estado: '', fecha: '', users: '',
  } */

  constructor(
    private readonly afs: AngularFirestore,
  ) {
    this.grupoCollection = afs.collection<Groups>('groups');
    this.groups = this.grupoCollection.valueChanges({ idField: 'groups' });
    this.optionsCollection = afs.collection<Opciones>('options');
    this.options = this.optionsCollection.valueChanges({ idField: 'options' });
  }

  ngOnInit(): void {
  }

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
      this.afs.collection('groups').doc(id).delete();
    } catch (error) {
      console.log("deleteDoc", error)
    }
  }

  selectGrupo(id: string): void {    
    this.agregarUsuaios = true;
    this.selected = id;
  }

  buscarUsuario(msgUsuario: string){
    console.log("buscarUsuario", msgUsuario)

    this.agregarUsuaios = true;
    let expensesCollection = this.afs.collection('/options',
      ref => ref.where('nomUsuer', '==', msgUsuario));

/*       expensesCollection.valueChanges().subscribe((data: any) => {
        if (data.length > 0) {
          this.find = true;
        } else {
          this.find = false;
        }
      }); */

      expensesCollection.snapshotChanges().subscribe(actions => {
        actions.forEach(action => {
          const data = action.payload.doc.data() as Opciones;
          console.log("nomUsuer", data.nomUsuer)
          this.arrUsers = [{ nomUsuer: data.nomUsuer }];
        });
      });
      console.log("arrUsers", this.arrUsers)

  }  

  clear() {
    this.arrUsers = [{ nomUsuer: '' }];
  }

  agregarUsuario(id: string): void {    
    this.agregarUsuaios = true;
    this.selected = id;
  }

}
