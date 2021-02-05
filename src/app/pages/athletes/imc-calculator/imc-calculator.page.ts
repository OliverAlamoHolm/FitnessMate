import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-imc-calculator',
  templateUrl: './imc-calculator.page.html',
  styleUrls: ['./imc-calculator.page.scss'],
})
export class ImcCalculatorPage implements OnInit {

  weight: number = 85;
  heigh: number = 183;
  age: number = 25;
  gender:string = "male";
  neck: number = 37;
  waist:number = 86;
  hips: number = 0;

  IMC:number;
  bodyFat: number;
  mgMass: number = null;

  constructor() { }

  ngOnInit() {
  }


  calculate(){


    this.IMC = this.weight/((this.heigh/100)*(this.heigh/100))
    this.neck = this.neck * 0.393701;
    this.waist = this.waist * 0.393701;
    this.heigh = this.heigh * 0.393701;
    this.hips = this.hips * 0.393701;

    if(this.gender == "male"){
      this.bodyFat = 86.010 * Math.log10(this.waist - this.neck) - 70.041 * Math.log10(this.heigh) + 36.76
    }else{
      if (this.gender == "female"){
        this.bodyFat = 163.205 * Math.log10(this.waist + this.hips - this.neck) - 97.684 * Math.log10(this.heigh) - 78.387
      }
    }
    this.mgMass = this.weight - ((this.bodyFat/100)*this.weight)

    this.neck = null;
    this.waist = null;
    this.heigh = null;
    this.hips = null;
    this.weight = null;
    this.age = null;


   


  }

}
