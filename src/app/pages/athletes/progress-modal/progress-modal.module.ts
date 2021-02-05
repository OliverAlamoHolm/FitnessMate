import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgressModalPageRoutingModule } from './progress-modal-routing.module';

import { ProgressModalPage } from './progress-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgressModalPageRoutingModule
  ],
  declarations: [ProgressModalPage]
})
export class ProgressModalPageModule {}
