import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoachClientsPage } from './coach-clients.page';

const routes: Routes = [
  {
    path: '',
    component: CoachClientsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoachClientsPageRoutingModule {}
