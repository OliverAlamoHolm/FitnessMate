import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoachProfilePageRoutingModule } from './coach-profile-routing.module';

import { CoachProfilePage } from './coach-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoachProfilePageRoutingModule
  ],
  declarations: [CoachProfilePage]
})
export class CoachProfilePageModule {}
