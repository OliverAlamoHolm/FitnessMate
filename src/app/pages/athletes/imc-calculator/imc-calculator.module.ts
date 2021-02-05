import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImcCalculatorPageRoutingModule } from './imc-calculator-routing.module';

import { ImcCalculatorPage } from './imc-calculator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImcCalculatorPageRoutingModule
  ],
  declarations: [ImcCalculatorPage]
})
export class ImcCalculatorPageModule {}
