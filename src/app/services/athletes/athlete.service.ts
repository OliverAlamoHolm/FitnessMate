import { Injectable } from '@angular/core';
import { AngularFirestoreModule, AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Routine} from '../common/exercise.service'
import {Diet} from '../common/food.service';

export interface Progress{
  date: string,
  muscleMass:number,
  fat: number,
  weight: number,
  text:string,
  image: string[];
  fileName: string[];
}

export interface Athlete{
  avatar: string;
  idd: string;
  name: string;
  lastName: string;
  uid: string;
  mail: string;
  coach: string;
  planName: string;
  progress: Progress[];
  exerciseRoutine: Routine;
  diet: Diet;
  payDay: string;
}

@Injectable({
  providedIn: 'root'
})
export class AthleteService {

  private athleteCollection: AngularFirestoreCollection<Athlete>;
  private athletes : Observable<Athlete[]>;
  private co = [];

  constructor(db: AngularFirestore) {
    this.athleteCollection = db.collection<Athlete>('Athletes');
    this.athletes= this.athleteCollection.snapshotChanges().pipe(
        map(actions=>{
          return actions.map(a =>{
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ...data};
          }) 
        }) 
    )
   }

   createAthlete(athlete: Athlete){
    this.co.push(athlete);
    return this.athleteCollection.add(athlete);
  }

  getAthletes(){
    return this.athletes;
  }

  getAthlete(id){
    return this.athleteCollection.doc<Athlete>(id).valueChanges();
  }

  updateAthlete(athlete: Athlete, id: string){
    return this.athleteCollection.doc(id).update(athlete)
  }
}
