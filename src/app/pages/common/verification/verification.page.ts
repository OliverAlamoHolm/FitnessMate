import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/common/auth.service";
import {Router} from "@angular/router";
import { UsersService } from 'src/app/services/common/users.service';
import {AngularFireAuth} from '@angular/fire/auth';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {

  private load;
  user;

  constructor(private authService: AuthService, public router: Router, private userService: UsersService,
    private AFauth: AngularFireAuth, private loading: LoadingController) {
     }

  ngOnInit() {

  }
  
  refresh(){  
    window.location.reload()
  }

  watch(){
    this.user = this.AFauth.auth.currentUser
    let bool = this.authService.isEmailVerified(this.user)
    if(bool){
      this.router.navigateByUrl('profile-maker');
    }
  }

  resendMail(){
    this.authService.sendVerifcationEmail()
  }

}
