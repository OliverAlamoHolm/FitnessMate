import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevicealertPageRoutingModule } from './devicealert-routing.module';

import { DevicealertPage } from './devicealert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevicealertPageRoutingModule
  ],
  declarations: [DevicealertPage]
})
export class DevicealertPageModule {}
