import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanningsPage } from './plannings.page';

const routes: Routes = [
  {
    path: '',
    component: PlanningsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanningsPageRoutingModule {}
