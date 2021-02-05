import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/common/auth.service'
import {UsersService} from '../../../services/common/users.service'
import {User} from '../../../services/common/users.service'
import {AthleteService} from '../../../services/athletes/athlete.service'
import {CoachService} from '../../../services/coaches/coach.service'
import {StorageService} from "../../../services/common/storage.service";
import { Notifycation, NotifycationsService } from  "../../../services/common/notifycations.service";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  actualUserUID: string;
  actualUserID: string;
  users = [];
  actualUser : User;
  actualRol: string;
  nots = [];
  notifications = 0;

  actualUserCoach : string = null;



  constructor(private authService: AuthService, private userService: UsersService, 
    private storageService: StorageService, private notifycationsService: NotifycationsService, 
    private athleteService: AthleteService, private coachService: CoachService) {
      
  }

  ngOnInit(){
    this.userService.getUsers().subscribe(res => {
      this.users = res;
    });
    this.storageService.getActualUser().then(res =>{
      this.actualUser = res;
      this.actualRol = res.rol
      this.actualUserUID = res.uid;

      this.notifycationsService.getNotifycations().subscribe(res =>{
        this.nots = res;  
        this.notifications = res.length  
        
        if(this.actualRol == "athlete"){
          this.paymentNot();
        }else{
          if (this.actualRol == "coach"){
          }
        }
        
      })
    })
    
  }

  paymentNot(){
    let payDay;
    let ath;
    this.storageService.getActualID().then(res =>{
      this.actualUserID = res;
      this.athleteService.getAthlete(this.actualUserID).subscribe(res =>{
        this.actualUserCoach = res.coach;
        payDay = res.payDay;
        ath = res;
        if(payDay == ((new Date().getUTCDate()+1) + "-" + (new Date().getUTCMonth()+1))){
          let notification: Notifycation = {
            receiver: this.actualUser.uid,
            message:  'Mañana es día de pago. Asegúrese de que su entrenador recibe su pago mensual.',
            date: new Date(),
            red: true,
            image: '',
            title:'Dia de pago',
            expanded: false
          }

          let notificationCoach: Notifycation = {
            receiver: ath.coach,
            message:  'Mañana es día de pago de ' + ath.name + ' ' + ath.lastName + '. Asegúrese de que recibes el pago correctamente.',
            date: new Date(),
            red: true,
            image: '',
            title: 'Pago de cliente',
            expanded: false
          }
          let redNot = true;
          for(let n of this.nots){
            if(n.red == true){
              redNot = false;
            }
          }
          if(redNot == true){
            this.notifycationsService.addNotifycation(notification)
            this.notifycationsService.addNotifycation(notificationCoach)
          }
        }
      })
    
    })
  }

}
