import { Component, OnInit } from '@angular/core';
import {Athlete, AthleteService} from '../../../services/athletes/athlete.service';
import {FoodService, Food, Meal, Day, Diet} from '../../../services/common/food.service';
import { Coach } from 'src/app/services/coaches/coach.service';
import {NavParams, ModalController} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import {ToastController} from '@ionic/angular'
import {Notifycation, NotifycationsService} from '../../../services/common/notifycations.service';


@Component({
  selector: 'app-dietplan-modal',
  templateUrl: './dietplan-modal.page.html',
  styleUrls: ['./dietplan-modal.page.scss'],
})
export class DietplanModalPage implements OnInit {

  // Parameters
  client: Athlete;
  athletes = [];
  foods: any[];
  clientId: string;
  day: string;
  fds: any[];

  //NgModels
  meal: string;
  mealDate: string;
  category: string;
  foodCuantity: number;
  foodName: string = '';
  
  // Macros
  foodFat: number;
  foodCals: number;
  foodProts: number;
  foodCarbs: number;
  
  // Objects
  nMeal : Meal = {
    name: '',
    meal: [],
    hour: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  }

  dietDay  : Day = {
    name: '',
    number: 0,
    totalCals: 0,
    totalProts: 0,
    totalFat: 0,
    totalCarbs: 0,
    plan: []
  };
  dietDiet : Diet = null;
  avatar: string;

  

  constructor(private navCtrl: NavController, private athleteService: AthleteService,
    private foodService: FoodService, private navParams: NavParams, private toastController: ToastController,
    private modalController: ModalController, private notsService: NotifycationsService) { }

  ngOnInit() {
    
    this.client = this.navParams.get('client');
    this.day = this.navParams.get('day');
    this.avatar = this.navParams.get('avatar');
    this.foods = this.foodService.getFood();
    this.athleteService.getAthletes().subscribe(res =>{
      this.athletes = res;
      for(let athlete of this.athletes){
        if (athlete.uid == this.client.uid){
          this.client = athlete;
          this.clientId = athlete.id;
          this.dietDiet = athlete.diet;
          this.dietDay = athlete.diet.diet[this.day];
          this.dietDay.totalProts = 0;
          this.dietDay.totalCals = 0;
          this.dietDay.totalCarbs = 0;
          this.dietDay.totalFat = 0;
          this.dietDay.plan = [];

        }
      }
    })
    
  }

  addFoodToMeal(){  
    this.nMeal.hour = this.mealDate;
    this.nMeal.name = this.meal;
    if(this.nMeal.name != '' && this.nMeal.hour != null && this.foodName!='' && this.foodCuantity != null){   
      let food: Food = {
        cuantity: 0,
        name: '',
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
      }
      food.name = this.foodName;
      food.cuantity = this.foodCuantity;
      food = this.setFoodMacros(food);

      this.nMeal.meal.push(food)
      this.nMeal = this.setMealMacros(this.nMeal, food)
  
      this.foodName = ''
      this.foodCuantity = null;

    }else{
      this.showToast('Faltan datos!!!')
    }
  }

  setFoodMacros(food){
    let foo = food.name.substring(0, [food.name.length-1]);
    let va = true;
    for(let cats of this.foods){    
      for(let f of cats.products){
        if(f.name == foo){
          food.calories = (f.calories * food.cuantity)/100;
          food.protein = (f.protein * food.cuantity)/100;
          food.carbs = (f.carbs * food.cuantity)/100;
          food.fat = (f.fat * food.cuantity)/100;
        }
      }
    }
    return food;
  }

  setMealMacros(nMeal, food){
    this.nMeal.calories += food.calories;
    this.nMeal.protein += food.protein;
    this.nMeal.carbs += food.carbs;
    this.nMeal.fat += food.fat;
    return nMeal;
  }

  deleteFood(food){
    this.nMeal.meal.splice(food, 1); 
    this.nMeal.calories -= food.calories;
    this.nMeal.protein -= food.protein;
    this.nMeal.carbs -= food.carbs;
    this.nMeal.fat -= food.fat;

  }

  addMealToDay(){
    this.dietDay.plan.push(this.nMeal)
    this.dietDay.totalCals += this.nMeal.calories;
    this.dietDay.totalCarbs += this.nMeal.carbs;
    this.dietDay.totalProts += this.nMeal.protein;
    this.dietDay.totalFat += this.nMeal.fat;
    this.nMeal  = {
      name: '',
      meal: [],
      hour: '' ,
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    }

  }


  finalize(){

    this.dietDiet[this.day] = this.dietDay;
    this.client.diet = this.dietDiet;
    this.athleteService.updateAthlete(this.client, this.clientId);
    this.showToast('Dia de la dieta finalizada');
    let notification: Notifycation = {
      receiver: this.client.uid,
      message: 'Tu entrenador ha actualizado tu rutina de alimentación, observa los nuevos cambios en tu dieta!',
      date: new Date(),
      red: false,
      image: '../../../../assets/diet log.jpg',
      title: 'Actualización en dieta', 
      expanded: false
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
