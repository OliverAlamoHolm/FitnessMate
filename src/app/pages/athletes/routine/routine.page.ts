import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {StorageService} from '../../../services/common/storage.service';
import {ExerciseService, Day2, Routine, Exercise} from '../../../services/common/exercise.service';
import {AthleteService, Athlete} from '../../../services/athletes/athlete.service';
import { ModalController } from '@ionic/angular';
import {ExModalPage} from '../ex-modal/ex-modal.page';
import {NotesModalPage} from '../../common/notes-modal/notes-modal.page';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.page.html',
  styleUrls: ['./routine.page.scss'],
})
export class RoutinePage implements OnInit {

  actualAthlete: Athlete;
  routine: any;
  exercises = [];

  constructor(private router: Router, private storageService: StorageService, 
    private exercisesService: ExerciseService, private modalCtrl: ModalController,
    private athService: AthleteService) { }

  ngOnInit() {

    this.storageService.getActualAthlete().then(res =>{

      this.athService.getAthletes().subscribe(res2 =>{
        for(let a of res2){
          if(a.idd == res.idd){
            this.routine = a.exerciseRoutine.week;
            this.exercises = this.exercisesService.getExercises();
          }
        }
      })
    })
    
  }

  goInfo(){
    this.router.navigateByUrl('exercises')
  }

  async openExercise(name){
    let modal = await this.modalCtrl.create({
      component: ExModalPage,
      cssClass: 'ex-modal',
      componentProps: {
        exercise: name,
       
      }
    });

    modal.present();
  }

  async openNoteModal(notes){
    let modal = await this.modalCtrl.create({
      component: NotesModalPage,
      cssClass: 'notes-modal',
      componentProps: {
        note: notes
        
      }
    });
    modal.present();
  }
}
