import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Router} from '@angular/router';
import {StorageService} from '../../../services/common/storage.service';
import {AthleteService, Athlete} from '../../../services/athletes/athlete.service';
import { Chart } from 'chart.js';
import { IonSlides } from '@ionic/angular';
import {MacrosModalPage} from '../../common/macros-modal/macros-modal.page';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-diet',
  templateUrl: './diet.page.html',
  styleUrls: ['./diet.page.scss'],
})
export class DietPage implements OnInit {

  diet2 : any;
  slide: IonSlides;
  aths= [];

  constructor(private router: Router, private storageService: StorageService, 
    private modalCtrl: ModalController, private athService: AthleteService) { }

  ngOnInit() {
    this.storageService.getActualAthlete().then(res =>{
      this.athService.getAthletes().subscribe(res2 =>{
        for(let a of res2){
          if(a.idd == res.idd){
            this.diet2 = a.diet.diet;
            this.showChart(0)
          }
        }
      })
    })
  }

  showChart(event) {
    if (isNaN(event) == true){
      let a;
     event.getActiveIndex().then(data =>{
      a = data
      let i : number = a;
      var ctx = (<any>document.getElementById('yudhatp-chart')).getContext('2d');
      var chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
        labels: [ "Proteinas " ,
                  "Hidratos " ,
                  "Grasas "],
        datasets: [{
              label: "Macronutrientes",
              color: 'rgba(255,255,255)',
              
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
              ],
              hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56"],
              data: [this.diet2[i].totalProts.toString().substring(0,6), 
              this.diet2[i].totalCarbs.toString().substring(0,6),
               this.diet2[i].totalProts.toString().substring(0,6)],
              borderWidth: 1
        }]
       }
      });
    })
    }else{
      let i = event;
      var ctx = (<any>document.getElementById('yudhatp-chart')).getContext('2d');
      var chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
        labels: [ "Proteinas " ,
                  "Hidratos " ,
                  "Grasas "],
        datasets: [{
              label: "Macronutrientes",
              color: 'rgba(255,255,255)',
              
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
              ],
              hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56"],
              data: [this.diet2[i].totalProts.toString().substring(0,6), 
              this.diet2[i].totalCarbs.toString().substring(0,6),
               this.diet2[i].totalFat.toString().substring(0,6)],
              borderWidth: 1
        }]
       }
      });
    }
  }

  async openMacrosModal(plan){
    let modal = await this.modalCtrl.create({
      component: MacrosModalPage,
      cssClass: 'macros-modal',
      componentProps: {
        plan: plan
      }
    });
    modal.present();
  }
}
