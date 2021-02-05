import { Injectable } from '@angular/core';
import { AngularFirestoreModule, AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {StorageService} from "../../services/common/storage.service";

export interface Message{
  transmitter: string,
  receiver: string;
  message: string;
  date: string;
}

export interface Chat{
  idn: string,
  messages: Message[],
  users: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private chatCollection: AngularFirestoreCollection<Chat>;
  private chats : Observable<Chat[]>;
  private cht = [];

  userUID: string;

  constructor(db: AngularFirestore, private storageService: StorageService) {
    this.chatCollection = db.collection<Chat>('Chats');
    this.chats= this.chatCollection.snapshotChanges().pipe(
        map(actions=>{
          return actions.map(a =>{
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ...data};
          })
        })  
    )
   }

  addChat(chat:Chat){
    this.cht.push(chat);
    return this.chatCollection.add(chat);
  }

  getChats(){
    return this.chats;
  }

  updateChat(chat: Chat, id: string){
    return this.chatCollection.doc(id).update(chat);
  }
}
