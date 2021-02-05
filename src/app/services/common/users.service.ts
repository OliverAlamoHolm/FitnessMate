import { Injectable } from '@angular/core';
import { AngularFirestoreModule, AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {AuthService} from "../common/auth.service"

export interface User{

  name: string,
  mail: string;
  uid: string;
  rol: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private userCollection: AngularFirestoreCollection<User>;
  private users : Observable<User[]>;
  private us = [];

  constructor(db: AngularFirestore, private authService: AuthService) {
    this.userCollection = db.collection<User>('Users');
    this.users= this.userCollection.snapshotChanges().pipe(
        map(actions=>{
          return actions.map(a =>{
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ...data};
          })
        })
    )
   }

   createUser(user: User){
    this.us.push(user);
    return this.userCollection.add(user);
  }

  getUsers(){
    return this.users;
  }
}
