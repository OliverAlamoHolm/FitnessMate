import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyCoachPage } from './my-coach.page';

const routes: Routes = [
  {
    path: '',
    component: MyCoachPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyCoachPageRoutingModule {}
