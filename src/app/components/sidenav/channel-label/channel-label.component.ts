import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/shared/service/auth.guard';
import { StoreService } from 'src/app/shared/service/store.service';
import { UserDbService } from 'src/app/shared/service/user-db.service';
import { TChannel } from 'src/app/shared/types/chat';
import { TUser } from 'src/app/shared/types/user';

@Component({
  selector: 'app-channel-label',
  templateUrl: './channel-label.component.html',
  styleUrls: ['./channel-label.component.scss'],
})
export class ChannelLabelComponent implements OnInit, OnDestroy {
  @Input() channel!: TChannel;

  constructor(private userService: UserDbService, private router: Router) {}

  ngOnInit(): void {}

  /**
   * displays the current channel chat by writing the channelID into the url
   * @param channelID
   */
  displayChannel(channel: TChannel) {
    this.router.navigateByUrl(`main/${channel.id}`);
    this.userService.activeChatName = channel.name;
  }

  /**
   * leaves the current channel by removing the channelID from the list
   * @param channelID
   */
  leaveChannel(channelID: string) {
    // den Aktuellen Channel verlassen.
    console.log('leave channel mit ID: ', channelID);
    // aus der ChannelsListe entfernen.splice(indexOf(channelID),0);
    //logged user splice channelID from channels
  }

  ngOnDestroy(): void {
    // this.userLogginSubscrition$.unsubscribe();
  }
}
