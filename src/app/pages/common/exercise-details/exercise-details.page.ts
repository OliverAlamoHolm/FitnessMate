import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ExerciseService} from '../../../services/common/exercise.service'

@Component({
  selector: 'app-exercise-details',
  templateUrl: './exercise-details.page.html',
  styleUrls: ['./exercise-details.page.scss'],
})
export class ExerciseDetailsPage implements OnInit {

  pName = null;
  exercises = [];
  constructor(private route: ActivatedRoute, private exercisesService: ExerciseService) { }

  ngOnInit() {
    this.pName = this.route.snapshot.params['name'];
    this.exercises = this.exercisesService.getExercises();
  }

}
