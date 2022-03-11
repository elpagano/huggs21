import { Component, OnInit, Inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { delay, Observable, timeout } from 'rxjs';
import { getAuth } from "firebase/auth";
import { Groups } from "./grupo";
import { Usuario } from "../login/user";
import { OpcionesService } from "../services/opciones.service";
import { Opciones } from "../opciones/opcionesInt";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})

export class GrupoComponent implements OnInit {

  readonly pathAlertas = 'groups';
  groups: Observable<Groups[]>;
  private grupoCollection: AngularFirestoreCollection<Groups>;

  auth = getAuth();
  msgValGrup = '';
  msgERRORGrup = false;
  msgUsuario = '';
  msgCreado = false;
  selectedGrupid = '';
  selectedGrupNom = '';
  selectAssUsers = false;
  tipoUsuario = false;
  arrUsers: Array<{ id: string, nombre: string, nomLowercase: string }> = [];
  selectedUsers: Array<{ id: string, nombre: string, nomLowercase: string }> = [];
  idgrupo = '';

  constructor(private readonly afs: AngularFirestore,
    private OpcionesService: OpcionesService, 
    private modalService: NgbModal, ) {

    this.grupoCollection = afs.collection<Groups>('groups');
    this.groups = this.grupoCollection.valueChanges({ idField: 'groups' });
    const uid = this.auth.currentUser?.uid || '';
    this.getOptions(uid);
  }

  ngOnInit(): void {
    this.clearUsuarios();
  }

  closemsgGroup() {
    this.msgCreado = false;
    this.msgValGrup = '';
  }

  addGroup(texto: string) {
    const auth = getAuth();
    this.msgCreado = true;
    const id = this.afs.createId();
    let creator_uid = auth.currentUser?.uid || '';
    const nameGroup = texto;
    const users = this.selectedUsers;
    const estado = "1";
    const fecha = Date();
    const item: Groups = { id, creator_uid, nameGroup, estado, fecha, users };

    if (nameGroup === "") {
      this.msgERRORGrup = true;
      this.msgCreado = false;
      setTimeout(() => {
        this.msgERRORGrup = false;
        this.msgValGrup = '';
      }, 3000);
    } 
    else {
      this.grupoCollection.doc(id).set(item);
      setTimeout(() => {
        this.msgERRORGrup = false;
        this.msgCreado = false;
        this.msgValGrup = '';
      }, 3000);
    }
  }

  deleteGroup() {
    try {
     this.afs.collection('groups').doc(this.idgrupo).delete();
     this.deleteGroupConfirmClose();
    } catch (error) {
      console.log("deleteDoc", error);
    }
  }
  
  deleteGroupConfirm(content: any, id: string) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
    this.idgrupo = id;
  }

  deleteGroupConfirmClose() {
    this.modalService.dismissAll();
  }

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

  getOptions(key: string,) {
    let expensesCollection = this.afs.collection('/options',
      ref => ref.where('userId', '==', key));
    expensesCollection.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {

        const data = action.payload.doc.data() as Opciones;
        //limpio si el array de usuarios está iniciado con 0
        if (data.rol === "CO" || data.rol === "PM") {
          console.log("rol true")
          this.tipoUsuario = true
        } else {
          console.log("rol false")
          this.tipoUsuario = false
        }
      });
    });
  }
}
