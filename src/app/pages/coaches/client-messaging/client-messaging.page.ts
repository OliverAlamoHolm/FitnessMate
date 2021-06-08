import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Chat, ChatService, Message} from '../../../services/common/chat.service';
import {StorageService} from '../../../services/common/storage.service'

@Component({
  selector: 'app-client-messaging',
  templateUrl: './client-messaging.page.html',
  styleUrls: ['./client-messaging.page.scss'],
})
export class ClientMessagingPage implements OnInit {

  coachUID: string;
  receiver : string;
  chatID: string;
  actualUID: string;
  semaforo: boolean = false;
  chats = [];
  chat: Chat;
  messages = [];
  newChat: Chat = {
    idn: '',
    messages: [],
    users: [],
  }
  nMessage: Message = {
    transmitter : '',
    receiver : '',
    message : '',
    date : null
  }
  messageText: string;

  constructor(private route: ActivatedRoute,
    private storageService: StorageService, private chatService: ChatService) { }

  ngOnInit() {
    this.chatID = this.route.snapshot.params['id'];
    this.receiver = this.route.snapshot.params['uid'];
    this.storageService.getActualUID().then(res =>{
      this.actualUID = res;
      if(this.chatID != ''){
        this.semaforo = true;
        this.chatService.getChats().subscribe(res =>{
          this.chats = res;
          for (let cht of this.chats){
            if (cht.id == this.chatID){
              this.chat = cht;
              this.messages = cht.messages;  
            }
          }
        })
      }else{
        this.newChat.users.push(this.actualUID)
        this.newChat.users.push(this.receiver)
      }
    });
  }

  sendMessage(){
    this.nMessage.message = this.messageText;
    this.nMessage.transmitter = this.actualUID;
    this.nMessage.receiver = this.receiver;
    let dat = new Date().getHours() + ":" + new Date().getMinutes() + "  " + new Date().getUTCDate() + "/" + new Date().getMonth();
    this.nMessage.date = dat;
    
    if (this.semaforo == true){
      this.chat.messages.push(this.nMessage);      
      this.chatService.updateChat(this.chat, this.chatID);

    }else{
      this.newChat.messages.push(this.nMessage);
      this.chatService.addChat(this.newChat)
      this.semaforo = true;
      this.chatService.getChats().subscribe(res =>{
        this.chats = res;
        for (let cht of this.chats){
          if(cht.users[0] == this.actualUID && cht.users[1] == this.receiver){
            this.chat = cht;
            this.chatID = cht.id;
            this.messages = cht.messages; 
            this.messageText = '';  
          }
        }
      }); 
    }
    this.messageText = ''; 
  }
}
