import { Component, OnInit } from '@angular/core';
import {NavParams} from '@ionic/angular';
import {Fee, Member} from '../../../services/coaches/fee.service';
import {StorageService} from '../../../services/common/storage.service';
import {NotifycationsService, Notifycation} from '../../../services/common/notifycations.service';
import {Athlete, AthleteService} from '../../../services/athletes/athlete.service';
import {Coach, CoachService} from '../../../services/coaches/coach.service';
import {ToastController} from '@ionic/angular'
import {ModalController} from '@ionic/angular'
import {Router} from '@angular/router';


@Component({
  selector: 'app-trainer-fee',
  templateUrl: './trainer-fee.page.html',
  styleUrls: ['./trainer-fee.page.scss'],
})
export class TrainerFeePage implements OnInit {

  fee: Fee;
  actualAthlete: Athlete;
  id;
  coach: Coach;
  coaches= [];
  coachId: string;
  planName:string;
  
  constructor(private navParams: NavParams, private storageService: StorageService,
     private athleteService: AthleteService, private coachService: CoachService,
      private toastController: ToastController, private notService: NotifycationsService, 
      private router: Router, private modal: ModalController) { }

  ngOnInit() {
    this.fee = this.navParams.get('fee');
    this.coach = this.navParams.get('coach');
    
    this.storageService.getActualAthlete().then(res=>{
      this.actualAthlete = res;
      this.planName = res.planName;
      this.storageService.getActualID().then(ress=>{
        this.id = ress;
        this.coachService.getCoaches().subscribe(res =>{
          this.coaches = res;
          for (let c of this.coaches){
            if(c.uid == this.coach.uid){
              this.coachId = c.id;
              
            }
          }
        })
      })
    })
  }

  subscribeToPlan(fee){
    this.actualAthlete.planName = fee;
    this.actualAthlete.coach = this.coach.uid;
    let day = new Date();
    let month = day.getMonth()+2
    this.actualAthlete.payDay = day.getDate()+"-"+month
    
    
    let fees : Fee[] = this.coach.fees;
    let count=-1
    for (let f of fees){ 
      count ++;
      if(f.name == fee){    
        f.members.push(this.actualAthlete.uid)
        this.coach.fees[count].members = f.members;  
        this.coachService.updateCoach(this.coach, this.coachId)
      }
    }
    
    this.storageService.updateActualAthlete(this.actualAthlete);
    this.athleteService.updateAthlete(this.actualAthlete, this.id)
    this.showToast('Plan contratado, suscripción a entrenador completada');
    let notification: Notifycation = {
      receiver: this.coach.uid,
      message: 'Se ha suscrito ' + this.actualAthlete.name + ' ' + this.actualAthlete.lastName + ' a su plan ' + this.actualAthlete.planName,
      date: new Date(),
      red: false,
      image: this.actualAthlete.avatar,
      title: 'Nuevo miembro',
      expanded: false

    }
  
    this.notService.addNotifycation(notification);
    this.router.navigateByUrl('tabs/coachProfile').then(()=>{
      this.modal.dismiss();
      
    })
    

  }

  cancelPlan(fee){
    this.actualAthlete.planName = fee;
    this.actualAthlete.coach = this.coach.uid;
    this.actualAthlete.payDay = "";
    let fees : Fee[] = this.coach.fees;
    let count = -1;
    for (let f of fees){ 
      count++;
      if(f.name == fee){ 
        f.members.splice(1)
        this.coach.fees[count].members = f.members
        this.coachService.updateCoach(this.coach, this.coachId).then(()=>{
          this.actualAthlete.planName = "";
          this.actualAthlete.coach = "";
          this.storageService.updateActualAthlete(this.actualAthlete);
          this.athleteService.updateAthlete(this.actualAthlete, this.id).then(()=>{
            this.showToast('Plan Cancelado, desuscripción completada');
      
            let notification: Notifycation = {
              receiver: this.coach.uid,
              message:  this.actualAthlete.name + ' ' + this.actualAthlete.lastName + ' ha cancelado sus suscripción a su plan ' + this.actualAthlete.planName,
              date: new Date(),
              red: false,
              image: this.actualAthlete.avatar,
              title: 'Miebro desuscrito',
              expanded: false
            }
          
            this.notService.addNotifycation(notification);
            
            this.router.navigateByUrl('tabs/myCoach').then(()=>{
              this.modal.dismiss();
            })
            
          })
          
        })
      }
    }
    

    

    
  }

  async showToast(msg){
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
}
