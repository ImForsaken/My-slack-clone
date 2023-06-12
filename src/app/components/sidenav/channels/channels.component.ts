import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StoreService } from 'src/app/shared/service/store.service';
import { TUser } from 'src/app/shared/types/user';
import { NewChannelComponent } from '../new-channel/new-channel.component';
import { AllChannelsComponent } from '../channels-dialog/all-channels.component';
import { Subscription } from 'rxjs';
import { TChannel } from 'src/app/shared/types/chat';
import { LabelService } from '../label.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss'],
})
export class ChannelsComponent implements OnInit, OnDestroy {
  user!: TUser;
  subUser$!: Subscription;
  isChannelsOpen: boolean = true;
  selectedChannel: TChannel | null = null;

  constructor(
    public dialog: MatDialog,
    private storeService: StoreService,
    public labelService: LabelService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * fetch current logged User
   */
  getUser(): void {
    this.subUser$ = this.storeService.currentUser$.subscribe((user) => {
      console.log('channel comp');
      if (user) {
        this.user = user;
        this.user.channels = this.sortChannels(this.user.channels);
      }
    });
  }

  /**
   * set Channel,
   * to hightlight the selected channel
   * @param channel
   */
  selectChannel(channel: TChannel): void {
    if (channel) {
      this.labelService.activeLabel = channel;
    }
  }

  /**
   * sorts the list of Channels alphabetically
   * @param channelList
   */
  sortChannels(channels: TChannel[]): TChannel[] {
    channels.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    return channels;
  }

  /**
   * Open a Dialog to create a new Channel
   */
  openNewDialog(): void {
    const dialogRef = this.dialog.open(NewChannelComponent);
    dialogRef.afterClosed().subscribe();
  }

  /**
   * Open a Dialog to show all Channels
   */
  openListDialog(): void {
    const dialogRef = this.dialog.open(AllChannelsComponent);
    dialogRef.afterClosed().subscribe();
  }

  ngOnDestroy(): void {
    this.subUser$.unsubscribe();
  }
}
