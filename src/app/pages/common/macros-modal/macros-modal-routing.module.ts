import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MacrosModalPage } from './macros-modal.page';

const routes: Routes = [
  {
    path: '',
    component: MacrosModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MacrosModalPageRoutingModule {}
