import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoachMessagingPageRoutingModule } from './coach-messaging-routing.module';

import { CoachMessagingPage } from './coach-messaging.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoachMessagingPageRoutingModule
  ],
  declarations: [CoachMessagingPage]
})
export class CoachMessagingPageModule {}
