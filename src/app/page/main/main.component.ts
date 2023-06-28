import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/shared/service/ui.service';
import { SidenavService } from 'src/app/shared/service/sidenav.service';
import { UserDbService } from 'src/app/shared/service/user-db.service';
import { TChannel } from 'src/app/shared/types/chat';
import { TUser } from 'src/app/shared/types/user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('threadDrawer') sidenav!: MatSidenav;

  user!: TUser;
  modeValue: MatDrawerMode = 'side';
  isSidenavOpened: boolean = true;
  chatSubs$!: Subscription;
  activeChannel: TChannel | null = null;
  activeUserChat: TUser | null = null;

  constructor(
    public dialog: MatDialog,
    public userService: UserDbService,
    public uiService: UiService,
    private sidenavService: SidenavService
  ) {}

  /**
   * Start all Subscriptions from Database
   */
  ngOnInit(): void {
    this.getActiveChat();
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

  /**
   * get stored object of Channel or User
   */
  getActiveChat() {
    this.chatSubs$ = this.uiService.labelSubject$.subscribe((label) => {
      if (label) {
        if ('name' in label) {
          this.activeChannel = label;
          this.activeUserChat = null;
        } else if ('username' in label) {
          this.activeUserChat = label;
          this.activeChannel = null;
        }
      } else {
        this.activeUserChat = null;
        this.activeChannel = null;
      }
    });
  }

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
  ngOnDestroy(): void {
    this.chatSubs$.unsubscribe();
  }
}
