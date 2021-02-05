import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImcCalculatorPage } from './imc-calculator.page';

const routes: Routes = [
  {
    path: '',
    component: ImcCalculatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImcCalculatorPageRoutingModule {}
