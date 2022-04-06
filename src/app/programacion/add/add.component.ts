import { Component, OnInit } from '@angular/core';
import { FormControl, } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";
import { Programacion } from "../programacion";
import { getAuth, } from "firebase/auth";
import { NgbDate, NgbCalendar, NgbDateStruct, NgbInputDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['../programacion.component.css'],
  providers: [NgbInputDatepickerConfig]  // add config to the component providers
})
export class AddComponent implements OnInit {

  auth = getAuth();
  texto = new FormControl('');
  find = true;
  abrir = false;
  programacionesARR!: Programacion;
  msgVal = '';

  colecciones!: Programacion;

  grupo_id = '';
  lugar = '';
  userId = this.auth.currentUser?.uid || '';
  foto = this.auth.currentUser?.photoURL || '';
  observ = '';
  grupo_nombre = '';

  terapias: any = [];
  nombreTerapia = '';
  nombreTerapeuta = '';

  fromTerapy!: NgbDateStruct;
  toTerapy!: NgbDateStruct;

  fromProg!: NgbDateStruct;
  toProg!: NgbDateStruct;
  errorFecha = 0;

 
  private programacionesCollection: AngularFirestoreCollection<Programacion>;
  programaciones = new Observable<Programacion[]>();

  constructor(private afs: AngularFirestore, private modalService: NgbModal,
    public router: Router, private calendar: NgbCalendar,
    config: NgbInputDatepickerConfig) {
    this.programacionesCollection = afs.collection<Programacion>('programaciones');
   
/*     config.minDate = {year: 2022, month: 5, day: 1};
    config.maxDate = {year: 2099, month: 12, day: 31};
    config.outsideDays = 'hidden';
    config.placement = 'top-left';
   */
  }

  compareDates(){
      console.log('compareDates');
    if (this.toProg <= this.fromProg) {
      this.toProg = this.fromProg
      this.errorFecha = 1;
    }
  }

  ngOnInit(): void {
  }

  createProgramacion() {
    const id = this.afs.createId();
    const grupo_id = 'aa';
    const lugar = this.lugar;
    let userId = this.auth.currentUser?.uid || '';
    const foto = this.auth.currentUser?.photoURL || '';
    const observ = this.observ;
    const fechaInicio = this.fromTerapy?.day + '/' + this.fromTerapy?.month + '/' + this.fromTerapy?.year;
    const fechaFin = this.toTerapy?.day + '/' + this.toTerapy?.month + '/' + this.toTerapy?.year;
    const grupo_nombre = this.grupo_nombre
    const terapias: any = [];
    // Persist a document id
    const programacionesARR: Programacion = {
      id, userId, grupo_id, grupo_nombre, lugar, observ,
      foto, fechaInicio, fechaFin, terapias
    };

    this.programacionesCollection.doc(id).set(programacionesARR);
    setTimeout(() => {
      this.router.navigate(['/programacion']);
    }, 500);

  }

  openBackDropCustomClass(content: any) {
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
  }

  openPop(content: any) {
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
  }

  //******************************* */
  cerrarPop() {
    console.log('cerrarPop');
    this.modalService.dismissAll();
    this.msgVal = ""; // limpio el mensaje
  }

  addTerapia() {
    this.terapias.push({
      nombreTerapia: this.nombreTerapia,
      nombreTerapeuta: this.nombreTerapeuta
    });
    this.nombreTerapia = '';
    this.nombreTerapeuta = '';
    this.cerrarPop();
  }

  close() {
    this.errorFecha = 0;
  }
}
