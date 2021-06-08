import { Component, OnInit } from '@angular/core';
import {StorageService} from '../../../services/common/storage.service';
import { CoachService } from 'src/app/services/coaches/coach.service';
import { Coach } from 'src/app/services/coaches/coach.service';
import { Athlete, AthleteService } from 'src/app/services/athletes/athlete.service';
import { Router } from '@angular/router';
import {Fee} from '../../../services/coaches/fee.service';
import {Platform, ToastController} from '@ionic/angular'
import {FeeModalPage} from '../fee-modal/fee-modal.page'
import {Notifycation, NotifycationsService} from '../../../services/common/notifycations.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import {AlertController, ModalController} from '@ionic/angular';


@Component({
  selector: 'app-coach-profile',
  templateUrl: './coach-profile.page.html',
  styleUrls: ['./coach-profile.page.scss'],
})
export class CoachProfilePage implements OnInit {

  fe: Fee;
  actualCoach: Coach;
  actualName: string;
  actualLastName: string;
  actualId: string;
  uid: string;
  avatar: string;
  instagram: string = "";
  facebook: string = "";
  linkedin: string = ""
  bio: string;
  name: string;
  id: string;
  fees: Fee[];
  coaches: Coach[] = [];
  clientId: string;
  athletes = [];
  athlete : Athlete;
  tabSelector: number;

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  constructor(private storageService: StorageService, private route: Router, private coachService: CoachService,
    private router: Router, private modalCtrl: ModalController, private toastController: ToastController,
    private notsService: NotifycationsService, private storage: AngularFireStorage, 
    private alert: AlertController, private athleteService: AthleteService) { }

  ngOnInit() {
    this.tabSelector = 1;
    
    this.storageService.getActualCoach().then(co =>{
      this.actualName= co.name;
      this.actualLastName = co.lastName
      this.actualCoach = co;
      this.instagram = co.instagram;
      this.facebook = co.facebook
      this.name = co.name;
      this.uid = co.uid;
      this.bio = co.bio;
      this.fees = co.fees;
      this.clientId = co.paypalId;
      this.athleteService.getAthletes().subscribe(res=>{
        this.athletes = res;
      })
      this.storageService.getActualID().then(res=>{
        this.actualId = res;
      })
      const filePath = `avatars/${this.uid}`
      const ref = firebase.storage().ref(filePath).getDownloadURL().then(res=>{
        this.avatar = res;
      })   
    }) 
  }

  changeTab(i){
    this.tabSelector= i;
  }

  refreshCoach(){
    if(this.actualName.length>1){
      this.updateName();
      if(this.actualLastName.length>1){
        this.updateLastName();
        this.updateAvatar();
        this.updateCoach();
        this.refreshCoachInfo()
      }else{
        this.showToast('Apellidos demasiado cortos')
      }
    }else{
      this.showToast('Nombre demasiado corto')
    }
  }

  refreshCoachInfo(){
    if(this.bio.length>20){
      this.updateBiografy();
      this.updateInstagram();
      this.updateLinkedin();
      this.updateCoach();
    }else{
      this.showToast('Biografía demasiado corta');
    }
  }

  updateName(){
    this.actualCoach.name = this.actualName;
  }

  updateLastName(){
    this.actualCoach.lastName = this.actualLastName
  }

  updateBiografy(){
    this.actualCoach.bio = this.bio;
  }

  updateAvatar(){
    const filePath = `avatars/${this.uid}`
    const ref = firebase.storage().ref(filePath).getDownloadURL().then(res=>{
      this.avatar = res;
      this.actualCoach.avatar = res;
    })
  }

  updatePaypalId(){
    this.actualCoach.paypalId = this.clientId;
    this.updateCoach();
  }


  updateInstagram(){
    this.actualCoach.instagram = this.instagram;
  }

  updateFacebook(){
    this.actualCoach.facebook = this.facebook;
  }

  updateLinkedin(){
    this.actualCoach.linkedin = this.linkedin;
  }

  updateCoach(){ 
    this.coachService.updateCoach(this.actualCoach, this.actualId).then(()=>{
      this.storageService.updateActualCoach(this.actualCoach);
    });
    this.showToast('Datos actualizados correctamente');
  }

  makeFees(){
    let arrr = [];
    for(let f of this.fees){
      arrr.push(f.name)
    }
    let fee : Fee = {
      name:'Mate',
      description: 'Personalización de entrenamientos y dieta personalmente, seguimiento de resultados mensaul y toma de medidas',
      price: 150,
      members: []
      };
    let sem = true;
    for(let ar of arrr){
      if(ar == fee.name){
        sem = false;
        this.showToast('Ya existe una tarifa con ese nombre. Pruebe con otro distinto')
        break;
      }
    }

    if (sem == true){
      let arr : Fee[] = this.actualCoach.fees;
      arr.push(fee)
      this.actualCoach.fees = arr;
      this.coachService.updateCoach(this.actualCoach, this.actualId).then(()=>{
        this.storageService.updateActualCoach(this.actualCoach);
      });
    } 
  }

  async openFee(fee, index){
    let f: Fee = fee
    let modal = await this.modalCtrl.create({
      component: FeeModalPage,
      cssClass: 'fee-modal',
      componentProps: {
        fee: f,
        index: index 
      }
    });
    modal.present();
  }

  deleteFee(fee, index){
    for(let f of this.actualCoach.fees[index].members){
      this.athlete = this.getAthlete(f)[0];
      let id = this.getAthlete(f)[1];
      this.athlete.coach = "";
      this.athlete.planName = "";
      this.athleteService.updateAthlete(this.athlete, id).then(()=>{
      })
    }
    this.actualCoach.fees.splice(index, 1)
    this.coachService.updateCoach(this.actualCoach, this.actualId).then(()=>{
      this.storageService.deleteActualCoach().then(()=>{
        this.storageService.addActualCoach(this.actualCoach);
      });
    }); 
  }

  getAthlete(uid){
    for(let a of this.athletes){
      if(a.uid = uid){
        let arr: any[] = [];
        arr[0] = a;
        arr[1]=a.id;
        return arr;
      }
    }
  }

  async showToast(msg){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  onLoad(e){
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `avatars/${this.uid}`
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file)
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize (()=>
     this.urlImage = ref.getDownloadURL()
     )).subscribe(()=>{
       this.updateAvatar();
     })
  }

  async deleteAlert(fee, index){
    const alert = await this.alert.create({
        header: 'Eliminar ',
        message: '¿Está seguro de querer eliminar este plan? Perderá a todos los clientes suscritos a el',
        buttons: [
            {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                    
                }
            }, {
                text: 'Ok',
                handler: () => {
                    this.deleteFee(fee, index)
                }
            }
        ]
    });
    await alert.present();
  }
}
