import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AthleteService, Athlete, Progress} from '../../../services/athletes/athlete.service';
import {NavParams, ModalController} from '@ionic/angular';
import{TrainingplanModalPage} from '../trainingplan-modal/trainingplan-modal.page';
import{DietplanModalPage} from '../dietplan-modal/dietplan-modal.page';
import {NotesModalPage} from '../../common/notes-modal/notes-modal.page';
import {MacrosModalPage} from '../../common/macros-modal/macros-modal.page';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import {Notifycation, NotifycationsService} from '../../../services/common/notifycations.service';

@Component({
  selector: 'app-progress-modal',
  templateUrl: './progress-modal.page.html',
  styleUrls: ['./progress-modal.page.scss'],
})
export class ProgressModalPage implements OnInit {

  actualId: string;
  user: Athlete;
  avatar: string;
  userUID: string;
  name: string;
  lastName: string;
  objetivos: string;
  planName: string;
  routine: any;
  diet:any;
  progress = [];
  aUID:string;

  tabSelector: number;
  showTextArea = false;

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  filePath: string;
  fileName: string;

  urlImage2: Observable<string>;
  filePath2: string;
  fileName2: string;

  urlImage3: Observable<string>;
  filePath3: string;
  fileName3: string;

  globalDate: string;

  slideOpts = {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 1.6,
    
  }

  prog: Progress = {
    date: null,
    text:'',
    image: [],
    fileName: [],
    muscleMass: null,
    fat: null,
    weight: null
  }

  text: '';
  muscleMass: null;
  fat: null;
  weight: null
  

  constructor(private route: ActivatedRoute, private athService: AthleteService, 
    private modalCtrl: ModalController, private storage: AngularFireStorage, private navParams: NavParams, 
    private notsService: NotifycationsService) { }

    ngOnInit() {
      this.actualId = this.navParams.get('id');
      this.avatar = this.navParams.get('avatar');
      this.athService.getAthlete(this.actualId).subscribe(res =>{
        this.aUID = res.uid;
        this.user = res;
        this.userUID = res.uid;
        this.lastName = res.lastName;
        this.name = res.name;
        this.planName = res.planName;
        this.tabSelector = 1;
        this.routine = res.exerciseRoutine.week;
        this.diet = res.diet.diet
        this.progress = res.progress;
      })
    }


    addProgress(){
    
      this.prog.text = this.text;
      
      const filePath = `progress/${this.aUID}/${this.aUID + this.prog.date + '_'+ 1}`
      const filePath2 = `progress/${this.aUID}/${this.aUID + this.prog.date + '_'+ 2}`
      const filePath3 = `progress/${this.aUID}/${this.aUID + this.prog.date + '_'+ 3}`
        //const ref = this.storage.ref(filePath).getDownloadURL();
        const ref = firebase.storage().ref(filePath).getDownloadURL().then(res=>{
          this.prog.image[0] = res;
          this.prog.fileName[0] = this.fileName;
          const ref2 = firebase.storage().ref(filePath2).getDownloadURL().then(res=>{
            this.prog.image[1] = res;
            this.prog.fileName[1] = this.fileName2;
            
              this.prog.fat = this.fat;
              this.prog.weight = this.weight;
              this.prog.muscleMass = this.muscleMass;
              this.progress.push(this.prog)
              this.user.progress = this.progress;
              this.athService.updateAthlete(this.user, this.actualId)
              this.text = '';
              this.weight = null;
              this.fat = null;
              this.muscleMass = null;

              let notification: Notifycation = {
                receiver: this.userUID,
                message: 'Tu entrenador ha añadido una nueva entrada de progresos',
                date: new Date(),
                red: false,
                image: this.avatar,
                title: 'Nueva entrada de progresos',
                expanded: false,
              }
            
              this.notsService.addNotifycation(notification);
              this.modalCtrl.dismiss()
            
          })
        })
    }
  
  
    onLoad(e){
      const id = Math.random().toString(36).substring(2);
      const file = e.target.files[0];
      this.globalDate = new Date().getDay() + "-" + new Date().getMonth() + "-" + new Date().getFullYear()

      this.prog.date = this.globalDate;
      this.filePath = `progress/${this.aUID}/${this.aUID + this.prog.date + '_'+ 1}`
      this.fileName = this.filePath;
      const ref = this.storage.ref(this.filePath);
      const task = this.storage.upload(this.filePath, file)
      this.uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe(finalize (()=>
       this.urlImage = ref.getDownloadURL()
  
       ))
      
    }
  
    onLoad2(e){
      console.log(e.target.files[0])
      const id = Math.random().toString(36).substring(2);
      const file = e.target.files[0];
  
  
      this.filePath2 = `progress/${this.aUID}/${this.aUID + this.prog.date + '_'+ 2}`
      this.fileName2 = this.filePath2;
      const ref = this.storage.ref(this.filePath2);
      const task = this.storage.upload(this.filePath2, file)
      this.uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe(finalize (()=>
       this.urlImage2 = ref.getDownloadURL()
  
       ))
      
    }
  
    onLoad3(e){
      const id = Math.random().toString(36).substring(2);
      const file = e.target.files[0];
  
      this.filePath3 = `progress/${this.aUID}/${this.aUID + this.prog.date + '_'+ 3}`
      this.fileName3 = this.filePath;
      const ref = this.storage.ref(this.filePath3);
      const task = this.storage.upload(this.filePath3, file)
      this.uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe(finalize (()=>
       this.urlImage3 = ref.getDownloadURL()
  
       ))
      
    }

}
