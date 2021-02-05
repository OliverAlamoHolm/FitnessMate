import { Component, OnInit } from '@angular/core';
import {Chat, ChatService} from '../../../services/common/chat.service';
import {StorageService} from '../../../services/common/storage.service';
import { Athlete, AthleteService } from 'src/app/services/athletes/athlete.service';
import { Coach } from 'src/app/services/coaches/coach.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  chats: Chat[] = [];
  actualCoach: Coach;
  myChats: Chat[] = [];
  actualUID: string = '';
  athletes: Athlete[] = [];
  athlete: Athlete;
  athleteAvatar: string = '';
  athleteName: string = '';

  constructor(private chatService: ChatService, private storageService: StorageService, 
    private athleteService: AthleteService) { }

  ngOnInit() {
    this.chatService.getChats().subscribe(res =>{
      this.myChats = []
      this.chats = res;
      
      this.storageService.getActualCoach().then(res=>{
        this.actualCoach = res;
        this.storageService.getActualUID().then(res =>{
          this.actualUID = res;
          for(let chat of this.chats){
            for(let user of chat.users){
              if (user == res){
                this.myChats.push(chat)
              }
            }
          }  
        })
        
        this.athleteService.getAthletes().subscribe(res =>{
            this.athletes = res;
        })
      })
    })
  }

  getUser(userUID: string){
    for(let ath of this.athletes){
      if (userUID == ath.uid){
        this.athlete = ath;
        this.athleteAvatar= ath.avatar;
        this.athleteName = ath.name;
      }
    }
  }
}
