import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevicealertPage } from './devicealert.page';

const routes: Routes = [
  {
    path: '',
    component: DevicealertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevicealertPageRoutingModule {}
