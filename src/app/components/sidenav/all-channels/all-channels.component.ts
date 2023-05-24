import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChannelDbService } from 'src/app/shared/service/channels-db.service';
import { UserDbService } from 'src/app/shared/service/user-db.service';
import { TChat } from 'src/app/shared/types/chat';
import { TUser } from 'src/app/shared/types/user';

@Component({
  selector: 'app-all-channels',
  templateUrl: './all-channels.component.html',
  styleUrls: ['./all-channels.component.scss'],
})
export class AllChannelsComponent implements OnInit {
  allChannels: TChat[] = [];
  isSelected: boolean = false;
  selectedChannel!: TChat;
  loggedUser: TUser = {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    profilePicture: '',
    isOnline: false,
    channels: [],
    directMessages: [],
  };

  constructor(
    public dialogRef: MatDialogRef<AllChannelsComponent>,
    public dialog: MatDialog,
    private channelService: ChannelDbService,
    private userService: UserDbService
  ) {}

  ngOnInit(): void {
    this.showAllChannelsFromDB();
    // eingeloggten User laden
  }

  /**
   * show All Channels how are stored in Firebase
   */
  showAllChannelsFromDB() {
    const allChannels = this.channelService.getAllChannels$();
    allChannels.subscribe((channls) => {
      console.log('channels: ', channls);
      this.allChannels = channls;
    });
  }

  onAddChannel() {
    if (this.selectedChannel) {
      // add channel to user
      // this.loggedUser.channels.push(this.selectedChannel);
      // update user
      console.log('füge channel hinzu', this.selectedChannel);
    } else {
      console.log('es wurde kein channel ausgewählt');
    }
    this.dialogRef.close();
    this.isSelected = false;
  }

  onNoClick() {
    this.dialogRef.close();
  }

  selectChannel(channel: TChat) {
    if (channel) {
      this.selectedChannel = channel;
      this.isSelected = true;
    }
  }
}
