import { Component, OnInit } from '@angular/core';
import {Chat, ChatService} from '../../../services/common/chat.service';
import {StorageService} from '../../../services/common/storage.service';
import { Athlete, AthleteService } from 'src/app/services/athletes/athlete.service';
import { Coach, CoachService } from 'src/app/services/coaches/coach.service';

@Component({
  selector: 'app-athlete-messages',
  templateUrl: './athlete-messages.page.html',
  styleUrls: ['./athlete-messages.page.scss'],
})
export class AthleteMessagesPage implements OnInit {

  chats: Chat[] = [];
  actualAthlete: Athlete;
  myChats: Chat[] = [];
  actualUID: string = '';
  coaches: Coach[] = [];

  constructor(private chatService: ChatService, private storageService: StorageService, 
    private athleteService: AthleteService, private coachService: CoachService) {
     }

  ngOnInit() {
    this.myChats = []
    this.chatService.getChats().subscribe(res =>{
      this.myChats = []
      this.chats = []
      console.log(this.myChats)
      this.chats = res;
      this.storageService.getActualAthlete().then(res=>{
        this.actualAthlete = res;
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
        this.coachService.getCoaches().subscribe(res =>{
            this.coaches = res;
        })
      })
    })
  }
  refresh(){
    this.myChats = [];
  }

  ionViewDidLeave(){
    this.myChats = [];
    this.chatService.getChats().subscribe(res =>{
      this.chats = res;
      this.storageService.getActualAthlete().then(res=>{
        this.actualAthlete = res;
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
        this.coachService.getCoaches().subscribe(res =>{
            this.coaches = res;
        })
      })
    })

  }

}
