import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainerFeePage } from './trainer-fee.page';

const routes: Routes = [
  {
    path: '',
    component: TrainerFeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainerFeePageRoutingModule {}
