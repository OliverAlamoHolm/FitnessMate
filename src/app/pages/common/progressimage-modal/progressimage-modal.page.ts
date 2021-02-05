import { Component, OnInit } from '@angular/core';
import {NavParams, ModalController} from '@ionic/angular';

@Component({
  selector: 'app-progressimage-modal',
  templateUrl: './progressimage-modal.page.html',
  styleUrls: ['./progressimage-modal.page.scss'],
})
export class ProgressimageModalPage implements OnInit {


  image: string;

  constructor(private navParams: NavParams) { }

  ngOnInit() {
    this.image = this.navParams.get('id');
  }

}
