import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AthleteMessagesPageRoutingModule } from './athlete-messages-routing.module';

import { AthleteMessagesPage } from './athlete-messages.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AthleteMessagesPageRoutingModule
  ],
  declarations: [AthleteMessagesPage]
})
export class AthleteMessagesPageModule {}
