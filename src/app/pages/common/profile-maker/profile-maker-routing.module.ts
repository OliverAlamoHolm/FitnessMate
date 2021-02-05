import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileMakerPage } from './profile-maker.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileMakerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileMakerPageRoutingModule {}
