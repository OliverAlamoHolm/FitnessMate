import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoachClientsPageRoutingModule } from './coach-clients-routing.module';

import { CoachClientsPage } from './coach-clients.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoachClientsPageRoutingModule
  ],
  declarations: [CoachClientsPage]
})
export class CoachClientsPageModule {}
