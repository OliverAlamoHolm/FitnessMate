import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WhowearePage } from './whoweare.page';

const routes: Routes = [
  {
    path: '',
    component: WhowearePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WhowearePageRoutingModule {}
