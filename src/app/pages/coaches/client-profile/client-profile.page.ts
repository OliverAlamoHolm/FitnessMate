import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Athlete, AthleteService, Progress } from 'src/app/services/athletes/athlete.service';
import { Coach } from 'src/app/services/coaches/coach.service';
import {StorageService} from '../../../services/common/storage.service'
import {ModalController} from "@ionic/angular";
import{TrainingplanModalPage} from '../trainingplan-modal/trainingplan-modal.page';
import {ExerciseService, Day2, Routine, Exercise} from '../../../services/common/exercise.service';
import{DietplanModalPage} from '../dietplan-modal/dietplan-modal.page';
import {Chat, ChatService, Message} from '../../../services/common/chat.service';
import {Router} from '@angular/router';
import {NotesModalPage} from '../../common/notes-modal/notes-modal.page';
import {MacrosModalPage} from '../../common/macros-modal/macros-modal.page';
import {Notifycation, NotifycationsService} from '../../../services/common/notifycations.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import{ProgressModalPage} from '../progress-modal/progress-modal.page';
import{ProgressimageModalPage} from '../../common/progressimage-modal/progressimage-modal.page';



@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.page.html',
  styleUrls: ['./client-profile.page.scss'],
})
export class ClientProfilePage implements OnInit {

  aUID : string;
  tabSelector: number;
  actualCoach: Coach;
  coachAvatar: string;
  athlete: Athlete;
  athleteID: string;
  athleteUID: string;
  avatar: string;
  name: string;
  lastName: string;
  payDay: string;
  routine: any;
  diet:any;
  clients = [];
  client: Athlete;
  cClients: Athlete[] = [];
  chats = [];
  actualUID: string;
  plan: string;
  progress = [];
  text: string = '';
  showTextArea = false;
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  filePath: string;
  fileName: string;

  slideOpts = {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 1.6,
  }
  
  constructor(private route: ActivatedRoute, private storageService: StorageService, 
    private modalCtrl: ModalController, private athleteService: AthleteService,
    private chatService: ChatService, private router: Router, private notsService: NotifycationsService,
    private storage: AngularFireStorage) { }

  ngOnInit() {
    this.aUID = this.route.snapshot.params['uid'];
    
    this.tabSelector = 1;
    this.athleteService.getAthletes().subscribe(res =>{
      this.clients = res;
      for(let client of this.clients){
        if(client.uid==this.aUID){
          this.athleteID = client.id;
          this.athleteUID = client.uid;
          if (client.exerciseRoutine == null){
            this.routine == null;
          }else{
            this.routine = client.exerciseRoutine.week;
          }
          this.athlete = client;
          this.avatar = client.avatar;
          this.payDay = client.payDay;
          this.name = client.name;
          this.lastName = client.lastName;
          this.diet = client.diet.diet;
          this.plan = client.planName;
          this.progress = client.progress;

        }
      }
      this.chatService.getChats().subscribe(res =>{
        this.chats = res;
      })
      this.storageService.getActualCoach().then(res =>{
        this.actualUID = res.uid;
        this.coachAvatar = res.avatar
      })
    })

  }
  
  changeTab(int){
    this.tabSelector = int;    
  }

  async openPlan(dia){
    let modal = await this.modalCtrl.create({
      component: TrainingplanModalPage,
      cssClass: 'trainingplan-modal',
      componentProps: {
        client: this.athlete,
        day: dia,
        avatar: this.coachAvatar
      }
    });
    modal.present();
  }

  async openDiet(dia){
    let modal = await this.modalCtrl.create({
      component: DietplanModalPage,
      cssClass: 'dietplan-modal',
      componentProps: {
        client: this.athlete,
        day: dia,
        avatar: this.coachAvatar
      }
    });
    modal.present();
  }

  goToMessaging(){
    let count = 0;
    if (this.chats.length > 0){
      for (let chat of this.chats){
        let users = chat.users;
        if(users.includes(this.actualUID) && users.includes(this.athleteUID)){
          this.router.navigate(['/chat', chat.idn,  this.athlete.name + ' ' + this.athlete.lastName, this.athlete.avatar] )  
          break; 
        }else{
          count ++;
        } 
      }  
    }
    if (count == this.chats.length){
      this.createChat(); 
    }    
  }

  public createChat(){
    let chat: Chat = {
      idn: '',
      users : [this.aUID, this.actualUID],
      messages: [],
    }
    this.chatService.addChat(chat).then(()=>{
      for (let chatt of this.chats){
        let users = chatt.users;
        if(users.includes(this.aUID) && users.includes(this.aUID)){
          chat.idn = chatt.id;
          this.chatService.updateChat(chat, chatt.id).then(()=>{
            this.router.navigate(['/chat', chatt.id, this.name + ' ' + this.lastName, this.avatar])
          }); 
          let notification: Notifycation = {
            receiver: this.actualCoach.uid,
            message: 'Tu entrenador ha comenzado a chatear contigo, contestale.',
            date: new Date(),
            red: false,
            image:this.actualCoach.avatar,
            title:'Tienes nuevos mensajes',
            expanded: false
          }
        }
      }
      
    });
  }

  async openNoteModal(notes){
    let modal = await this.modalCtrl.create({
      component: NotesModalPage,
      cssClass: 'notes-modal',
      componentProps: {
        note: notes
      }
    });
    modal.present();
  }

  async openMacrosModal(plan){
    let modal = await this.modalCtrl.create({
      component: MacrosModalPage,
      cssClass: 'macros-modal',
      componentProps: {
        plan: plan
      }
    });
    modal.present();
  }

  deleteProgress(p){
    this.filePath = p.fileName[0]
    let ref = this.storage.ref(this.filePath);
    ref.delete()
    this.filePath = p.fileName[1]
    ref = this.storage.ref(this.filePath);
    ref.delete()
    this.progress.splice(p, 1);
    this.athlete.progress = this.progress;
    this.athleteService.updateAthlete(this.athlete, this.athleteID);
  }

  async openM(){
    let modal = await this.modalCtrl.create({
      component: ProgressModalPage,
      cssClass: 'progress-modal',
      componentProps: {
        id: this.athleteID,
        avatar: this.coachAvatar
      }
    });
    modal.present();
  }

  async openImageModal(image){
    let modal = await this.modalCtrl.create({
      component: ProgressimageModalPage,
      cssClass: 'progressimage-modal',
      componentProps: {
        id: image,
      }
    });
    modal.present();
  }
}
