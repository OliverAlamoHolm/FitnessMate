import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeeModalPageRoutingModule } from './fee-modal-routing.module';

import { FeeModalPage } from './fee-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeeModalPageRoutingModule
  ],
  declarations: [FeeModalPage]
})
export class FeeModalPageModule {}
