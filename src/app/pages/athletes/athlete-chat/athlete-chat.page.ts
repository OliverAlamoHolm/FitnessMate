import { Component, OnInit } from '@angular/core';
import {Chat, ChatService, Message} from '../../../services/common/chat.service';
import {StorageService} from '../../../services/common/storage.service';
import { Athlete, AthleteService } from 'src/app/services/athletes/athlete.service';
import { Coach } from 'src/app/services/coaches/coach.service';
import {ActivatedRoute} from "@angular/router";
import {Notifycation, NotifycationsService} from '../../../services/common/notifycations.service';

@Component({
  selector: 'app-athlete-chat',
  templateUrl: './athlete-chat.page.html',
  styleUrls: ['./athlete-chat.page.scss'],
})
export class AthleteChatPage implements OnInit {

  chats = []
  chat: Chat;
  chatIdentificator: string;
  chatId: string;
  messages = [];
  actualUID: string;
  messageText : string = "";
  receiver : string;
  nMessage: Message = {
    transmitter : '',
    receiver : '',
    message : '',
    date : null
  }

  constructor(private chatService: ChatService, private storageService: StorageService, 
    private athleteService: AthleteService, private route: ActivatedRoute, private notsService: NotifycationsService) { }

  ngOnInit() {
    this.chatIdentificator = this.route.snapshot.params['id'];
    this.chatService.getChats().subscribe(res =>{
      this.chats = res;
      for(let cht of this.chats){
        if (cht.id == this.chatIdentificator ){
          this.chat = cht;
          this.chatId = cht.id;
          this.messages = cht.messages
          this.storageService.getActualUID().then(res =>{
            this.actualUID = res;
            for (let user of cht.users){
              if (user != this.actualUID){
                this.receiver = user;
              }
            } 
          })      
        }
      }
    })
    
  }

  sendMessage(){
    this.nMessage.message = this.messageText;
    this.nMessage.transmitter = this.actualUID;
    this.nMessage.receiver = this.receiver;
    let dat = new Date().getHours() + ":" + new Date().getMinutes() + "  " + new Date().getUTCDate() + "/" + new Date().getMonth();
    this.nMessage.date = dat;
    let lastM =  this.messages[this.messages.length-1].date
    if(dat.substring(7, dat.length) != lastM.substring(7, lastM.length)){
      let not: Notifycation = {
        receiver: this.receiver,
        message: 'Tienes nuevos mensajes',
        date: new Date(),
        red: false,
        image: '',
        title: 'Nuevos mensajes',
        expanded: false,
      }
      
    }
    this.chat.messages.push(this.nMessage);
    this.chatService.updateChat(this.chat, this.chatId);
    this.messageText = ''; 
  }

}
