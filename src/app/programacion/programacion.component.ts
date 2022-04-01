import { Component, OnInit } from '@angular/core';
import { FormControl, } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";
import { ProgramacionService } from "../services/programacion.service";
import { Programacion } from "./programacion";
import { Observable } from 'rxjs';
import { getAuth, } from "firebase/auth";
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-programacion',
  templateUrl: './programacion.component.html',
  styleUrls: ['./programacion.component.css']
})


export class ProgramacionComponent implements OnInit {

  programaciones = new Observable<Programacion[]>();

  auth = getAuth();
  texto = new FormControl('');
  find = false;
  abrir = false
  programacionesARR = {
    id: '',
    userId: this.auth.currentUser?.uid || '',
    grupo_id: '',
    grupo_nombre: '',
    lugar: '',
    observ: '',
    foto: '',
    fechaInicio: '',
    fechaFin: '',
    Terapias: []
  }
  msgVal = '';

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate;
  toDate: NgbDate | null = null;
  colecciones!: Programacion;

  constructor(private afs: AngularFirestore, private modalService: NgbModal,
    public router: Router, private ProgramacionService: ProgramacionService,
    private calendar: NgbCalendar, ) {

    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit(): void {
    this.getProgramaciones();
  }

  getProgramaciones() {
    this.programaciones = this.ProgramacionService.getProgramacionesSer()
  }

  updateProgramacion(id: string) {
    this.dataform();
    this.ProgramacionService.updateProgramacion(this.colecciones);
    this.cerrarPOP();
  }

  createProgramacion() {
    this.dataform();
    this.ProgramacionService.addProgramacion(this.colecciones);
    this.cerrarPOP();
  }

  deleteProgramacion(id: string) {
    this.dataform();
    this.ProgramacionService.deleteProgramacion(id);
  }

  openBackDropCustomClass(content: any) {
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
  }

  cerrarPOP() {
    this.modalService.dismissAll();
  }
  
  abrirPOP(content: any) {
    this.abrir = true
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop', size: 'lg'});
    console.log('abrirPOP');
  }
  
  dataform() {

    const id = this.afs.createId();

    let userId = this.programacionesARR.userId;
    let grupo_id = this.programacionesARR.grupo_id;
    let grupo_nombre = this.programacionesARR.grupo_nombre;
    let lugar = this.programacionesARR.lugar;
    let observ = this.programacionesARR.observ;
    let foto = this.programacionesARR.foto;
    let fechaInicio = this.toDate?.day + '/' + this.toDate?.month + '/' + this.toDate?.year;
    let fechaFin = this.fromDate?.day + '/' +this.fromDate?.month + '/' + this.fromDate?.year;

    this.colecciones = {
      id, userId, grupo_id, grupo_nombre, lugar, observ
      , foto, fechaInicio, fechaFin, Terapias: []
    };
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

}

