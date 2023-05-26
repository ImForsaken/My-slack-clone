import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthGuard } from 'src/app/shared/service/auth.guard';
import { ChannelDbService } from 'src/app/shared/service/channels-db.service';
import { DirectMessageDbService } from 'src/app/shared/service/direct-messages-db.service';
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
  // private subLoggedUser$!: Subscription;
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
    private dmService: DirectMessageDbService
  ) {}

  ngOnInit(): void {
    this.getAllChannelsFromDB();
    this.logChannels();
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

  logChannels(): void {
    console.log('loggedUser', this.userService.loggedUser);
    console.log('userChannels', this.userService.loggedUser.channels);
    console.log('allChannels', this.channelService.allChannels);
    console.log('allDMs', this.dmService.addDirectMessages);
    console.log('allUsers', this.userService.allUsers);
  }

  ngOnDestroy(): void {
    this.subAllChannels$.unsubscribe();
  }
}
