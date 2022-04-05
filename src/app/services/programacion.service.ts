import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Programacion } from '../programacion/programacion';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})

export class ProgramacionService {

  private programacionesCollection: AngularFirestoreCollection<Programacion>;
  programaciones = new Observable<Programacion[]>();

  constructor(private readonly afs: AngularFirestore) {
    this.programacionesCollection = afs.collection<Programacion>('programaciones');
    this.programaciones = this.programacionesCollection.valueChanges({ idField: 'customID' })
  }

  getProgramacionesSer() {
    return this.programaciones;
  }

  updateProgramacion(programacion: Programacion) {
    this.programacionesCollection.doc(programacion.id).update(programacion);
  }

  addProgramacion(programacion: Programacion) {
    this.programacionesCollection.add(programacion);
  }

  deleteProgramacion(id: string) {
    try {
      this.afs.collection('programaciones').doc(id).delete();
    } catch (error) {
      console.log("deleteProgramacion", error)
    }
  }
}
