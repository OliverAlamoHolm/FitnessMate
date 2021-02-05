import { Component, OnInit } from '@angular/core';
import {Chat, ChatService} from '../../../services/common/chat.service';
import {StorageService} from '../../../services/common/storage.service';
import { Athlete, AthleteService } from 'src/app/services/athletes/athlete.service';
import { Coach, CoachService } from 'src/app/services/coaches/coach.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {ç
  
  chats: Chat[] = [];
  actualAthlete: Athlete;
  myChats: Chat[] = [];
  actualUID: string = '';
  coaches: Coach[] = [];

  constructor(private chatService: ChatService, private storageService: StorageService, 
    private athleteService: AthleteService, private coachService: CoachService) { }

  ngOnInit() {
    this.chatService.getChats().subscribe(res =>{
      this.chats = res;
      this.storageService.getActualAthlete().then(res=>{
        this.actualAthlete = res;
        this.storageService.getActualUID().then(res =>{
          this.actualUID = res; 
        })
        for(let chat of this.chats){
          for(let user of chat.users){
            if (user == this.actualUID){
              this.myChats.push(chat)
            }
          }
        }
        this.coachService.getCoaches().subscribe(res =>{
            this.coaches = res;
        })
      })
    })
  }
}
