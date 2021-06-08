import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../../services/common/storage.service";
import {User} from "../../../services/common/users.service";
import {Athlete, AthleteService, Progress} from "../../../services/athletes/athlete.service";
import {ToastController} from '@ionic/angular'
import {ModalController} from "@ionic/angular";
import{ProgressModalPage} from '../progress-modal/progress-modal.page';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';
import{ProgressimageModalPage} from '../../common/progressimage-modal/progressimage-modal.page';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-athlete-profile',
  templateUrl: './athlete-profile.page.html',
  styleUrls: ['./athlete-profile.page.scss'],
})
export class AthleteProfilePage implements OnInit {


  tabSelector: number;
  actualAthlete: Athlete;;
  actualName: string;
  actualLastName: string;
  actualUid: string;
  
  actualMail: string;
  avatar: string;
  athletes = [];
  actualId: string;
  progress = [];
  cloudFiles = []
  slideOpts = {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 1,
  }
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  yudsegment: string = "cuenta";
  
  constructor(private storageService: StorageService, private athleteService: AthleteService, 
    private toastController: ToastController, private modalCtrl: ModalController,
    private storage: AngularFireStorage,  private router: Router) { }

  ngOnInit() {
    this.tabSelector = 1;
    this.storageService.getActualAthlete().then(res =>{
      this.actualAthlete = res;
      this.actualName = res.name;
      this.avatar = res.avatar
      this.actualId = res.idd;
      this.actualMail = res.mail
      this.actualLastName = res.lastName;
      this.progress = res.progress
      this.athleteService.getAthlete(this.actualId).subscribe(res =>{
        this.progress = res.progress
      })
      this.actualUid = res.uid;
      this.actualAthlete.avatar = res.avatar;
      this.actualAthlete.progress = res.progress
      const filePath = `avatars/${this.actualUid}`
      const ref = firebase.storage().ref(filePath).getDownloadURL().then(res=>{
        this.avatar = res;
      })
    })
    this.storageService.getActualID().then(res=>{
      this.actualId = res;
      this.showChart();
    })
  }

  changeTab(int){
    this.tabSelector = int;
  }

  update(){
    if(this.actualName.length>1){
      this.updateName();
      if(this.actualLastName.length>1){
        this.updateLastName();
        this.updateAvatar();
        this.updateAthlete();
      }else{
        this.showToast('Apellidos demasiado cortos.')
      }
    }else{
      this.showToast('Nombre demasiado corto.')
    }
  }

  updateBodyMeasurements(){
    this.updateAthlete();
  }

  updateName(){
    this.actualAthlete.name = this.actualName;
  }

  async updateAvatar(){
    const filePath = `avatars/${this.actualUid}`
    const ref = firebase.storage().ref(filePath).getDownloadURL().then(res=>{
      this.avatar = res;
      this.actualAthlete.avatar = res;
      this.updateAthlete()
      
    })
  }

  updateLastName(){
    this.actualAthlete.lastName = this.actualLastName
  }

  updateAthlete(){
    this.storageService.updateActualAthlete(this.actualAthlete);
    this.athleteService.updateAthlete(this.actualAthlete, this.actualId);
    this.showToast('Datos actualizados correctamente')
  }

  async showToast(msg){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async progModal(){
    let modal = await this.modalCtrl.create({
      component: ProgressModalPage,
      cssClass: 'progress-modal',
      componentProps: {
      }
    });
    modal.present();
  }

  onLoad(e){
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `avatars/${this.actualUid}`
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file)
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize (()=>
     this.urlImage = ref.getDownloadURL()
     )).subscribe(()=>{
       this.updateAvatar();
     })
    
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

  showChart() {
    var length = this.progress.length;
    var date1 = this.progress[0].date;
    var date2 = this.progress[length-2].date;
    var date3 = this.progress[length-1].date;
    var weight1 = this.progress[0].weight;
    var weight2 = this.progress[length-2].weight;
    var weight3 = this.progress[length-1].weight;
    setTimeout(function(){
      var ctx = (<any>document.getElementById('yudhatp-chart'))
      var chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [date1,date2, date3],
          datasets: [{ 
              data: [weight1, weight2, weight3],
              label: "Peso kg.",
              borderColor: "#03bfbc",
              fill: false,
              pointBackgroundColor: "#DC143C",
            }
          ]
        },
        options: {
          title: {
            display: false,
            text: 'Cronología Peso'
          },
        }
        });
    },3000);
  }
}
