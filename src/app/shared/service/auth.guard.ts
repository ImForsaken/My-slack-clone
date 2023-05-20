import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { StoreService } from './store.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(public store: StoreService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): boolean | Promise<boolean> | Observable<boolean | UrlTree> {
    return this.store.userAuth$.pipe(
      take(1),
      map((user) => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['']);
      })
    );
  }
}
