import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AthleteMessagesPage } from './athlete-messages.page';

const routes: Routes = [
  {
    path: '',
    component: AthleteMessagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AthleteMessagesPageRoutingModule {}
