import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthGuard } from 'src/app/shared/service/auth.guard';
import { UserDbService } from 'src/app/shared/service/user-db.service';
import { TChat } from 'src/app/shared/types/chat';
import { TUser } from 'src/app/shared/types/user';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss'],
})
export class ChannelsComponent implements OnInit, OnDestroy {
  loggedUser!: TUser;
  userLogginSubscrition$!: Subscription;

  constructor(
    private userService: UserDbService,
    private router: Router,
    private authGuard: AuthGuard
  ) {
    this.getLoggedUser();
  }

  ngOnInit(): void {
    // this.getLoggedUser();
    console.log('loggedUser: ', this.loggedUser);
  }

  /**
   * gets the currently logged in user from firebase auth
   */
  getLoggedUser(): void {
    const loggedUser: User = this.authGuard.loggedUser;
    if (loggedUser) {
      this.userLogginSubscrition$ = this.userService
        .getUserByEmail$(`${loggedUser.email}`)
        .subscribe((users: TUser[]): void => {
          // User kommt vom auth Service
          this.loggedUser = users[0];
          console.log('subscriptionUser: ', this.loggedUser);
        });
    }
  }

  /**
   * displays the current channel chat by writing the channelID into the url
   * @param channelID
   */
  displayChannel(channelID: string) {
    this.router.navigateByUrl(`main/${channelID}`);
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
    this.userLogginSubscrition$.unsubscribe();
  }
}
