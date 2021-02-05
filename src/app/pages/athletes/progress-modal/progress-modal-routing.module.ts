import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgressModalPage } from './progress-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ProgressModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgressModalPageRoutingModule {}
