import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {StorageService} from '../../services/common/storage.service';
import {Router} from "@angular/router";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AthleteGuard implements CanActivate {
  constructor( private router: Router, private storageService: StorageService){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let rol;
      this.storageService.getActualUser().then(res =>{
        rol = res.rol;
        if (rol != 'athlete'){
          this.router.navigate(['tabs/coachHome'])
          return false;
        }
      })
      return true;
  }
  
}
