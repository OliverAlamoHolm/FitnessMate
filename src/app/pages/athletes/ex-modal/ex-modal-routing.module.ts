import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExModalPage } from './ex-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ExModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExModalPageRoutingModule {}
