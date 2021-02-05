import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DietplanModalPage } from './dietplan-modal.page';

const routes: Routes = [
  {
    path: '',
    component: DietplanModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DietplanModalPageRoutingModule {}
