import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExModalPageRoutingModule } from './ex-modal-routing.module';

import { ExModalPage } from './ex-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExModalPageRoutingModule
  ],
  declarations: [ExModalPage]
})
export class ExModalPageModule {}
