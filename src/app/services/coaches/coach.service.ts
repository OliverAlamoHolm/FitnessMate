import { Injectable } from '@angular/core';
import { AngularFirestoreModule, AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Athlete} from '../athletes/athlete.service'
import{Fee} from '../coaches/fee.service'

export interface Coach{
  name: string;
  lastName: string;
  idd: string;
  bio:string;
  uid: string;
  mail: string;
  clients: Athlete[];
  avatar: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  fees: Fee[];
  paypalId: string;
}

@Injectable({
  providedIn: 'root'
})
export class CoachService {

  private coachCollection: AngularFirestoreCollection<Coach>;
  private coaches : Observable<Coach[]>;
  private co = [];

  constructor(db: AngularFirestore) {
    this.coachCollection = db.collection<Coach>('Coaches');
    this.coaches= this.coachCollection.snapshotChanges().pipe(
        map(actions=>{
          return actions.map(a =>{
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ...data};
          })
        })    
    )
   }

  createCoach(coach: Coach){
    this.co.push(coach);
    return this.coachCollection.add(coach);
  }

  getCoaches(){
    return this.coaches;
  }

  getCoach(id){
    return this.coachCollection.doc<Athlete>(id).valueChanges();
  }

  updateCoach(coach: Coach, id: string){
    return this.coachCollection.doc(id).update(coach);
  }
   
}
