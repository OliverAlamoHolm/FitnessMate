import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeCoachPage } from './home-coach.page';

const routes: Routes = [
  {
    path: '',
    component: HomeCoachPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeCoachPageRoutingModule {}
