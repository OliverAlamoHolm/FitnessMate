import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {StorageService} from '../../services/common/storage.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from "@angular/router";
import {map} from "rxjs/operators";
import {isNullOrUndefined} from "util";

@Injectable({
  providedIn: 'root'
})


export class CoachGuard implements CanActivate {

  constructor(private AFauth: AngularFireAuth, private router: Router, private storageService: StorageService){

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let rol;
    this.storageService.getActualUser().then(res =>{
      rol = res.rol;
      if (rol != 'coach'){
        this.router.navigate(['tabs/athleteHome'])
        return false;
      }
    })
    return true;
  }
}
