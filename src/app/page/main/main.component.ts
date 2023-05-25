import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewChannelComponent } from 'src/app/components/sidenav/new-channel/new-channel.component';
import { ChannelDbService } from 'src/app/shared/service/channels-db.service';
import { UserDbService } from 'src/app/shared/service/user-db.service';
import { TChannel } from 'src/app/shared/types/chat';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  isSidenavOpened: boolean = true;
  isDirectMessageOpen: boolean = true;

  allChannels: TChannel[] = [];

  constructor(
    private channelService: ChannelDbService,
    public userServcie: UserDbService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.showAllChannelsFromDB();
  }

  /**
   * show All Channels how are stored in Firebase
   */
  showAllChannelsFromDB() {
    const allChannels = this.channelService.getAllChannels$();
    allChannels.subscribe((channels: TChannel[]) => {
      console.log('channels: ', channels);
      this.allChannels = channels;
    });
  }

  openDialog(): void {
    // open NewChannel component
    const dialogRef = this.dialog.open(NewChannelComponent);
    // by Closeing Dialog get result data
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed:', result);
    });
  }
}
