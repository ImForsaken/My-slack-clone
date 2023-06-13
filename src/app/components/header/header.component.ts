import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/shared/service/store.service';
import { TUser } from 'src/app/shared/types/user';
import { ProfileSettingsDialogComponent } from './profile-settings-dialog/profile-settings-dialog.component';
import { UserDbService } from 'src/app/shared/service/user-db.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  user!: TUser;
  subUser$!: Subscription;

  constructor(private storeService: StoreService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.subUser$ = this.storeService.currentUser$.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  logout(): void {
    this.storeService.logout();
  }

  openSettingsDialog() {
    const dialogRef = this.dialog.open(ProfileSettingsDialogComponent, {
      data: { userId: this.user.id },
    });
  }

  ngOnDestroy(): void {
    this.subUser$.unsubscribe();
  }
}
