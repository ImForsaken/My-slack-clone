import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { LabelService } from 'src/app/components/sidenav/label.service';
import { SidenavService } from 'src/app/shared/service/sidenav.service';
import { UserDbService } from 'src/app/shared/service/user-db.service';
import { TUser } from 'src/app/shared/types/user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  sidenavService: SidenavService = inject(SidenavService);

  @ViewChild('threadDrawer') sidenav!: MatSidenav;

  user!: TUser;
  modeValue: MatDrawerMode = 'side';
  isSidenavOpened: boolean = true;

  constructor(
    public dialog: MatDialog,
    public userService: UserDbService,
    public labelService: LabelService
  ) {}

  /**
   * Start all Subscriptions from Database
   */
  ngOnInit(): void {}

  /**
   * switch between two material sidenav modes,
   * for a better device handling.
   */
  toggleSideNav(): void {
    if (window.innerWidth <= 600) {
      this.modeValue = 'over';
    } else {
      this.modeValue = 'side';
    }
  }

  /**
   * close all Subscriptions from Database
   */
  ngOnDestroy(): void {}
}
