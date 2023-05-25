import { Injectable } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { UserDbService } from './user-db.service';
import { TUser } from '../types/user';
import { User } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoggedUser {
  loggedUser$!: Subscription;
  loggedUser!: TUser;

  constructor(
    private authGuard: AuthGuard,
    private userService: UserDbService
  ) {
    this.getLoggedUser();
  }

  getLoggedUser(): void {
    const authUser: User = this.authGuard.getAuthUser();
    const authUserID: string = authUser.uid;
    this.loggedUser$ = this.userService
      .getUserById$(authUserID)
      .subscribe((user: TUser): void => {
        this.loggedUser = user;
      });
  }
}
