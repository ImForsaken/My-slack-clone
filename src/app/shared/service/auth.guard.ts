import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { StoreService } from './store.service';
import { IdTokenResult, User } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  loggedUser!: User;

  constructor(public store: StoreService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): boolean | Promise<boolean> | Observable<boolean | UrlTree> {
    return this.store.userAuth$.pipe(
      take(1),
      map((user) => {
        if (user) {
          this.loggedUser = user;
        }
        const isAuth: boolean = !!user;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['']);
      })
    );
  }

  getAuthUser(): User {
    return this.loggedUser;
  }
}
