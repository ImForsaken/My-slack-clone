import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  HostListener
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

  private resizeThreshold = 600;
  private hasReachedThreshold = false;
  private previousWidth = window.innerWidth;


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
    this.setSidenavMode();
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
   * Sets the sidenav mode on component initialisation.
   */
  setSidenavMode() {
    const currentWidth = window.innerWidth;
    if (currentWidth > this.resizeThreshold) {
      this.modeValue = 'side';
    } else {
      this.modeValue = 'over';
    }
  }

  /**
   * Opens or closes the sidenav once the innerWidth threshold is exceeded/underrun.
   */
  @HostListener('window:resize')
  onWindowResize() {
    const currentWidth = window.innerWidth;
    const thresholdExceeded = this.previousWidth <= this.resizeThreshold && currentWidth > this.resizeThreshold;
    const thresholdUnderrun = this.previousWidth > this.resizeThreshold && currentWidth <= this.resizeThreshold;

    if (thresholdExceeded && !this.hasReachedThreshold) {
      this.hasReachedThreshold = true;
      this.isSidenavOpened = true;
    } else if (thresholdUnderrun && this.hasReachedThreshold) {
      this.hasReachedThreshold = false;
      this.isSidenavOpened = false;
    }

    this.previousWidth = currentWidth;
  }

  /**
   * close all Subscriptions from Database
   */
  ngOnDestroy(): void {
    this.chatSubs$.unsubscribe();
  }
}
