import { Component, OnInit } from '@angular/core';
import{IPayPalConfig, ICreateOrderRequest} from 'ngx-paypal'
import {NavParams, ModalController} from '@ionic/angular';
import {ToastController} from '@ionic/angular'
import {Notifycation, NotifycationsService} from '../../../services/common/notifycations.service';
import { Coach } from 'src/app/services/coaches/coach.service';
import {StorageService} from '../../../services/common/storage.service';
import { Athlete, AthleteService } from 'src/app/services/athletes/athlete.service';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.page.html',
  styleUrls: ['./payment-modal.page.scss'],
})
export class PaymentModalPage implements OnInit {

  actualPlanName: string;
  actualFeePrice: string;
  actualCoach: Coach;
  actualAthlete: Athlete;
  actualPaypalId: string;
  public payPalConfig ?: IPayPalConfig

  constructor(private navParams: NavParams, private toastController: ToastController,
    private notsService: NotifycationsService, private storageService: StorageService, 
    private modalController: ModalController, private athleteService: AthleteService) { }

  ngOnInit() {

    this.actualFeePrice = this.navParams.get('price')
    this.actualPlanName = this.navParams.get('feeName')
    this.actualCoach = this.navParams.get('coach')
    this.actualPaypalId = this.actualCoach.paypalId;
    this.storageService.getActualAthlete().then(res =>{
      this.actualAthlete = res;
    })
    this.initConfig();
  }


  private initConfig(): void {
    
    this.payPalConfig = {
      currency: 'EUR',
      clientId: this.actualPaypalId, // add paypal clientId here
      createOrderOnClient: (data) => <ICreateOrderRequest> {
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'EUR',
            value: this.actualFeePrice,
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: this.actualFeePrice
              }
            }
          },
          items: [{
            name: this.actualPlanName,
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'EUR',
              value: this.actualFeePrice,
            },
          }]
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
        size: 'small',
        color: 'blue',
        shape: 'rect'
      },
      onApprove: (data, actions) => {
        //console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          //console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        //console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showToast('Pago realizado con éxito');
        let notification: Notifycation = {
          receiver: this.actualCoach.uid,
          message:  this.actualAthlete.name + ' ' + this.actualAthlete.lastName + ' ha realizado un pago de ' + this.actualFeePrice +  ' euros por la suscripción en ' + this.actualAthlete.planName,
          date: new Date(),
          red: false,
          image: '../../../../assets/money.jpg',
          title: 'Pago recibido',
          expanded: false
        }
        this.notsService.addNotifycation(notification);
        let month = (new Date().getUTCMonth()+2);

        if (month == 13){
          month = 1;
        }

        let date = (new Date().getUTCDate() + "-" + month);

        this.actualAthlete.payDay = date;
        this.athleteService.updateAthlete(this.actualAthlete, this.actualAthlete.idd).then(()=>{
          this.storageService.updateActualAthlete(this.actualAthlete)
          this.modalController.dismiss()
        })
      },
      onCancel: (data, actions) => {
        //console.log('OnCancel', data, actions);

      },
      onError: err => {
        //console.log('OnError', err);
        this.showToast('Error en el pago');
      },
      onClick: (data, actions) => {
        //console.log('onClick', data, actions);
      }
    };
  }

  async showToast(msg){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
