import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(private userService:UserService, private router:Router){
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.userService.isAuth();
        if (!user) {
          resolve(true);
        } else {
          reject('you are already logged in');
          this.router.navigateByUrl('/home');
        }
      } catch (error) {
        reject(error);
      }
    });
  }
  
}
