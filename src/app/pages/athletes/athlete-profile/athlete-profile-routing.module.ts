import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AthleteProfilePage } from './athlete-profile.page';

const routes: Routes = [
  {
    path: '',
    component: AthleteProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AthleteProfilePageRoutingModule {}
