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
  user: TUser | null = null;
  subUser$!: Subscription;

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
        this.user = user;
        this.setUserOnline(this.user);
      }
    });
  }

  /**
   * update User in Database
   * @param user
   */
  updateUserDB(user: TUser): void {
    this.userService.updateUser(user.id!, user);
  }

  /**
   * logout current user & set Offline
   */
  logoutUser(): void {
    if (this.user) {
      this.setUserOffline(this.user);
      this.storeService.logout();
    }
  }

  /**
   * change userstat to offline
   * @param user
   */
  setUserOffline(user: TUser): void {
    user.isOnline = false;
    this.updateUserDB(user);
  }

  /**
   * change userstat to onine
   * @param user
   */
  setUserOnline(user: TUser): void {
    user.isOnline = false;
    this.updateUserDB(user);
  }

  openSettingsDialog(): void {
    if (this.user) {
      const dialogRef = this.dialog.open(ProfileSettingsDialogComponent, {
        data: { userId: this.user.id },
      });
    }
  }

  ngOnDestroy(): void {
    this.subUser$.unsubscribe();
  }
}
