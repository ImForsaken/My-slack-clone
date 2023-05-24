import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/shared/service/auth.guard';
import { StoreService } from 'src/app/shared/service/store.service';
import { UserDbService } from 'src/app/shared/service/user-db.service';
import { TChat } from 'src/app/shared/types/chat';
import { TUser } from 'src/app/shared/types/user';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss'],
})
export class ChannelsComponent implements OnInit, OnDestroy {
  loggedInUserID: string = 'y2ggpSoT2SgZq7XRrP1QAPTh98B3';
  loggedUser!: TUser;

  constructor(
    private userService: UserDbService,
    private router: Router,
    private authGuard: AuthGuard,
    private storeServcie: StoreService
  ) {}
  ngOnInit(): void {
    // this.getLoggedUserID();
    this.getLoggedUser(this.loggedInUserID);
  }

  /**
   * get the current logged ID from firebase Auth
   */
  getLoggedUserID() {
    this.storeServcie.loggedInUserID$.subscribe((id) => {
      this.loggedInUserID = id;
    });
  }

  /**
   * gets the currently logged user from firebase auth
   */
  getLoggedUser(userID: string): void {
    this.userService.getUserById$(userID).subscribe((user) => {
      this.loggedUser = user;
      console.log('this.loggedUser', this.loggedUser);
    });
  }

  /**
   * displays the current channel chat by writing the channelID into the url
   * @param channelID
   */
  displayChannel(channel: TChat) {
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
