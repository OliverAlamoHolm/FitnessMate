import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {promise} from "protractor";
import rejected = promise.rejected;
import { AngularFirestoreModule, AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";
import { auth} from 'firebase/app';
import * as firebase from 'firebase';
import {ToastController} from '@ionic/angular'

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  actualUserUID: any;
  auth;

  constructor(private AFauth: AngularFireAuth, db: AngularFirestore, private router: Router, 
    private toastController: ToastController) { }

  login(email: string, password: string){
    return new Promise((resolve, rejected) =>{
      this.AFauth.auth.signInWithEmailAndPassword(email, password).then(user =>{
        resolve(user)
        this.auth = user;
        this.actualUserUID = user.user.uid;  
      }).catch(err => this.showToast('Error al iniciar sesión. Compruebe que las credenciales son correctas'))
    })
  }

  logout(){
    this.AFauth.auth.signOut();
    this.router.navigate(['login'])
  }

  register(email:string, password:string){
    return new Promise((resolve, reject)=>{
      this.AFauth.auth.createUserWithEmailAndPassword(email, password).then(res =>{
        resolve(res);
        this.auth = res;
      }).catch(err =>{
        reject(err);
        this.showToast('Este correo ya está registrado en la plataforma. Pruebe con otro.')
      })
    });
  }

  getActualUserUID(){
    return this.actualUserUID;
  }

  async sendVerifcationEmail(): Promise<void> {
    try {
      return (await this.AFauth.auth.currentUser).sendEmailVerification();
    } catch (error) {
      this.showToast('Erro al enviar el correo de verificación')
    }
  }

  async loginGoogle() {
    try {
      const { user } = await this.AFauth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      this.actualUserUID = user.uid; 
    } catch (error) {
      this.showToast('Conexión a cuenta Google fallada')
    }
  }

  isEmailVerified(user): boolean {
    return user.emailVerified === true ? true : false;
  }

  returnActualuth(){
    return this.auth
  }

  async showToast(msg){
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

}
