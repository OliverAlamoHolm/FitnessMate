import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientMessagingPage } from './client-messaging.page';

const routes: Routes = [
  {
    path: '',
    component: ClientMessagingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientMessagingPageRoutingModule {}
