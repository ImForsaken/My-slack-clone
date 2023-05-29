import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ChannelDbService } from 'src/app/shared/service/channels-db.service';
import { UserDbService } from 'src/app/shared/service/user-db.service';
import { TChannel } from 'src/app/shared/types/chat';

@Component({
  selector: 'app-all-channels',
  templateUrl: './all-channels.component.html',
  styleUrls: ['./all-channels.component.scss'],
})
export class AllChannelsComponent implements OnInit, OnDestroy {
  private subAllChannels$!: Subscription;
  allChannels: TChannel[] = [];
  selectedChannel!: TChannel;
  isSelected: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AllChannelsComponent>,
    public dialog: MatDialog,
    private channelService: ChannelDbService,
    private userService: UserDbService
  ) {}

  ngOnInit(): void {
    this.getAllChannelsFromDB();
    this.filterChannelList();
  }

  /**
   * get all existing channels, how are stored in Firebase
   */
  getAllChannelsFromDB(): void {
    this.subAllChannels$ = this.channelService
      .getAllChannels$()
      .subscribe((channls: TChannel[]): void => {
        this.allChannels = channls;
      });
  }

  /**
   * all other existing channels
   * @returns
   */
  filterChannelList(): TChannel[] {
    const allChannels: TChannel[] = this.channelService.allChannels;
    const userChannels: TChannel[] = this.userService.loggedUser.channels;
    const otherChannels: TChannel[] = allChannels.filter(
      (channel: TChannel): boolean =>
        !userChannels.some(
          (existingChannel: TChannel): boolean =>
            existingChannel.name.toLowerCase() === channel.name.toLowerCase()
        )
    );
    return otherChannels;
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
      if (this.userService.loggedUser.id) {
        this.userService.loggedUser.channels.push(this.selectedChannel);
        this.userService.updateUser(
          this.userService.loggedUser.id,
          this.userService.loggedUser
        );
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
  }
}
