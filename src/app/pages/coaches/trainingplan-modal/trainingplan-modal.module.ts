import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrainingplanModalPageRoutingModule } from './trainingplan-modal-routing.module';

import { TrainingplanModalPage } from './trainingplan-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrainingplanModalPageRoutingModule
  ],
  declarations: [TrainingplanModalPage]
})
export class TrainingplanModalPageModule {}
