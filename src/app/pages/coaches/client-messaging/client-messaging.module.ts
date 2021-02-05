import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientMessagingPageRoutingModule } from './client-messaging-routing.module';

import { ClientMessagingPage } from './client-messaging.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientMessagingPageRoutingModule
  ],
  declarations: [ClientMessagingPage]
})
export class ClientMessagingPageModule {}
