import { Component, OnInit } from '@angular/core';
import {NavParams} from '@ionic/angular';
import {Meal} from '../../../services/common/food.service';

@Component({
  selector: 'app-macros-modal',
  templateUrl: './macros-modal.page.html',
  styleUrls: ['./macros-modal.page.scss'],
})
export class MacrosModalPage implements OnInit {

  plan: Meal;
  calories: number;
  proteins: number;
  carbs: number;
  fat: number;

  constructor(private navParams: NavParams) { }

  ngOnInit() {
    this.plan = this.navParams.get('plan');
  }
}
