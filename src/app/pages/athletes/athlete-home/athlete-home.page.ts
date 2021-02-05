import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/common/auth.service";
import {StorageService} from "../../../services/common/storage.service";
import {ToastController, AlertController} from '@ionic/angular'
import {User} from "../../../services/common/users.service";
import { Router } from '@angular/router';
import { Notifycation, NotifycationsService } from  "../../../services/common/notifycations.service";
import { Howl } from 'howler'



export interface Track{
  name: string;
  path: string;
}

@Component({
  selector: 'app-athlete-home',
  templateUrl: './athlete-home.page.html',
  styleUrls: ['./athlete-home.page.scss'],
})
export class AthleteHomePage implements OnInit {

  us: User = <User>{};
  nots = [];
  notsL = 0;
  notifycations = [];
  uid: string; "";
  noo= 0;
  notsLength = 0;

  ap= false;

  playlist: Track[] = [
    {
      name: 'Notification',
      path: '../../../../assets/sound2.mp3'
    }
  ]
  activeTrack: Track = null;
  player: Howl = null;
    
  



  constructor(private authService: AuthService, private storageService: StorageService,
     private toastController: ToastController, private router: Router, 
     private notifycationsService: NotifycationsService, private alertCtrl: AlertController) { }

  ngOnInit() {
    
    let arr = [];
    this.storageService.getActualUID().then(res =>{
      this.uid = res;
        this.notifycationsService.getNotifycations().subscribe(res =>{
          let c = -1;
          arr = []
          this.nots.splice(this.nots.length)
          for(let d of res){
            c++;
            arr.push(Number (d.date))
          }
          arr = arr.sort();
          let co = -1;
          
          for(let a of arr){
            co++;
            for(let r of res){
              if (arr[co] == Number(r.date)){
                this.nots[co] = r
              }
            }
          }
          let lN = this.notsL;
          this.notsL = res.length  
          this.notsLength = res.length
          let lN2 = this.notsL
          if(lN2 > lN){
            this.alertin();
          } 
        })  
    })
    
  }

  async alertin(){
    const alert = await this.alertCtrl.create({
      header: 'Aviso',
      message: 'Tienes una nueva notificación en el tablero',
      buttons: ['OK'],
    });

    await alert.present()
    this.player = new Howl({
      src: [this.playlist[0].path],
      onplay: () =>{
        this.activeTrack = this.playlist[0]

      },
      onend: () =>{

      }
    })
    this.player.play();

  }

  aparecer(){
    this.ap = !this.ap
  }

  logout(){
    this.storageService.deleteActualUser().then(()=>{
      this.us = null;
      this.storageService.deleteActualCoach().then(()=>{})
      this.storageService.deleteActualAthlete().then(()=>{})
      this.storageService.deleteActualID().then(()=>{})
      this.storageService.deleteActualUID().then(()=>{})
      this.showToast('Ha cerrado la sesión')
      this.storageService.getActualUser().then(item =>{
        this.us = item;
      })
    });
    this.authService.logout();
  }

  async showToast(msg){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  expand(not){
    not.expanded = !not.expanded;
    //tis.notifycationsService.updateNotifycation(not, not.id)

  }

  deleteNot(not){
    this.notifycationsService.deleteNotifycation(not)
    this.nots = []
  }



  
}
