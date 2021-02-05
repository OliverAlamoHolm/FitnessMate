import { Component, OnInit } from '@angular/core';
import {AthleteService, Athlete} from '../../../services/athletes/athlete.service';
import {StorageService} from '../../../services/common/storage.service';
import {AlertController} from '@ionic/angular';
import {NotifycationsService, Notifycation} from '../../../services/common/notifycations.service';
import {Coach, CoachService} from '../../../services/coaches/coach.service';

@Component({
  selector: 'app-coach-clients',
  templateUrl: './coach-clients.page.html',
  styleUrls: ['./coach-clients.page.scss'],
})
export class CoachClientsPage implements OnInit {

  athletes: Athlete[] = []
  clients: Athlete[] = []
  actualCoach: Coach;
  plans=[]

  actualAthlete: Athlete;

  constructor(private athleteService: AthleteService, private storageService: StorageService,
    private alert: AlertController, private coachService: CoachService) { }

  ngOnInit() {
    this.storageService.getActualUID().then(uid =>{
      this.coachService.getCoaches().subscribe(coach =>{
        for(let c of coach){
          if(c.uid == uid){
            this.actualCoach = c; 
            this.plans = c.fees;
            this.athleteService.getAthletes().subscribe(res =>{
              this.athletes = res;
              console.log(this.athletes)
            })
          }

        }
      })
      
    })

    
  }

  async alertDeleteClient(plan, cli){
    const alert = await this.alert.create({
        header: 'Eliminar Usuario',
        message: '¿Está seguro de que quiere eliminar este usuario de sus clientes?',
        buttons: [
            {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                    console.log('Confirm Cancel');
                }
            }, {
                text: 'Ok',
                handler: () => {

                  this.deleteClient(plan, cli);
                }
            }
        ]
    });

    await alert.present();

  }

  deleteClient(plan, cli){
    let index = -1;
    for(let p of this.actualCoach.fees){
      
      index++;
      if(plan.name == p.name){
        let members = this.actualCoach.fees[index].members.splice(1);
        this.actualCoach.fees[index].members = members

        for(let a of this.athletes){
          if(a.uid == cli){
            this.actualAthlete = a;
            this.actualAthlete.planName = "";
            this.actualAthlete.coach = "";
          }

        }

        
          this.coachService.updateCoach(this.actualCoach, this.actualCoach.idd).then(()=>{
            this.athleteService.updateAthlete(this.actualAthlete, this.actualAthlete.idd).then(()=>{
              this.storageService.updateActualCoach(this.actualCoach)
            })
            
          })
      
        

      }
    }



  }
  
  

}
