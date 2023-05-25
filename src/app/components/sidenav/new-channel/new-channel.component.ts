import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthGuard } from 'src/app/shared/service/auth.guard';
import { ChannelDbService } from 'src/app/shared/service/channels-db.service';
import { UserDbService } from 'src/app/shared/service/user-db.service';
import { TChannel } from 'src/app/shared/types/chat';
import { TUser } from 'src/app/shared/types/user';

@Component({
  selector: 'app-new-channel',
  templateUrl: './new-channel.component.html',
  styleUrls: ['./new-channel.component.scss'],
})
export class NewChannelComponent implements OnInit {
  value: string = '';
  loggedUser$!: Subscription;
  loggedUser!: TUser;

  constructor(
    public dialogRef: MatDialogRef<NewChannelComponent>,
    private channelService: ChannelDbService,
    private authGuard: AuthGuard,
    private userService: UserDbService
  ) {}

  ngOnInit(): void {}

  /**
   * observe with user are logged in
   */
  getLoggedUser(): void {
    const authUser: User = this.authGuard.getAuthUser();
    const authUserID: string = authUser.uid;
    this.loggedUser$ = this.userService
      .getUserById$(authUserID)
      .subscribe((user: TUser): void => {
        this.loggedUser = user;
      });
  }

  /**
   * Create a new channel and push it to Firestore
   */
  onNewChannel(): void {
    // Abfragen ob der name schon vorhanden ist.

    if (this.value.trim().length >= 3) {
      const newChannel: TChannel = {
        name: this.value, // textfield value = channelname
        createdOn: this.loggedUser.id,
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
