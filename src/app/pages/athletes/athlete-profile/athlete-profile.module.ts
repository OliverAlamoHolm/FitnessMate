import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AthleteProfilePageRoutingModule } from './athlete-profile-routing.module';

import { AthleteProfilePage } from './athlete-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AthleteProfilePageRoutingModule
  ],
  declarations: [AthleteProfilePage]
})
export class AthleteProfilePageModule {}
