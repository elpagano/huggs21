import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ProgramacionService } from "../services/programacion.service";
import { Programacion } from "./programacion";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-programacion',
  templateUrl: './programacion.component.html',
  styleUrls: ['./programacion.component.css']
})

export class ProgramacionComponent implements OnInit {

  programaciones = new Observable<Programacion[]>();

  constructor(public router: Router, private ProgramacionService: ProgramacionService) {
  }

  ngOnInit(): void {
    this.getProgramaciones();
  }

  getProgramaciones() {
    this.programaciones = this.ProgramacionService.getProgramacionesSer()
  }

  deleteProgramacion(id: string) {
    console.log(id);
    this.ProgramacionService.deleteProgramacion(id);
  }

  updateProgramacion(id: string) {
    this.router.navigate(['/programacion/add' + id]);

  }

  abrirProgramacion() {
    this.router.navigate(['/programacion/add']);
  }

}

