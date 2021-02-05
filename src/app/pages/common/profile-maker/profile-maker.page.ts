import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import {Router} from "@angular/router";
import { UsersService, User } from 'src/app/services/common/users.service';
import { AuthService } from 'src/app/services/common/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from "rxjs/operators";
import {isNullOrUndefined} from "util";
import { CoachService, Coach } from 'src/app/services/coaches/coach.service';
import { Fee } from 'src/app/services/coaches/fee.service';
import { AthleteService, Athlete } from 'src/app/services/athletes/athlete.service';
import { StorageService } from 'src/app/services/common/storage.service';
import {Message, Chat, ChatService} from '../../../services/common/chat.service';
import {FoodService, Diet, Day} from '../../../services/common/food.service';
import {ExerciseService, Routine, Day2, Exercise} from '../../../services/common/exercise.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import {Notifycation, NotifycationsService} from '../../../services/common/notifycations.service';
import {ToastController} from '@ionic/angular'




@Component({
  selector: 'app-profile-maker',
  templateUrl: './profile-maker.page.html',
  styleUrls: ['./profile-maker.page.scss'],
})


export class ProfileMakerPage implements OnInit {

  @ViewChild('myButton') myButton

  
  user : User = {
    name: '',
    mail: '',
    uid: '',
    rol: '',
  }

  notImage: string;

  rol: string = null;

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;


  actualCoach: Coach;
  actualAthlete: Athlete;
  name: string;
  lastName: string;
  avatar: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv7e8Oa6AaR6ehfKnnNwN44Qhfr-AP3gidcA&usqp=CAU';
  bio:string;
  facebook: string = "";
  instagram: string = "";
  linkedin: string = "";

  athletes  = [];
  coaches = [];
  athlete: Athlete = {
    avatar: 'https://firebasestorage.googleapis.com/v0/b/fitnessmate-fd249.appspot.com/o/avatars%2Frandom%20user.png?alt=media&token=2e63c70c-74ab-4187-be06-ec2aaf971e72',
    name: '',
    idd: '',
    lastName: '',
    uid: '',
    mail: '',
    coach: '',
    planName: '',
    progress: [],
    exerciseRoutine: null,
    diet: null,
    payDay:""
  }

  routine: Routine = {
    week: []
  }

  diett: Diet = {
    diet: []
  }

  dia1: Day2 = {
    name: 'Lunes',
    number: 0,
    muscles: '',
    plan: []
  }
  dia2: Day2 = {
    name: 'Martes',
    number: 1,
    muscles: '',
    plan: []
  }
  dia3: Day2 = {
    name: 'Miercoles',
    number: 2,
    muscles: '',
    plan: []
  }
  dia4: Day2 = {
    name: 'Jueves',
    number: 3,
    muscles: '',
    plan: []
  }
  dia5: Day2 = {
    name: 'Viernes',
    number: 4,
    muscles: '',
    plan: []
  }
  dia6: Day2 = {
    name: 'Sabado',
    number: 5,
    muscles: '',
    plan: []
  }
  dia7: Day2 = {
    name: 'Domingo',
    number: 6,
    muscles: '',
    plan: []
  }


  day1: Day = {
    name: 'Lunes',
    number: 0,
    totalCals: 0,
    totalProts: 0,
    totalFat: 0,
    totalCarbs: 0,
    plan: []
  }

  day2: Day = {
    name: 'Martes',
    number: 1,
    totalCals: 0,
    totalProts: 0,
    totalFat: 0,
    totalCarbs: 0,
    plan: []
  }

  day3: Day = {
    name: 'Miercoles',
    number: 2,
    totalCals: 0,
    totalProts: 0,
    totalFat: 0,
    totalCarbs: 0,
    plan: []
  }

  day4: Day = {
    name: 'Jueves',
    number: 3,
    totalCals: 0,
    totalProts: 0,
    totalFat: 0,
    totalCarbs: 0,
    plan: []
  }

  day5: Day = {
    name: 'Viernes',
    number: 4,
    totalCals: 0,
    totalProts: 0,
    totalFat: 0,
    totalCarbs: 0,
    plan: []
  }

  day6: Day = {
    name: 'Sabado',
    number: 5,
    totalCals: 0,
    totalProts: 0,
    totalFat: 0,
    totalCarbs: 0,
    plan: []
  }

  day7: Day = {
    name: 'Domingo',
    number: 6,
    totalCals: 0,
    totalProts: 0,
    totalFat: 0,
    totalCarbs: 0,
    plan: []
  }

  tabSelector: number;

  

  constructor(public router: Router, private userService: UsersService, private authService: AuthService,
    private AFauth: AngularFireAuth, private coachService: CoachService, private athleteService: AthleteService,
    private storageService: StorageService, private storage: AngularFireStorage
    , public renderer: Renderer2, private notsService: NotifycationsService, private toastController: ToastController) { }

  ngOnInit() {
    this.tabSelector = 1;
    return this.AFauth.authState.subscribe(auth =>{
      this.user.mail = auth.email;
      this.user.uid = auth.uid;
    })
  }

  changeTab(int){
    this.tabSelector = int;
    
  }

  changeRol(rol){
    
    this.rol = rol;
    
    
  }

  onLoad(e){
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `avatars/${this.user.uid}`
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file)
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize (()=>
     this.urlImage = ref.getDownloadURL()

     )).subscribe(()=>{
       //this.updateAvatar(this.urlImage);
        const filePath = `avatars/${this.user.uid}`
        const ref = firebase.storage().ref(filePath).getDownloadURL().then(res=>{
        this.avatar = res;
        console.log(this.avatar)
        
    })
     })
    
  }

  finalize(){

    if (this.name == null || this.lastName ==null  || this.lastName =="" || this.name == ""){
      this.showToast('Faltan datos por introducir')

    }else{
      this.user.rol = this.rol;
      this.user.name = this.name + ' ' + this.lastName
      this.userService.createUser(this.user)
      this.storageService.addActualUser(this.user)
      if(this.rol == 'athlete'){
  
        this.createAthlete()
        
      }else{
        this.createCoach()
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

  createAthlete(){
    this.athlete.name = this.name;
    this.athlete.lastName = this.lastName;
    this.athlete.mail = this.user.mail;
    this.athlete.uid = this.user.uid;
    this.athlete.avatar = this.avatar;
  
    // Creando rutina
    this.routine.week.push(this.dia1);
    this.routine.week.push(this.dia2);
    this.routine.week.push(this.dia3);
    this.routine.week.push(this.dia4);
    this.routine.week.push(this.dia5);
    this.routine.week.push(this.dia6);
    this.routine.week.push(this.dia7);
    this.athlete.exerciseRoutine = this.routine;

    // Creando dieta
    this.diett.diet.push(this.day1)
    this.diett.diet.push(this.day2)
    this.diett.diet.push(this.day3)
    this.diett.diet.push(this.day4)
    this.diett.diet.push(this.day5)
    this.diett.diet.push(this.day6)
    this.diett.diet.push(this.day7)

    this.athlete.diet = this.diett;

    this.athleteService.createAthlete(this.athlete).then(()=>{
      
      this.athleteService.getAthletes().subscribe(res =>{
        this.athletes = res;
  
        for(let ath of this.athletes){     
          if (ath.uid == this.athlete.uid){
            this.athlete.idd = ath.id;
            this.athleteService.updateAthlete(this.athlete, ath.id).then(()=>{
              this.storageService.addActualAthlete(this.athlete).then(()=>{
                this.storageService.addActualId(ath.id).then(()=>{
                  this.storageService.addActualUID(this.athlete.uid).then(()=>{
                    this.router.navigateByUrl('tabs/athleteHome').then(()=>{
                      let not: Notifycation = {
                        receiver: this.user.uid,
                        message: 'Echa un vistazo a la app y comienza por configurar tu perfil',
                        date: new Date(),
                        red: false,
                        image: '../../../../assets/logo.png',
                        title: 'Bienvenido a FitnessMate',
                        expanded: false,
                      }
                      this.notsService.addNotifycation(not)
                      window.location.reload();
                    });
                  });          
                })
              })
            })
          }
        }
      })  
    }) 
  }

      


  createCoach(){

    let coach = {
      name: this.name,
      lastName: this.lastName,
      bio: '',
      idd: '',
      uid: this.user.uid,
      mail: this.user.mail,
      clients: [],
      avatar: this.avatar,
      instagram: '',
      facebook: '',
      linkedin: '',
      fees: [],
      paypalId: ""
    }


    this.coachService.createCoach(coach).then(()=>{
      this.coachService.getCoaches().subscribe(res =>{
        this.coaches = res;
        for(let chs of this.coaches){
          if (chs.uid == coach.uid){
            coach.idd = chs.id;
            this.coachService.updateCoach(coach, chs.id).then(()=>{
              this.storageService.addActualCoach(coach).then(()=>{
                this.storageService.addActualId(chs.id).then(()=>{
                  this.storageService.addActualUID(coach.uid).then(()=>{
                    this.router.navigateByUrl('tabs/coachHome').then(()=>{
                      let not: Notifycation = {
                        receiver: this.user.uid,
                        message: 'Echa un vistazo a la app y comienza por configurar tu perfil',
                        date: new Date(),
                        red: false,
                        image: '../../../../assets/logo.png',
                        title: 'Bienvenido a FitnessMate',
                        expanded: false,
                      }
                      this.notsService.addNotifycation(not)
                      window.location.reload();
                    });
                  }) 
                })
              })
            })
          }
        }
      })
    })
  }

}