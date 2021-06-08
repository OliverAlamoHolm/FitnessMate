import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/common/auth.service";
import {Router} from "@angular/router";
import { UsersService } from 'src/app/services/common/users.service';
import {ToastController} from '@ionic/angular'


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  password: string;
  email: string;
  password2: string;
  terms: boolean =  false;

  constructor(private authService: AuthService, public router: Router, private userService: UsersService, 
    private toastController: ToastController) { }

  ngOnInit() {
  }

  async onSubmitRegister(){
    if(this.terms == true){
      if (this.email.includes('@') && this.email.includes('.com')){
        if (this.password == this.password2){
          const user = await this.authService.register(this.email, this.password);
            this.authService.sendVerifcationEmail().then(()=>{
              this.router.navigateByUrl('verification')
            })
        }else{
          this.showToast('Las contraseñas no coinciden');
        }
      }else{
        this.showToast('La cuenta de correo no posee el formato correcto')
      }
    }else{
      this.showToast('Debe aceptar las políticas de uso de la aplicación para poder registrarse')
    }
  }


  async showToast(msg){
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
}
