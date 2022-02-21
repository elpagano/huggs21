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
  arrUsers: Array<{ id: string, nombre: string, nomLowercase: string }> = [];

  selectedUsers: Array<{ id: string, nombre: string, nomLowercase: string }> = [];

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
    this.clearUsuarios();
    this.selectAssUsers = true;
    this.selectedGrupid = id;
    this.selectedGrupNom = nameGroup;
    this.getUsers(id);
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
        this.arrUsers.push({ id: data.id, nombre: data.nombre, nomLowercase: data.nomLowercase });
      });
    });
  }

  clearUsuarios() {
    this.arrUsers = [];
    this.selectedUsers = [];
  }

  addArrUserGrupo(id: string, nombre: string, nomLowercase: string): void {
    const auth = getAuth();
    this.selectedUsers.push({ id: id, nombre: nombre, nomLowercase: nomLowercase });
    this.selectedUsers = [...new Map(this.selectedUsers.map(item => [item.id, item])).values()]

    const item: Groups = { id: this.selectedGrupid, creator_uid: auth.currentUser?.uid || '', nameGroup: this.selectedGrupNom, estado: "1", fecha: Date(), users: this.selectedUsers };
    this.grupoCollection.doc(this.selectedGrupid).set(item);
  }

  deleteUser(id: string) {
    try {
      this.selectedUsers.splice(this.selectedUsers.findIndex(item => item.id === id), 1);
      const item: Groups = { id: this.selectedGrupid, creator_uid: '', nameGroup: this.selectedGrupNom, estado: "1", fecha: Date(), users: this.selectedUsers };
      this.grupoCollection.doc(this.selectedGrupid).set(item);

    } catch (error) {
      console.log("deleteDoc", error)
    }
  }

  getUsers(id: string) {

    let expensesCollection = this.afs.collection('/groups',
      ref => ref.where('id', '==', id));

    expensesCollection.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        const data = action.payload.doc.data() as Groups;
        //limpio si el array de usuarios está iniciado con 0
        if (data.users[0] === 0) {
          this.selectedUsers = [];
        } else {
        this.selectedUsers = data.users;
        }
      });
    });
  }
}

