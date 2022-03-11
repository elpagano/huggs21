import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Alert } from '../alertas/alertas';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})

export class AlertaService {

  private alertasCollection: AngularFirestoreCollection<Alert>;
  
  constructor(private readonly afs: AngularFirestore, private http: HttpClient) { 
    this.alertasCollection = afs.collection<Alert>('alertas');
  }

  getAlerta(): AngularFirestoreCollection<Alert[]>  {
            //this.afs.collection<Alert>('alertas', ref => ref.limit(1).orderBy('fecha'));
    let collection = this.afs.collection<Alert[]>('alertas', ref => ref.limit(1).orderBy('fecha'));
    return collection;
  }



}
