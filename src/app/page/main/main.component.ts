import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { User } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { AuthGuard } from 'src/app/shared/service/auth.guard';
import { ChannelDbService } from 'src/app/shared/service/channels-db.service';
import { DirectMessageDbService } from 'src/app/shared/service/direct-messages-db.service';
import { SidenavService } from 'src/app/shared/service/sidenav.service';
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
  isSidenavOpened: boolean = true;

  constructor(
    public dialog: MatDialog,
    public userService: UserDbService,
    private authGuard: AuthGuard,
    private channelService: ChannelDbService,
    private dmService: DirectMessageDbService
  ) {}

  // Start Subscribe DB with Service and Store the data on it.
  ngOnInit(): void {
    this.getLoggedUser();
    this.getAllUsers();
    this.getAllChannels();
    this.getAllDircetMessages();
  }

  ngAfterViewInit() {
    console.log('Main Sidenav', this.sidenav)
    this.sidenavService.setSidenav(this.sidenav);
  }

  /**
   * get User ID from AuthGuard;
   * @returns
   */
  getAuthUserID(): string {
    const authUser: User = this.authGuard.getAuthUser();
    return authUser.uid;
  }

  /**
   * save current signIn User in userService
   */
  getLoggedUser(): void {
    this.subLoggedUser$ = this.userService
      .getUserById$(this.getAuthUserID())
      .subscribe((user: TUser): void => {
        this.userService.loggedUser = user;
      });
  }

  getAllUsers(): void {
    this.subAllUsers$ = this.userService
      .getAllUsers$()
      .subscribe((users: TUser[]): void => {
        this.userService.allUsers = users;
      });
  }

  /**
   * save all existing channels in channelService
   */
  getAllChannels(): void {
    this.subChannels$ = this.channelService
      .getAllChannels$()
      .subscribe((channels: TChannel[]): void => {
        this.channelService.allChannels = channels;
      });
  }

  getAllDircetMessages(): void {
    this.subDirectMessages$ = this.dmService
      .getAllDirectMessages$()
      .subscribe((dms: TDirectMessages[]): void => {
        this.dmService.addDirectMessages = dms;
      });
  }

  ngOnDestroy(): void {
    this.subLoggedUser$.unsubscribe();
    this.subAllUsers$.unsubscribe();
    this.subChannels$.unsubscribe();
    this.subDirectMessages$.unsubscribe();
  }
}
