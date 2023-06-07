import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/shared/service/store.service';
import { UserDbService } from 'src/app/shared/service/user-db.service';
import { TUser } from 'src/app/shared/types/user';
import { ProfileSettingsDialogComponent } from './profile-settings-dialog/profile-settings-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  user!: TUser;
  subUser$!: Subscription;
  userLoaded: boolean = false;
  userId?: string;

  constructor(
    private storeService: StoreService,
    private userService: UserDbService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.subUser$ = this.storeService.currentUser$.subscribe((user) => {
      if (user) {
        console.log(user);
        this.user = user;
        this.user.isOnline = true;
        this.userLoaded = true;
        this.userId = user.id;
      }
    });
    setTimeout(() => {
      if (this.user) {
        this.onUpdateUser(this.storeService.authLoggedUserUID, this.user);
      }
    }, 500);
  }

  onUpdateUser(userID: string, user: TUser): void {
    this.userService.updateUser(userID, user);
  }

  logoutUser(): void {
    this.user.isOnline = false;
    this.onUpdateUser(this.storeService.authLoggedUserUID, this.user);
    this.storeService.logout();
  }

  ngOnDestroy(): void {
    this.subUser$.unsubscribe();
  }

  openSettingsDialog() {
    const dialogRef = this.dialog.open(ProfileSettingsDialogComponent, {
      data: { userId: this.userId },
    });
  }
}
