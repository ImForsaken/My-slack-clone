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
  userId!: string;

  constructor(
    private storeService: StoreService,
    private userService: UserDbService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAuthState();
  }

  getAuthState(): void {
    setTimeout(() => {
      const user = this.storeService.auth.currentUser;
      if (user) {
        console.log('signIn', user);
        this.getUser(user.uid);
      } else {
        console.log('no nix');
      }
    }, 1000);
  }

  getUser(userID: string): void {
    this.subUser$ = this.userService.getUserById$(userID).subscribe((user) => {
      this.user = user;
      this.userLoaded = true;
      this.userId = userID;
    });
  }

  logoutUser(): void {
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
