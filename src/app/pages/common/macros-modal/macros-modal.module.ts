import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MacrosModalPageRoutingModule } from './macros-modal-routing.module';

import { MacrosModalPage } from './macros-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MacrosModalPageRoutingModule
  ],
  declarations: [MacrosModalPage]
})
export class MacrosModalPageModule {}
