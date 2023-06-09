import { Injectable, inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { CanActivate } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { StoreService } from './store.service';
import { Auth, User, user } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  loggedUser!: User;
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  constructor(public store: StoreService, private router: Router) {}

  canActivate(): boolean | Promise<boolean> | Observable<boolean | UrlTree> {
    return this.user$.pipe(
      take(1),
      map((user) => {
        if (user) {
          this.loggedUser = user;
        }
        const isAuth: boolean = !!user;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/']);
      })
    );
  }

  getAuthUser(): User {
    return this.loggedUser;
  }
}
