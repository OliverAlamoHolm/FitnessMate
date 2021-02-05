import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileMakerPageRoutingModule } from './profile-maker-routing.module';

import { ProfileMakerPage } from './profile-maker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileMakerPageRoutingModule
  ],
  declarations: [ProfileMakerPage]
})
export class ProfileMakerPageModule {}
