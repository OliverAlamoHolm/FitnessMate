import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotesModalPageRoutingModule } from './notes-modal-routing.module';

import { NotesModalPage } from './notes-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotesModalPageRoutingModule
  ],
  declarations: [NotesModalPage]
})
export class NotesModalPageModule {}
