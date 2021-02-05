import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WhowearePageRoutingModule } from './whoweare-routing.module';

import { WhowearePage } from './whoweare.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WhowearePageRoutingModule
  ],
  declarations: [WhowearePage]
})
export class WhowearePageModule {}
