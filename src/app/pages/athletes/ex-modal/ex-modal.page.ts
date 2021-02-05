import { Component, OnInit } from '@angular/core';
import {NavParams} from '@ionic/angular';
import {ExerciseService, Exercise} from '../../../services/common/exercise.service'

@Component({
  selector: 'app-ex-modal',
  templateUrl: './ex-modal.page.html',
  styleUrls: ['./ex-modal.page.scss'],
})
export class ExModalPage implements OnInit {

  exercise;
  exercises = []
  picture: string;

  constructor(private navParams: NavParams, private exercisesService: ExerciseService) { }

  ngOnInit() {
    let y: string = '';
    this.exercise = this.navParams.get('exercise')
    this.exercises = this.exercisesService.getExercises();
    for (let exes of this.exercises){
      for (let a of exes.exercises){
        if(a.name ===  this.exercise.name.substring(0, [this.exercise.name.length-1])){
          this.picture = a.picture;
        }
      }
    }
  }
}
