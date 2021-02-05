import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoachProfilePage } from './coach-profile.page';

const routes: Routes = [
  {
    path: '',
    component: CoachProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoachProfilePageRoutingModule {}
