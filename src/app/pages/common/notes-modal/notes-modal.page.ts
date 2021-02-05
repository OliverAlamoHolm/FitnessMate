import { Component, OnInit } from '@angular/core';
import {NavParams} from '@ionic/angular';

@Component({
  selector: 'app-notes-modal',
  templateUrl: './notes-modal.page.html',
  styleUrls: ['./notes-modal.page.scss'],
})
export class NotesModalPage implements OnInit {

  notes: string;

  constructor(private navParams: NavParams) { }

  ngOnInit() {
    this.notes = this.navParams.get('note');

  }

}
