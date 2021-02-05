import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgressimageModalPage } from './progressimage-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ProgressimageModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgressimageModalPageRoutingModule {}
