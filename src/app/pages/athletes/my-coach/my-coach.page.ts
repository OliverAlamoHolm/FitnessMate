import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../../services/common/storage.service";
import {User} from "../../../services/common/users.service";
import {Athlete, AthleteService} from "../../../services/athletes/athlete.service";
import {Coach, CoachService} from "../../../services/coaches/coach.service";
import {Router} from '@angular/router';


@Component({
  selector: 'app-my-coach',
  templateUrl: './my-coach.page.html',
  styleUrls: ['./my-coach.page.scss'],
})
export class MyCoachPage implements OnInit {

  actualAthlete: Athlete;;
  actualCoach: string;
  coaches = [];
  avatar: string;
  coachName: string;
  wallpaper: string;
  bio: string;
  athletes = []
  actualId: string;
  showSpinner: boolean = true;

  constructor(private storageService: StorageService, private coachService: CoachService,
    private router: Router, private athleteService: AthleteService) { }

  ngOnInit() {
    setTimeout(() =>{
      this.storageService.getActualAthlete().then(res =>{
        this.actualAthlete = res;
        this.actualId = res.idd;
        this.athleteService.getAthletes().subscribe(res =>{
          this.athletes = res;
          for(let ath of this.athletes){
            if (ath.id == this.actualId){
              this.actualCoach = ath.coach;
            }
          }
          this.coachService.getCoaches().subscribe(res =>{
            this.coaches = res;
            this.showSpinner = false;
          })
        })
      })
    },1500)
  }

}
