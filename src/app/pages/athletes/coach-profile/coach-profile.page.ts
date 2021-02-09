import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CoachService, Coach} from '../../../services/coaches/coach.service'
import { Athlete, AthleteService } from 'src/app/services/athletes/athlete.service';
import {StorageService} from '../../../services/common/storage.service'
import {Router} from '@angular/router';
import {Fee} from '../../../services/coaches/fee.service';
import {ModalController} from "@ionic/angular";
import {TrainerFeePage} from '../trainer-fee/trainer-fee.page'
import {Chat, ChatService, Message} from '../../../services/common/chat.service';
import {Notifycation, NotifycationsService} from '../../../services/common/notifycations.service';
import{IPayPalConfig, ICreateOrderRequest} from 'ngx-paypal'
import {PaymentModalPage} from '../payment-modal/payment-modal.page';
import {ToastController} from '@ionic/angular'

@Component({
  selector: 'app-coach-profile',
  templateUrl: './coach-profile.page.html',
  styleUrls: ['./coach-profile.page.scss'],
  
})
export class CoachProfilePage implements OnInit {

  actualAthlete: Athlete;
  actualUID: string;
  cUID : string;
  actualCoach: Coach;
  coaches: Coach[] = [];
  actualCName: string;
  actualCBio: string;
  actualCMail: string;
  actualCInstagram: string;
  actualCFacebook: string;
  actualCLinkedin: string;
  actualCAvatar: string;
  actualCUID:string;
  actualClastName: string;
  actualPlanName: string;
  fees: Fee[];
  feesIt=[];
  tabSelector: boolean;
  chats = [];

  today: string;
  payDay;
  havICoach = '';


  

  constructor(private route: ActivatedRoute, private coachService: CoachService, 
    private storageService: StorageService, private athleteService: AthleteService,
     private router: Router, private modalCtrl: ModalController, private chatService: ChatService,
     private notsService: NotifycationsService, private toastController: ToastController) { }

     

  ngOnInit() {
    this.tabSelector = true;
    
    this.storageService.getActualAthlete().then(res =>{
      this.actualAthlete = res;
      this.havICoach = res.coach;
      this.cUID = res.coach
      this.actualPlanName = res.planName;
      this.athleteService.getAthlete(this.actualAthlete.idd).subscribe(res=>{
        this.actualAthlete = res;
        this.payDay = res.payDay
        this.today = (new Date().getUTCDate() + "-" + (new Date().getUTCMonth()+1));
      })

      
      this.storageService.getActualUID().then(res =>{
        this.actualUID = res;
        this.chatService.getChats().subscribe(res =>{
          this.chats = res;
          if (this.cUID == ""){
            this.cUID = this.route.snapshot.params['uid'];
          }
          this.coachService.getCoaches().subscribe(res =>{
            this.coaches = res;           
            for (let coach of this.coaches){
              if(coach.uid == this.cUID){
                this.actualCoach = coach;
                this.actualCName = coach.name + ' ' +coach.lastName;
                this.actualCInstagram = coach.instagram;
                this.actualCFacebook = coach.facebook;
                this.actualCLinkedin = coach.linkedin;
                this.actualCAvatar = coach.avatar;
                this.actualCMail = coach.mail;
                this.actualCUID = coach.uid;
            
                this.fees = coach.fees;
                this.feesIt = coach.fees;
                this.actualCBio = coach.bio; 
              }
            }
          })  
        })
      })
    }) 
  }

  changeTab(bool: boolean){
    this.tabSelector = bool;  
  }

  goToMessaging(){
    let count = 0;
    if (this.chats.length > 0){
      for (let chat of this.chats){
        let users = chat.users;
        if(users.includes(this.actualUID) && users.includes(this.actualCoach.uid)){
          this.router.navigate(['/coach-messaging', chat.idn, this.actualCoach.uid, this.actualCoach.name + ' ' + this.actualCoach.lastName, this.actualCoach.avatar] )  
          break; 
        }else{
          count ++;
        }
        
      } 
      
    }
    if (count == this.chats.length){
      this.createChat(); 
    }    
  }

  async openFee(fee){
    let f: Fee = fee
    let modal = await this.modalCtrl.create({
      component: TrainerFeePage,
      cssClass: 'trainer-fee',
      componentProps: {
        fee: f,
        coach: this.actualCoach
      }
    });
    modal.present();
  }


  public createChat(){

    let chat: Chat = {
      idn: '',
      users : [this.actualCoach.uid, this.actualUID],
      messages: [],
    }
    this.chatService.addChat(chat).then(()=>{
      for (let chatt of this.chats){
        let users = chatt.users;
        if(users.includes(this.actualUID) && users.includes(this.actualCoach.uid)){
          chat.idn = chatt.id;
          this.chatService.updateChat(chat, chatt.id).then(()=>{
            this.router.navigate(['/coach-messaging', chat.idn, this.actualCoach.uid])
          }); 
          let notification: Notifycation = {
            receiver: this.actualCoach.uid,
            message: this.actualAthlete.name + ' ' + this.actualAthlete.lastName + ' ha comenzado a chatear contigo, contestale.',
            date: new Date(),
            red: false,
            image:this.actualCAvatar,
            title:'Tienes nuevos mensajes',
            expanded: false
          }
        
          this.notsService.addNotifycation(notification);      
        }
      }
      
    });
    
  }

  async payFee(){

    let actualFeePrice;
    let actuaFeeName;
    for(let f of this.feesIt){
      if (this.actualPlanName == f.name){
        actualFeePrice = f.price.toString() + '.00';
        actuaFeeName = f.name;
      }
    }
   
    let modal = await this.modalCtrl.create({
      component: PaymentModalPage,
      cssClass: 'payment-modal',
      componentProps: {
        feeName: actuaFeeName,
        price: actualFeePrice,
        coach: this.actualCoach
      }
    });
    modal.present();

  }


  goToSocialMedia(link){
    if(link == 1 && this.actualCInstagram != ""){
      window.open(this.actualCInstagram)
    }
    if(link == 2 && this.actualCInstagram != ""){
      window.open(this.actualCFacebook )
    }
    if(link == 3 && this.actualCInstagram != ""){
      window.open(this.actualCLinkedin)
    }


  }


  cancelPlan(){
    
    let notification: Notifycation = {
      receiver: this.actualCoach.uid,
      message:  this.actualAthlete.name + ' ' + this.actualAthlete.lastName + ' ha cancelado sus suscripción a su plan ' + this.actualAthlete.planName,
      date: new Date(),
      red: false,
      image: this.actualAthlete.avatar,
      title: 'Miebro desuscrito',
      expanded: false
    }
  
    this.notsService.addNotifycation(notification);
    let i1 = -1;
    let i2 = -1;
    for(let f of this.actualCoach.fees){
      i1++;
      if (f.name == this.actualAthlete.planName){
        let members = f.members;
        for(let m of f.members){
          i2++;
          if(m == this.actualAthlete.uid){
            members.splice(i2, 1)
            this.actualCoach.fees[i1].members = members;
            this.coachService.updateCoach(this.actualCoach, this.actualCoach.idd).then(()=>{
              this.actualAthlete.planName = "";
              this.actualAthlete.coach = "";
              
              this.athleteService.updateAthlete(this.actualAthlete, this.actualAthlete.idd).then(()=>{
                this.storageService.updateActualAthlete(this.actualAthlete);
                this.showToast('Plan Cancelado, desuscripción completada');
              })
            })
              
          }
            
          
        }
        
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


  
}
