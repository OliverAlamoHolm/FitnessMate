import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainingplanModalPage } from './trainingplan-modal.page';

const routes: Routes = [
  {
    path: '',
    component: TrainingplanModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingplanModalPageRoutingModule {}
