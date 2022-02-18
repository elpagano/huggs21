import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { getAuth } from "firebase/auth";
import { Groups } from "./grupo";
import { FormControl } from '@angular/forms';
import { Opciones } from "../opciones/opcionesInt";
import { Usuario } from "../login/user";

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
  //options: Observable<Opciones[]>;
  //private optionsCollection: AngularFirestoreCollection<Opciones>;
  auth = getAuth();
  msgValGrup = '';
  msgUsuario = '';
  msgCreado = false;
  selectedGrupid = '';
  selectedGrupNom = '';
  selectAssUsers = false;
  arrUsers: Array<{id: string, nombre: string, nomLowercase: string}> = []; 

  selectedUsers: Array<{ id: string, nombre: string, nomLowercase:string}> = []; 

  constructor(
    private readonly afs: AngularFirestore,
  ) {
    this.grupoCollection = afs.collection<Groups>('groups');
    this.groups = this.grupoCollection.valueChanges({ idField: 'groups' });
  }

  ngOnInit(): void {
    this.clearUsuarios();
  }

  closemsgGroup() {
    this.msgCreado = false;
  }

  addGroup(texto: string) {
    const auth = getAuth();

    this.msgCreado = true;

    const id = this.afs.createId();
    let creator_uid = auth.currentUser?.uid || '';
    const nameGroup = texto;
    const users = this.selectedUsers;
    const estado = "1";
    const fecha = Date()

    const item: Groups = { id, creator_uid, nameGroup, estado, fecha, users };
    this.grupoCollection.doc(id).set(item);
  }

  deleteGroup(id: string) {
    try {
      this.afs.collection('groups').doc(id).delete();
    } catch (error) {
      console.log("deleteDoc", error)
    }
  }

  //selecciono el grupo
  selectGroup(id: string, nameGroup: string): void {
    this.selectAssUsers = true;
    this.selectedGrupid = id;
    this.selectedGrupNom = nameGroup;
  }


  searchUser(msgUsuario: string) {
    let msgU = msgUsuario.toLowerCase()
    this.selectAssUsers = true;
    let expensesCollection = this.afs.collection('/users',
      ref => ref.orderBy('nomLowercase').startAt(msgU).endAt(msgU + '~'));

    this.arrUsers = [];

    expensesCollection.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        const data = action.payload.doc.data() as Usuario;  
        this.arrUsers.push({id: data.id, nombre: data.nombre, nomLowercase: data.nomLowercase});
      });
    });
  }

  clearUsuarios() {
    this.arrUsers = [];
  }

  addUserGrupo(id: string, nombre: string, nomLowercase: string): void {
    this.selectAssUsers = true;
    let arrTemp: Array<{id: string, nombre: string, nomLowercase: string}> = []; 
    arrTemp.push({id: id, nombre: nombre, nomLowercase: nomLowercase});

    this.selectedUsers = arrTemp.filter((item,index)=>{
      return arrTemp.indexOf(item) === index;
    })

    //this.selectedUsers = arrTemp.filter(item => item.nombre !== nombre);

    console.log("selectedUsers", this.selectedUsers)

  }

}