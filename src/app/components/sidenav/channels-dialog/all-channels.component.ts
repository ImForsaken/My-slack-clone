import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
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
  // User
  user!: TUser;
  subUser$!: Subscription;
  isUserLoaded: boolean = false;
  channels: TChannel[] = [];
  // Channels
  subAllChannels$!: Subscription;
  allChannels: TChannel[] = [];
  isAllChannelsLoaded: boolean = false;

  selectedChannel!: TChannel;
  isSelected: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AllChannelsComponent>,
    public dialog: MatDialog,
    private channelService: ChannelDbService,
    private userService: UserDbService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getAllChannels();
  }

  /**
   * fetch current logged User
   */
  getUser(): void {
    this.subUser$ = this.storeService.currentUser$.subscribe((user) => {
      console.log('all channel comp')
      if (user) {
        this.user = user;
        this.user.isOnline = true;
        this.isUserLoaded = true;
      }
    });
  }

  /**
   * fetch all Channels form Database
   */
  getAllChannels(): void {
    this.subAllChannels$ = this.channelService
      .getAllChannels$()
      .subscribe((channels: TChannel[]): void => {
        console.log('all channels comp')
        this.allChannels = channels;
        this.isAllChannelsLoaded = true;
        this.sortAndFilterChannels();
      });
  }

  /**
   * get current Channels sorted and filterd to render list
   * @returns
   */
  sortAndFilterChannels(): void {
    const userChannelNames: string[] = this.user.channels.map(
      (channel: TChannel) => channel.name.toLowerCase()
    );
    this.channels = this.allChannels.filter(
      (channel: TChannel) =>
        !userChannelNames.includes(channel.name.toLowerCase())
    );
    this.sortChannelList();
  }

  /**
   * sorts the list of Channels alphabetically
   * @param channelList
   */
  sortChannelList(): void {
    this.channels.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }

  /**
   * set selected Channel
   * @param channel
   */
  selectChannel(channel: TChannel): void {
    if (channel) {
      this.selectedChannel = channel;
      this.isSelected = true;
    }
  }

  /**
   * when a channel is selected it will be added to the user and updated Firebase
   */
  onAddChannel(): void {
    if (this.selectedChannel) {
      if (this.user.id) {
        this.user.channels.push(this.selectedChannel);
        this.userService.updateUser(this.user.id, this.user);
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

  ngOnDestroy(): void {
    this.subAllChannels$.unsubscribe();
    this.subUser$.unsubscribe();
  }
}
