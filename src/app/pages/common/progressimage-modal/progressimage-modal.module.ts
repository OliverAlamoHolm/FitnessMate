import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgressimageModalPageRoutingModule } from './progressimage-modal-routing.module';

import { ProgressimageModalPage } from './progressimage-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgressimageModalPageRoutingModule
  ],
  declarations: [ProgressimageModalPage]
})
export class ProgressimageModalPageModule {}
