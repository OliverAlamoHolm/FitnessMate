import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FoodService} from "../../../services/common/food.service";

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.page.html',
  styleUrls: ['./food-details.page.scss'],
})
export class FoodDetailsPage implements OnInit {

  fName = null;
  foods = [];
  fCalories;
  fProteins;
  fCarbs;
  fFat;
  inputGr = 100;

  constructor(private route: ActivatedRoute, private foodService: FoodService) {
   }

  ngOnInit() {
    this.fName = this.route.snapshot.params['name'];
    this.foods = this.foodService.getFood();
    for (let food of this.foods){
      for(let f of food.products){
        if (f.name == this.fName){
          this.fCalories = f.calories;
          this.fProteins = f.protein;
          this.fCarbs = f.carbs;
          this.fFat = f.fat;
        }
      }
    }
  }
}
