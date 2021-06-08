import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CoachService, Coach} from '../../../services/coaches/coach.service'
import {Chat, ChatService, Message} from '../../../services/common/chat.service';
import {StorageService} from '../../../services/common/storage.service'
import {Notifycation, NotifycationsService} from '../../../services/common/notifycations.service'

@Component({
  selector: 'app-coach-messaging',
  templateUrl: './coach-messaging.page.html',
  styleUrls: ['./coach-messaging.page.scss'],
})
export class CoachMessagingPage implements OnInit {

  coachUID: string;
  coaches: Coach[] = [];
  chatID: string;
  chats = [];
  actualUID: string;
  actualChat: Chat;
  messages = [];
  messageText: string;
  chat: Chat;
  chatIdentificator: string;
  receiver : string;
  semaforo:  boolean = false;
  name:string;
  avatar: string;
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

  constructor(private route: ActivatedRoute,  private coachService: CoachService, 
    private storageService: StorageService, private chatService: ChatService, 
    private notsService: NotifycationsService) { }

  ngOnInit() {
    this.chatID = this.route.snapshot.params['id'];
    this.receiver = this.route.snapshot.params['uid'];
    this.name = this.route.snapshot.params['name'];
    this.avatar = this.route.snapshot.params['avatar'];
    
    this.storageService.getActualUID().then(res =>{
      this.actualUID = res;
      this.newChat.users.push(this.actualUID)
      this.newChat.users.push(this.receiver)

      this.chatService.getChats().subscribe(res =>{
        this.chats = res;
        for(let cht of this.chats){
          if(cht.idn == this.chatID){
            this.actualChat = cht;
            this.messages = cht.messages;
          }
        }
      })
    });
  }

  sendMessage(){
    this.nMessage.message = this.messageText;
    this.nMessage.transmitter = this.actualUID;
    this.nMessage.receiver = this.receiver;
    let dat = new Date().getHours() + ":" + new Date().getMinutes() + "  " + new Date().getUTCDate() + "/" + new Date().getMonth();
    this.nMessage.date = dat; 
    let lastM;
    if (this.messages.length<1){
      lastM = "date";
    }else{
      lastM =  this.messages[this.messages.length-1].date
    }
    if(dat.substring(7, dat.length) != lastM.substring(7, lastM.length)){
      let not: Notifycation = {
        receiver: this.coachUID,
        message: 'Tienes nuevos mensajes',
        date: new Date(),
        red: false,
        image: '../../../../assets/message.png',
        title: 'Nuevos mensajes',
        expanded: false,
      } 
    }
    this.messages.push(this.nMessage);
    this.actualChat.messages = this.messages;  
    this.chatService.updateChat(this.actualChat, this.chatID).then(()=>{
      this.messageText = ''; 
      this.nMessage = {
        transmitter : '',
        receiver : '',
        message : '',
        date : null
      }
    });
  }
}
