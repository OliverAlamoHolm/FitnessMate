import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule} from 'angularfire2';
import {environment} from "../environments/environment";
import { AngularFirestoreModule} from 'angularfire2/firestore';
import { AngularFireAuthModule} from '@angular/fire/auth'
import {AngularFireDatabase} from 'angularfire2/database';


import {IonicStorageModule} from '@ionic/storage'
import { FeeModalPageModule } from './pages/coaches/fee-modal/fee-modal.module';
import { TrainerFeePageModule } from './pages/athletes/trainer-fee/trainer-fee.module';
import { TrainingplanModalPageModule } from './pages/coaches/trainingplan-modal/trainingplan-modal.module';
import { DietplanModalPageModule } from './pages/coaches/dietplan-modal/dietplan-modal.module';
import {ProgressModalPageModule} from './pages/athletes/progress-modal/progress-modal.module';

import {AngularFireStorageModule} from '@angular/fire/storage';
import { ExModalPageModule } from './pages/athletes/ex-modal/ex-modal.module';
import { NotesModalPageModule } from './pages/common/notes-modal/notes-modal.module';
import { MacrosModalPageModule } from './pages/common/macros-modal/macros-modal.module';

//paypal
import { NgxPayPalModule } from 'ngx-paypal';
import { ServiceWorkerModule } from '@angular/service-worker';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AngularFireModule.initializeApp(environment.firebase),
  AngularFirestoreModule, AngularFireAuthModule, IonicStorageModule.forRoot(), FeeModalPageModule, TrainerFeePageModule,
  TrainingplanModalPageModule, DietplanModalPageModule, AngularFireStorageModule, ExModalPageModule, ProgressModalPageModule, NotesModalPageModule,
  MacrosModalPageModule, NgxPayPalModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}