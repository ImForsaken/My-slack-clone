import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { ChannelDbService } from 'src/app/shared/service/channels-db.service';
import { DirectMessageDbService } from 'src/app/shared/service/direct-messages-db.service';
import { SidenavService } from 'src/app/shared/service/sidenav.service';
import { StoreService } from 'src/app/shared/service/store.service';
import { UserDbService } from 'src/app/shared/service/user-db.service';
import { TChannel } from 'src/app/shared/types/chat';
import { TDirectMessages } from 'src/app/shared/types/dm';
import { TUser } from 'src/app/shared/types/user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  sidenavService: SidenavService = inject(SidenavService);

  @ViewChild('threadDrawer') sidenav!: MatSidenav;

  private subLoggedUser$!: Subscription;
  private subAllUsers$!: Subscription;
  private subChannels$!: Subscription;
  private subDirectMessages$!: Subscription;
  user!: TUser;
  subUser$!: Subscription;
  userLoaded: boolean = false;
  isSidenavOpened: boolean = true;

  constructor(
    public dialog: MatDialog,
    public userService: UserDbService,
    private channelService: ChannelDbService,
    private dmService: DirectMessageDbService,
    private storeService: StoreService
  ) {}

  /**
   * Start all Subscriptions from Database
   */
  ngOnInit(): void {
    this.getUser();
    this.getAllUsers();
    this.getAllChannels();
    this.getAllDircetMessages();
  }

  ngAfterViewInit() {
    this.sidenavService.setSidenav(this.sidenav);
  }

  /**
   * fetch current logged User
   */
  getUser(): void {
    this.subUser$ = this.storeService.currentUser$.subscribe((user) => {
      if (user) {
        this.user = user;
        this.user.isOnline = true;
        this.userLoaded = true;
      }
    });
  }

  /**
   * fetch all Users form Database
   */
  getAllUsers(): void {
    this.subAllUsers$ = this.userService
      .getAllUsers$()
      .subscribe((users: TUser[]): void => {
        this.userService.allUsers = users;
      });
  }

  /**
   * fetch all Channels form Database
   */
  getAllChannels(): void {
    this.subChannels$ = this.channelService
      .getAllChannels$()
      .subscribe((channels: TChannel[]): void => {
        this.channelService.allChannels = channels;
      });
  }

  /**
   * fetch all DirectMessages form Database
   */
  getAllDircetMessages(): void {
    this.subDirectMessages$ = this.dmService
      .getAllDirectMessages$()
      .subscribe((dms: TDirectMessages[]): void => {
        this.dmService.addDirectMessages = dms;
      });
  }

  /**
   * close all Subscriptions from Database
   */
  ngOnDestroy(): void {
    this.subUser$.unsubscribe();
    this.subAllUsers$.unsubscribe();
    this.subChannels$.unsubscribe();
    this.subDirectMessages$.unsubscribe();
  }
}
