import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthGuard } from 'src/app/shared/service/auth.guard';
import { UserDbService } from 'src/app/shared/service/user-db.service';
import { TChannel } from 'src/app/shared/types/chat';
import { TUser } from 'src/app/shared/types/user';

@Component({
  selector: 'app-channel-label',
  templateUrl: './channel-label.component.html',
  styleUrls: ['./channel-label.component.scss'],
})
export class ChannelLabelComponent implements OnInit, OnDestroy {
  private subLoggedUser$!: Subscription;
  loggedUser!: TUser;
  @Input() channel!: TChannel;
  @Input() index!: number;

  constructor(
    private router: Router,
    private authGuard: AuthGuard,
    private userService: UserDbService
  ) {}

  ngOnInit(): void {
    this.getLoggedUser();
  }

  /**
   * get the current logged user from Auth
   */
  getLoggedUser(): void {
    const authUser: User = this.authGuard.getAuthUser();
    const authUserID: string = authUser.uid;
    this.subLoggedUser$ = this.userService
      .getUserById$(authUserID)
      .subscribe((user: TUser): void => {
        this.loggedUser = user;
      });
  }

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
  leaveChannel(): void {
    if (this.loggedUser && this.loggedUser.id) {
      this.loggedUser.channels.splice(this.index, 1);
      this.userService.updateUser(this.loggedUser.id, this.loggedUser);
    }
  }

  ngOnDestroy(): void {
    this.subLoggedUser$.unsubscribe();
  }
}
