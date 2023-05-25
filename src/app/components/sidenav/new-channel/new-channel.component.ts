import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ChannelDbService } from 'src/app/shared/service/channels-db.service';
import { TChannel } from 'src/app/shared/types/chat';

@Component({
  selector: 'app-new-channel',
  templateUrl: './new-channel.component.html',
  styleUrls: ['./new-channel.component.scss'],
})
export class NewChannelComponent {
  value = '';
  activeUserName = 'activeUser';

  constructor(
    public dialogRef: MatDialogRef<NewChannelComponent>,
    private channelService: ChannelDbService
  ) {}

  /**
   * Create a new channel and push it to Firestore
   */
  onNewChannel() {
    // Abfragen ob der name schon vorhanden ist.

    if (this.value.trim().length >= 3) {
      const newChannel: TChannel = {
        name: this.value, // textfield value = channelname
        createdOn: this.activeUserName, // muss noch im service angelegt werden.
      };
      console.log('newChannel: ', newChannel);
      this.channelService.createChannel(newChannel);
    } else {
      // show error
      console.warn('Eingabe ist falsch');
    }
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
