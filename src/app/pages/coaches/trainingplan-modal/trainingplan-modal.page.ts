import { Component, OnInit } from '@angular/core';
import {NavParams, ModalController} from '@ionic/angular';
import {ExerciseService, Day2, Routine, Exercise} from '../../../services/common/exercise.service';
import {Athlete, AthleteService} from '../../../services/athletes/athlete.service';
import {ToastController} from '@ionic/angular'
import {Notifycation, NotifycationsService} from '../../../services/common/notifycations.service';

@Component({
  selector: 'app-trainingplan-modal',
  templateUrl: './trainingplan-modal.page.html',
  styleUrls: ['./trainingplan-modal.page.scss'],
})
export class TrainingplanModalPage implements OnInit {

  client: Athlete;
  athletes = [];
  exes: any[];
  categor: string;
  exs: any[];
  exes2: any[];
  exerciseName: string;
  exerciseReps: number;
  exerciseSeries: number;
  clientId: string;
  dia: string;
  note: string;

  exercise: Exercise = {
    name: '',
    series: 0,
    reps: 0,
    notes: '',
  }
  
  day: Day2 = {
    name: '',
    number: 0,
    muscles: '',
    plan: []
  }

  routine: Routine = {
    week: []
  }

  avatar: string;
  
  constructor(private navParams: NavParams, private exerciseService: ExerciseService,
     private athleteService: AthleteService, private toastController: ToastController, 
     private modalController: ModalController, private notsService: NotifycationsService) {
   } 

  ngOnInit() {
    this.client = this.navParams.get('client');
    this.dia = this.navParams.get('day');
    this.avatar = this.navParams.get('avatar');
    this.exes = this.exerciseService.getExercises();
    this.athleteService.getAthletes().subscribe(res =>{
      this.athletes = res;
      for(let athlete of this.athletes){
        if (athlete.uid == this.client.uid){
          this.clientId = athlete.id;
          this.day = athlete.exerciseRoutine.week[this.dia];
          this.routine = athlete.exerciseRoutine;
        }
      }
    })
  }

  addExercise(){
    this.exercise.name = this.exerciseName;
    this.exercise.reps = this.exerciseReps;
    this.exercise.series = this.exerciseSeries;
    if(this.note == null){
      this.exercise.notes = '';
    }else{
      this.exercise.notes = this.note;
    }
    this.day.plan.push(this.exercise);
    if (this.day.muscles.includes(this.categor)==false){
      this.day.muscles += this.categor + '-'; 
    }
    this.exerciseReps = null;
    this.exerciseSeries = null;
    this.note = null;
    this.exercise = {
      name: '',
      series: 0,
      reps: 0,
      notes: ''
    }
  }

  deleteExercise(index){
    this.day.plan.splice(index, 1); 
    if(this.day.plan.length==0){
      this.day.muscles = "";
    }
  }

  deleteAll(){
    this.day.plan = [];
    this.day.muscles = "";
  }

  updatePlan(){
    this.routine.week[this.dia] = this.day;
    this.client.exerciseRoutine = this.routine;
    this.athleteService.updateAthlete(this.client, this.clientId);
    this.showToast('Dia de la rutina finalizada');
    let notification: Notifycation = {
      receiver: this.client.uid,
      message: 'Tu entrenador ha actualizado tu rutina de entrenamiento para los ' + this.day.name + '.',
      date: new Date(),
      red: false,
      image: '../../../../assets/exercise.jpg',
      expanded:false,
      title: 'Actualización en rutina' 
    }
    this.notsService.addNotifycation(notification);
    this.modalController.dismiss()
  }

  async showToast(msg){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
