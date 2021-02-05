import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/common/auth.service'
import {StorageService} from '../../../services/common/storage.service'


import { AngularFireStorage } from '@angular/fire/storage';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  files = [];
    uploadProgress = 0;

  constructor(private authService: AuthService, private storageService: StorageService,
    private plt: Platform,
    
    private storage: AngularFireStorage) { }

  ngOnInit() {
  }

  logout(){
    this.authService.logout();
    this.storageService.deleteActualUser().then(()=>{})
    this.storageService.deleteActualCoach().then(()=>{})
    this.storageService.deleteActualAthlete().then(()=>{})
    this.storageService.deleteActualID().then(()=>{})
    this.storageService.deleteActualUID().then(()=>{})
  }


}
