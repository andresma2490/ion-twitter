import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
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
        const user = await this.userService.getUser();
        if (user) {
          resolve(true);
        } else {
          reject('you have not logged in');
          this.router.navigateByUrl('/login');
        }
      } catch (error) {
        reject(error);
      }
    });
  }
  
}
