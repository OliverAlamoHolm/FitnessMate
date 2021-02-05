import { Component, OnInit } from '@angular/core';
import {ExerciseService} from '../../../services/common/exercise.service'

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.page.html',
  styleUrls: ['./exercises.page.scss'],
})
export class ExercisesPage implements OnInit {

  exercises = [];

  constructor(private exercisesService: ExerciseService) { }

  ngOnInit() {
    this.exercises = this.exercisesService.getExercises();
  }

}
