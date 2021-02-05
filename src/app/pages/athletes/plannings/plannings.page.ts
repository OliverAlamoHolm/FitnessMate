import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-plannings',
  templateUrl: './plannings.page.html',
  styleUrls: ['./plannings.page.scss'],
})
export class PlanningsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToDiet(){
    this.router.navigateByUrl('diet')
  }

  goToRoutine(){
    this.router.navigateByUrl('routine')
  }
}
