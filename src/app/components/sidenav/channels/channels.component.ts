import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StoreService } from 'src/app/shared/service/store.service';
import { UserDbService } from 'src/app/shared/service/user-db.service';
import { TUser } from 'src/app/shared/types/user';
import { NewChannelComponent } from '../new-channel/new-channel.component';
import { AllChannelsComponent } from '../all-channels/all-channels.component';
import { User } from '@angular/fire/auth';
import { AuthGuard } from 'src/app/shared/service/auth.guard';
import { Subscription } from 'rxjs';
import { TChannel } from 'src/app/shared/types/chat';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss'],
})
export class ChannelsComponent implements OnInit, OnDestroy {
  private subLoggedUser$!: Subscription;
  loggedUser!: TUser;
  isChannelsOpen: boolean = true;
  selectedChannel!: TChannel;

  constructor(
    public dialog: MatDialog,
    private userService: UserDbService,
    private authGuard: AuthGuard
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
   * set Channel,
   * to hightlight the selected channel
   * @param channel
   */
  selectChannel(channel: TChannel): void {
    if (channel) {
      this.selectedChannel = channel;
    }
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
    this.subLoggedUser$.unsubscribe();
  }
}
