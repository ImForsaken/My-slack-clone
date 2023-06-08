import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/shared/service/store.service';
import { UserDbService } from 'src/app/shared/service/user-db.service';
import { TUser } from 'src/app/shared/types/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  user!: TUser;
  subUser$!: Subscription;
  userLoaded: boolean = false;

  constructor(
    private storeService: StoreService,
    private userService: UserDbService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.subUser$ = this.storeService.currentUser$.subscribe((user) => {
      console.log('header comp')
      if (user) {
        this.user = user;
        this.user.isOnline = true;
        this.userLoaded = true;
      }
    });
    setTimeout(() => {
      if (this.user) {
        console.log('möchte user updaten')
        this.onUpdateUser(this.storeService.authLoggedUserUID, this.user);
      }
    }, 500);
  }

  onUpdateUser(userID: string, user: TUser): void {
    this.userService.updateUser(userID, user);
  }

  logoutUser(): void {
    this.user.isOnline = false;
    console.log('möchte user ausloggen');
    
    // this.onUpdateUser(this.storeService.authLoggedUserUID, this.user);
    this.storeService.logout();
  }

  ngOnDestroy(): void {
    this.subUser$.unsubscribe();
  }
}
