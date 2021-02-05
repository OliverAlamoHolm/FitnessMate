import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanningsPageRoutingModule } from './plannings-routing.module';

import { PlanningsPage } from './plannings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanningsPageRoutingModule
  ],
  declarations: [PlanningsPage]
})
export class PlanningsPageModule {}
