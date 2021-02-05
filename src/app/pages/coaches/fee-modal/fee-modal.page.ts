import { Component, OnInit } from '@angular/core';
import {NavParams, ModalController} from '@ionic/angular';
import {Fee, FeeService} from '../../../services/coaches/fee.service';
import {Coach, CoachService} from '../../../services/coaches/coach.service';
import {StorageService} from "../../../services/common/storage.service"
import { Athlete, AthleteService } from 'src/app/services/athletes/athlete.service';
import {ToastController} from '@ionic/angular'

@Component({
  selector: 'app-fee-modal',
  templateUrl: './fee-modal.page.html',
  styleUrls: ['./fee-modal.page.scss'],
})
export class FeeModalPage implements OnInit {

  fee: Fee;
  f: Fee = {
    name: '',
    price: 0,
    description: '',
    members: []
  }
  coach: Coach;
  fees: Fee[]
  name: string;
  price: number;
  members = [];
  description: string;
  coachId: string;
  index: number;

  athletes = [];
  athlete : Athlete;

  constructor(private navParams: NavParams, private coachService: CoachService, 
    private storageService: StorageService, private modalController: ModalController,
    private athleteService: AthleteService, private toastController: ToastController) { }

  ngOnInit() {
    this.fee = this.navParams.get('fee');
    this.index = this.navParams.get('index');
    this.storageService.getActualCoach().then(res =>{
      this.coach = res;
      this.fees = res.fees;
    })
    this.name = this.fee.name;
    this.price = this.fee.price;
    this.members = this.fee.members;
    this.description = this.fee.description;
    this.athleteService.getAthletes().subscribe(res=>{
      this.athletes = res;
    })

    this.storageService.getActualID().then(res =>{
      this.coachId = res;
      
    })
  }

  updateFee(){

    let arrr = [];
    for(let f of this.fees){
      arrr.push(f.name)
    }
  
    this.f.name = this.name;
    this.f.price = this.price;
    this.f.description = this.description;
    this.f.members = this.members;
    this.coach.fees[this.index]=this.f;

    let sem = true;
    for(let ar of arrr){
      if(ar == this.f.name){
        sem = false;
        this.showToast('Ya existe una tarifa con ese nombre. Pruebe con otro distinto')
        break;
      }
    }

    if (sem == true){
      // Actualización de los planes de los atletas
      for(let u of this.f.members){
        this.athlete = this.getAthlete(u)[0];
        let id = this.getAthlete(u)[1];
        this.athlete.planName = this.name;
        this.athleteService.updateAthlete(this.athlete, id).then(()=>{
        })
      }
    
      this.coachService.updateCoach(this.coach, this.coachId).then(()=>{
        this.storageService.updateActualCoach(this.coach)
        window.location.reload()
        this.modalController.dismiss()
      })
    }

    
    
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
}
