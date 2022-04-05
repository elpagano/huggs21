import { Component, OnInit } from '@angular/core';
import { FormControl, } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";
import { Programacion } from "../programacion";
import { getAuth, } from "firebase/auth";
import { NgbDate, NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['../programacion.component.css']
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

  terapias: any =  [];
  nombreTerapia = '';
  nombreTerapeuta = '';
  
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate;
  toDate: NgbDate | null = null;
  
  desdeTerapia!: NgbDateStruct;
  hastaTerapia!: NgbDateStruct;
  errorFecha = true;

  private programacionesCollection: AngularFirestoreCollection<Programacion>;
  programaciones = new Observable<Programacion[]>();

  constructor(private afs: AngularFirestore, private modalService: NgbModal,
    public router: Router, private calendar: NgbCalendar) {      
    this.programacionesCollection = afs.collection<Programacion>('programaciones');
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 1);
  }

  ngOnInit(): void {
    const todate = this.toDate 

    if (this.desdeTerapia >= this.fromDate ) {
      this.errorFecha = false;
    }
  }

  createProgramacion() {
    const id = this.afs.createId();
    const grupo_id = 'aa';
    const lugar = this.lugar;
    let userId = this.auth.currentUser?.uid || '';
    const foto = this.auth.currentUser?.photoURL || '';
    const observ = this.observ;
    const fechaInicio = this.toDate?.day + '/' + this.toDate?.month + '/' + this.toDate?.year;
    const fechaFin = this.fromDate?.day + '/' + this.fromDate?.month + '/' + this.fromDate?.year;
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

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
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

  addTerapia(){
    this.terapias.push({
      nombreTerapia: this.nombreTerapia,
      nombreTerapeuta: this.nombreTerapeuta
    });
    this.nombreTerapia = '';
    this.nombreTerapeuta = '';
    this.cerrarPop();
  }

  close() {
    this.errorFecha = false;
  }
}
