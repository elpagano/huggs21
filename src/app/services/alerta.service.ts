import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Alert } from '../alertas/alertas';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class AlertaService {
  alertasArr = { userId: '', grupo_id: '', lugar: '', texto: '', estado: '', foto: '', fecha: '' }

  private alertasCollection: AngularFirestoreCollection<Alert>;
  
  constructor(private readonly afs: AngularFirestore, private http: HttpClient) { 
    this.alertasCollection = afs.collection<Alert>('alertas');
  }

  getalerta(key: string): Observable<Alert[]>  {
    return this.afs.collection<Alert>('alertas', ref => ref.where('id', '==', key)).valueChanges();
  }
}
