import { Injectable } from '@angular/core';
import { AngularFirestoreModule, AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {StorageService} from "../../services/common/storage.service";

export interface Notifycation{
  message: string,
  receiver: string;
  date: Date;
  red: boolean;
  image:string;
  title: string;
  expanded: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotifycationsService {

  private notifycationCollection: AngularFirestoreCollection<Notifycation>;
  private notifycations : Observable<Notifycation[]>;
  private ntf = [];
  userUID: string;
  bd: AngularFirestore;

  constructor(db: AngularFirestore, private storageService: StorageService) {

    this.storageService.getActualUID().then(res =>{
      this.userUID = res;
      this.notifycationCollection = db.collection<Notifycation>('Notifycations', ref => ref.where('receiver', '==', this.userUID))
      this.notifycations= this.notifycationCollection.snapshotChanges().pipe(
        map(actions=>{
          return actions.map(a =>{
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ...data};
          })
        })     
    )
    })
   }

  addNotifycation(notifycation:Notifycation){
    this.ntf.push(notifycation);
    return this.notifycationCollection.add(notifycation);
  }

  getNotifycations(){
    return this.notifycations;
  }

  updateNotifycation(notifycation: Notifycation, id: string){
    return this.notifycationCollection.doc(id).update(notifycation);
  }

  deleteNotifycation(id){
    return this.notifycationCollection.doc(id).delete();
  }
  
}
