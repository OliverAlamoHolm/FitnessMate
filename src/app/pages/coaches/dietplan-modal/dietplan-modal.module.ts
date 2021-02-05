import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DietplanModalPageRoutingModule } from './dietplan-modal-routing.module';

import { DietplanModalPage } from './dietplan-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DietplanModalPageRoutingModule
  ],
  declarations: [DietplanModalPage]
})
export class DietplanModalPageModule {}
