import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/shared/service/store.service';
import { TUser } from 'src/app/shared/types/user';
import { UserSettingsComponent } from '../user-settings/user-settings.component';
import { UiService } from 'src/app/shared/service/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  user!: TUser;
  subUser$!: Subscription;

  constructor(
    private storeService: StoreService,
    public dialog: MatDialog,
    private uiService: UiService) {}

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
    const dialogRef = this.dialog.open(UserSettingsComponent, {
      data: { user: this.user },
    });
  }

  resetLabel() {
    this.uiService.activeLabel = null;
    this.uiService.labelSubject$.next(null);
  }

  ngOnDestroy(): void {
    this.subUser$.unsubscribe();
  }
}
