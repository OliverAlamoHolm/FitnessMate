import { Component, OnInit } from '@angular/core';
import {FoodService} from '../../../services/common/food.service'

@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})
export class FoodPage implements OnInit {

  foods = [];
  constructor(private foodService: FoodService) { }

  ngOnInit() {
    this.foods = this.foodService.getFood();
  }

}
