import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/common/auth.service";
import {Router} from "@angular/router";
import {UsersService} from "../../../services/common/users.service";
import {CoachService} from "../../../services/coaches/coach.service";
import {AthleteService} from "../../../services/athletes/athlete.service";
import {User} from "../../../services/common/users.service";
import {Coach} from "../../../services/coaches/coach.service";
import {Athlete} from "../../../services/athletes/athlete.service"
import {StorageService} from "../../../services/common/storage.service";
import { NavController, LoadingController } from '@ionic/angular';
import {ToastController} from '@ionic/angular'


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;
  users  = [];
  coaches = [];
  athletes = [];
  actualUserUID: string ="";
  actualUser : User;
  actualAthlete: Athlete;
  actualCoach: Coach;
  use: User = <User>{};
  splash = true;
  tabBarElement: any;
  rol: string;
  private load;

  constructor(private authService: AuthService, public router: Router, 
    private storageService: StorageService, private userService: UsersService, 
    private coachService: CoachService, private athleteService: AthleteService,
    public navCtrl: NavController, private loading: LoadingController, 
    private toastController: ToastController) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(res => {
      this.users = res;
      this.coachService.getCoaches().subscribe(coa => {
        this.coaches = coa;
        this.athleteService.getAthletes().subscribe(ath => {
          this.athletes = ath;
        });
      });
    });
    this.ionViewDidLoad();
  }

  // Splash Screen function
  ionViewDidLoad() {
    setTimeout(() => this.splash = false, 4000);
  }
  
  OnSubmitLogin(){
    this.authService.login(this.email, this.password).then(()=>{
      this.actualUserUID = this.authService.getActualUserUID();    
      for (let u of this.users){
        if(u.uid === this.actualUserUID){
          this.actualUser = u;
          this.rol = u.rol;
          // Search the user type to load the correct tab
          if(u.rol === 'athlete'){
            for (let athlete of this.athletes){
              if(u.uid === athlete.uid){
                this.actualAthlete == athlete;
                this.storageService.addActualAthlete(athlete)
                this.storageService.addActualId(athlete.id)
                this.storageService.addActualUID(athlete.uid);
              }
            }
          }else if(u.rol === 'coach'){
            for (let coach of this.coaches){
              if(u.uid === coach.uid){
                this.actualCoach == coach;
                this.storageService.addActualCoach(coach);
                this.storageService.addActualId(coach.id)
                this.storageService.addActualUID(coach.uid);
              }
            }
          }
        }
      }
      this.addActualUser()
    });
  }

  OnSubmitLoginGoogle(){
    
    this.authService.loginGoogle().then(()=>{
      this.actualUserUID = this.authService.getActualUserUID();    
  
      for (let u of this.users){
        if(u.uid === this.actualUserUID){
          this.actualUser = u;
          this.rol = u.rol;
          // Search the user type to load the correct tab
          if(u.rol === 'athlete'){
            for (let athlete of this.athletes){
              if(u.uid === athlete.uid){
                this.actualAthlete == athlete;
                this.storageService.addActualAthlete(athlete)
                this.storageService.addActualId(athlete.id)
                this.storageService.addActualUID(athlete.uid);
                this.addActualUser()

                break;
              }
            }
          }else if(u.rol === 'coach'){
            for (let coach of this.coaches){
              if(u.uid === coach.uid){
                this.actualCoach == coach;
                this.storageService.addActualCoach(coach);
                this.storageService.addActualId(coach.id)
                this.storageService.addActualUID(coach.uid);
                this.addActualUser()
                
                break;
              }
            }
          }
        }
      }
      //setTimeout(() =>this.router.navigateByUrl('profile-maker'), 4000);
      if (this.rol == "" || this.rol == null){
        this.router.navigateByUrl('profile-maker')

      }
      
      
      
    });
  }
  
  // Aux function for user storage and tabNavigation
  addActualUser(){

    //this.loading.create({
    //  spinner: 'bubbles',
    //  message: 'Iniciando Sesión...',
    //  showBackdrop: true,
  //
    //  
    //}).then((overlay) =>{
    //  this.load = overlay;
    //  this.load.present();
//
    //})
    setTimeout(() =>{
      this.storageService.addActualUser(this.actualUser).then(()=>{
        this.storageService.getActualUser().then(item =>{
          this.use = item;
          if(this.rol == 'athlete'){
            this.router.navigateByUrl('/tabs/athleteHome');
            this.load.dismiss();
          }else{
            this.router.navigateByUrl('/tabs/coachHome');
            this.load.dismiss();
          }
        })
      })
    }, 2000) 
  }
}
