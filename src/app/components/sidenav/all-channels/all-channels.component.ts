import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthGuard } from 'src/app/shared/service/auth.guard';
import { ChannelDbService } from 'src/app/shared/service/channels-db.service';
import { StoreService } from 'src/app/shared/service/store.service';
import { UserDbService } from 'src/app/shared/service/user-db.service';
import { TChannel } from 'src/app/shared/types/chat';
import { TUser } from 'src/app/shared/types/user';

@Component({
  selector: 'app-all-channels',
  templateUrl: './all-channels.component.html',
  styleUrls: ['./all-channels.component.scss'],
})
export class AllChannelsComponent implements OnInit, OnDestroy {
  private subLoggedUser$!: Subscription;
  private subAllChannels$!: Subscription;
  loggedUser!: TUser;
  allChannels: TChannel[] = [];
  selectedChannel!: TChannel;
  isSelected: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AllChannelsComponent>,
    public dialog: MatDialog,
    private channelService: ChannelDbService,
    private userService: UserDbService,
    private storeService: StoreService,
    private authGuard: AuthGuard
  ) {
    console.log('storeS', this.authGuard.loggedUser);
  }

  ngOnInit(): void {
    this.getLoggedUserInfo();
    this.getAllChannelsFromDB();
  }

  /**
   * get the current logged user from Auth
   */
  getLoggedUserInfo() {
    this.subLoggedUser$ = this.storeService.currentUser$.subscribe((user) => {
      console.log('user:', user); // Später rauslöschen
      this.loggedUser = user;
    });
  }

  /**
   * get all existing channels, how are stored in Firebase
   */
  getAllChannelsFromDB() {
    this.subAllChannels$ = this.channelService
      .getAllChannels$()
      .subscribe((channls: TChannel[]): void => {
        console.log('channels: ', channls); // Später rauslöschen
        this.allChannels = channls;
      });
  }

  /**
   * when a channel is selected it will be added to the user and updated Firebase
   */
  onAddChannel(): void {
    if (this.selectedChannel) {
      if (this.loggedUser.id) {
        this.loggedUser.channels.push(this.selectedChannel);
        this.userService.updateUser(this.loggedUser.id, this.loggedUser);
      }
    } else {
      console.log('es wurde kein channel ausgewählt');
    }
    this.dialogRef.close();
    this.isSelected = false;
  }

  /**
   * close Dialog
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * set selectedChannel
   * @param channel
   */
  selectChannel(channel: TChannel): void {
    if (channel) {
      this.selectedChannel = channel;
      this.isSelected = true;
    }
  }

  ngOnDestroy(): void {
    this.subLoggedUser$.unsubscribe();
    this.subAllChannels$.unsubscribe();
  }
}
