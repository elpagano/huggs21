import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import {  Observable } from 'rxjs';
import { getAuth, } from "firebase/auth";
import { Opciones } from "./opcionesInt"

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.css']
})

export class OpcionesComponent implements OnInit {
  isChecked = true;

  texto = new FormControl('');
  auth = getAuth();
  opcionesArr = {
    nomUsuer: this.auth.currentUser?.displayName || '',
    email: this.auth.currentUser?.email || '',
    userId: this.auth.currentUser?.uid || '',
    foto: this.auth.currentUser?.photoURL || '',
    nombre: '', apellido: '', rol: '', lugar: '', horarioydia: '',
    lenguaje: '', titulo: '', facultad: '', capasitaciones: '',
    autoAniadirGrupo: true, 
  }
  roles = [
    {name: 'Coordinador/a', abbrev: 'CO'},
    {name: 'Terapeuta', abbrev: 'TE'},
    {name: 'Asistente Terapéutico', abbrev: 'AT'},
    {name: 'Educador/a', abbrev: 'ED'},
    {name: 'Padre/Madre', abbrev: 'PM'},
    {name: 'Médico', abbrev: 'ME'},
    {name: 'Profesional de la salud', abbrev: 'PS'},
  ];

  form = new FormGroup({
    state: new FormControl(this.roles[0]),
  });
  
  private itemDoc: AngularFirestoreDocument<Opciones>;
  item: Observable<Opciones>;
  find = true;
  colecciones = [];

  constructor(private afs: AngularFirestore) {
    this.itemDoc = afs.doc<Opciones>('options/1');
    this.item = this.itemDoc.valueChanges() as Observable<Opciones>;
  }

  ngOnInit() {
    this.getOpciones();
  }

  getOpciones() {

    const email = this.auth.currentUser?.email || '';
    let expensesCollection = this.afs.collection('/options',
      ref => ref.where('email', '==', email));

    expensesCollection.valueChanges().subscribe(
      (data: any) => {
        //console.log('data', data)
        if (data.length > 0) {
          this.opcionesArr = data[0];
          this.find = true;
        } else {
          this.find = false;
        }
      }
    );

    expensesCollection.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        const data = action.payload.doc.data() as Opciones;
        this.opcionesArr.nomUsuer = data.nomUsuer;
        this.opcionesArr.email = data.email;
        this.opcionesArr.userId = data.userId;
        this.opcionesArr.foto = data.foto;
        this.opcionesArr.nombre = data.nombre;
        this.opcionesArr.apellido = data.apellido;
        this.opcionesArr.rol = data.rol;
        this.opcionesArr.lugar = data.lugar;
        this.opcionesArr.horarioydia = data.horarioydia;
        this.opcionesArr.lenguaje = data.lenguaje;
        this.opcionesArr.titulo = data.titulo;
        this.opcionesArr.facultad = data.facultad;
        this.opcionesArr.capasitaciones = data.capasitaciones;
        this.isChecked = data.autoAniadirGrupo;
      });
    });
    return this.find;
  }

  dataform() {

    const id = this.afs.createId();
    let nomUsuer = this.opcionesArr.nomUsuer;
    let email = this.opcionesArr.email;
    let userId = this.opcionesArr.userId;
    let foto = this.opcionesArr.foto;
    let nombre = this.opcionesArr.nombre;
    let apellido = this.opcionesArr.apellido;
    let rol = this.opcionesArr.rol;
    let lugar = this.opcionesArr.lugar;
    let horarioydia = this.opcionesArr.horarioydia;
    let lenguaje = this.opcionesArr.lenguaje;
    let titulo = this.opcionesArr.titulo;
    let facultad = this.opcionesArr.facultad;
    let capasitaciones = this.opcionesArr.capasitaciones;
    let nomLowercase = this.opcionesArr.nombre.toLowerCase();
    let autoAniadirGrupo = this.isChecked;

    const colecciones: Opciones = {
      id, nomUsuer, email, userId,
      foto, nombre, apellido, rol, lugar, horarioydia, lenguaje,
      titulo, facultad, capasitaciones, nomLowercase, autoAniadirGrupo
    };

    return colecciones;
  }

  updateUsuario() {
    let coleccionForm = this.dataform()
    try {
      this.afs.collection('options').doc(coleccionForm.userId).update(coleccionForm);
    } catch (error) {
      console.log("updateUsuario", error)
    }
  }

  createUsuario() {
    let coleccionForm = this.dataform()
    try {
      this.afs.collection('options').doc(coleccionForm.userId).set(coleccionForm);
    } catch (error) {
      console.log("createUsuario", error)
    }
  }

}
