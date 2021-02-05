import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AthleteChatPageRoutingModule } from './athlete-chat-routing.module';

import { AthleteChatPage } from './athlete-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AthleteChatPageRoutingModule
  ],
  declarations: [AthleteChatPage]
})
export class AthleteChatPageModule {}
