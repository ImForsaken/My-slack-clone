import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDbService } from 'src/app/shared/service/user-db.service';
import { TChannel } from 'src/app/shared/types/chat';

@Component({
  selector: 'app-channel-label',
  templateUrl: './channel-label.component.html',
  styleUrls: ['./channel-label.component.scss'],
})
export class ChannelLabelComponent implements OnInit {
  @Input() channel!: TChannel;

  constructor(private userService: UserDbService, private router: Router) {}

  ngOnInit(): void {}

  /**
   * displays the current channel chat by writing the channelID into the url
   * @param channel
   */
  displayChannel(channel: TChannel): void {
    this.router.navigateByUrl(`main/${channel.id}`);
    this.userService.activeChatName = channel.name;
  }

  /**
   * leaves the current channel by removing the channelID from the list
   * @param channelID
   */
  leaveChannel(channelID: string): void {
    // den Aktuellen Channel verlassen.
    console.log('leave channel mit ID: ', channelID);
    // aus der ChannelsListe entfernen.splice(indexOf(channelID),0);
    //logged user splice channelID from channels
  }
}
