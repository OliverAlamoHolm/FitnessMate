import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrainerFeePageRoutingModule } from './trainer-fee-routing.module';

import { TrainerFeePage } from './trainer-fee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrainerFeePageRoutingModule
  ],
  declarations: [TrainerFeePage]
})
export class TrainerFeePageModule {}
