import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  user!: TUser;
  subUser$!: Subscription;
  @Input() channel!: TChannel;

  constructor(
    private userService: UserDbService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * fetch current logged User
   */
  getUser(): void {
    this.subUser$ = this.storeService.currentUser$.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  /**
   * leaves the current channel by removing the channelID from the list
   * @param channelID
   */
  leaveChannel(): void {
    if (this.user && this.user.id) {
      const channelIndex = this.user.channels.findIndex(
        (channel: TChannel) => channel.name === this.channel.name
      );
      if (channelIndex !== -1) {
        this.user.channels.splice(channelIndex, 1);
        this.userService.updateUser(this.user.id, this.user);
      }
    }
  }

  ngOnDestroy(): void {
    this.subUser$.unsubscribe();
  }
}
