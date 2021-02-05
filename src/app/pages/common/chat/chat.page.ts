import { Component, OnInit, ViewChild } from '@angular/core';
import {Chat, ChatService, Message} from '../../../services/common/chat.service';
import {StorageService} from '../../../services/common/storage.service';
import { Athlete, AthleteService } from 'src/app/services/athletes/athlete.service';
import { Coach } from 'src/app/services/coaches/coach.service';
import {ActivatedRoute} from "@angular/router";
import { ResourceLoader } from '@angular/compiler';
import {Router} from "@angular/router";
import { IonContent } from '@ionic/angular';
import {Notifycation, NotifycationsService} from '../../../services/common/notifycations.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  chats = []
  chat: Chat;
  chatIdentificator: string;
  name:string;
  userName:string;
  avatar: string;
  chatId: string;
  messages = [];
  actualUID: string;
  messageText : string = "";
  receiver : string;
  usName: string;
  nMessage: Message = {
    transmitter : '',
    receiver : '',
    message : '',
    date : null
  }
  showSpinner: boolean = true;

  @ViewChild(IonContent) content: IonContent
  

  constructor(private chatService: ChatService, private storageService: StorageService, 
    private athleteService: AthleteService, private route: ActivatedRoute, private router: Router,
    private notsService: NotifycationsService) { }

  ngOnInit() {
    
    setTimeout(() =>{
      this.chatIdentificator = this.route.snapshot.params['id'];
      this.name = this.route.snapshot.params['name'];
      this.avatar = this.route.snapshot.params['avatar'];
      
      this.storageService.getActualUser().then(res =>{
        this.userName = res.name;
      })
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
                  this.content.scrollToBottom(300)
                  this.showSpinner = false;
                }
              } 
            })      
          }
        }
      })
    }, 1000)

    
  }

  sendMessage(){
    let dat = new Date().getHours() + ":" + new Date().getMinutes() + "  " + new Date().getUTCDate() + "/" + new Date().getMonth();
    let bMessage: Message = {
      transmitter : this.actualUID,
      receiver : this.receiver,
      message : this.messageText,
      date : dat
    }
    let lastM = "";
    if(this.messages.length>0){
      let lastM =  this.messages[this.messages.length-1].date
    }else{
      let lastM = "asdf"
    }
    
    if(dat.substring(7, dat.length) != lastM.substring(7, lastM.length)){
      
      let not: Notifycation = {
        receiver: this.receiver,
        message: 'Tienes nuevos mensajes de ' + this.userName,
        date: new Date(),
        red: false,
        image: 'https://i.pinimg.com/originals/83/1b/a4/831ba49f9630882bc828fb68f4cf6398.jpg',
        title: 'Nuevos mensajes',
        expanded: false,
      }

      this.notsService.addNotifycation(not);
      
    }

    this.chat.messages.push(bMessage);
    this.chatService.updateChat(this.chat, this.chatId);

    this.messageText = ''; 
    bMessage = {
      transmitter : '',
      receiver : '',
      message : '',
      date : null
    }


    setTimeout(()=>{
      this.content.scrollToBottom(200)
    })
    

    


  }

  opMessages(){
    
    this.router.navigateByUrl('/tabs/athlete-messages');
  }


}
