import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeeModalPage } from './fee-modal.page';

const routes: Routes = [
  {
    path: '',
    component: FeeModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeeModalPageRoutingModule {}
