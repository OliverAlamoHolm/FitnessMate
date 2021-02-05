import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyCoachPageRoutingModule } from './my-coach-routing.module';

import { MyCoachPage } from './my-coach.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyCoachPageRoutingModule
  ],
  declarations: [MyCoachPage]
})
export class MyCoachPageModule {}
