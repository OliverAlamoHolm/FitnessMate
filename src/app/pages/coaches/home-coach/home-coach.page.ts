import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/common/auth.service";
import {User} from "../../../services/common/users.service";
import {StorageService} from "../../../services/common/storage.service";
import {ToastController, AlertController} from '@ionic/angular'
import { Notifycation, NotifycationsService } from  "../../../services/common/notifycations.service";
import {map} from 'rxjs/operators';
import { Howl } from 'howler';

export interface Track{
  name: string;
  path: string;
}

@Component({
  selector: 'app-home-coach',
  templateUrl: './home-coach.page.html',
  styleUrls: ['./home-coach.page.scss'],
})
export class HomeCoachPage implements OnInit {

  playlist: Track[] = [
    {
      name: 'Notification',
      path: '../../../../assets/sound.mp3'
    }
  ]
  activeTrack: Track = null;
  player: Howl = null;

  us: User = <User>{};
  nots = [];
  notsL = 0;
  notifycations = [];
  uid: string; "";
  notsLength=0;

  constructor(private authService: AuthService, private storageService: StorageService,
     private toastController: ToastController, private notifycationsService: NotifycationsService, private alertCtrl: AlertController) { }

     ngOnInit() {
      let arr = [];
      this.nots.splice(this.nots.length)
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
  deleteNot(not){
    this.notifycationsService.deleteNotifycation(not)
    this.nots = []
  
  }
}
