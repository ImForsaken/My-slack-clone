import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StoreService } from 'src/app/shared/service/store.service';
import { UserDbService } from 'src/app/shared/service/user-db.service';
import { TUser } from 'src/app/shared/types/user';
import { NewChannelComponent } from '../new-channel/new-channel.component';
import { AllChannelsComponent } from '../all-channels/all-channels.component';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss'],
})
export class ChannelsComponent implements OnInit {
  loggedInUserID: string = 'y2ggpSoT2SgZq7XRrP1QAPTh98B3';
  loggedUser!: TUser;
  isChannelsOpen: boolean = true;

  constructor(
    public dialog: MatDialog,
    private userService: UserDbService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    // this.getLoggedUserID();
    this.getLoggedUser(this.loggedInUserID);
  }

  /**
   * get the current logged ID from firebase Auth
   */
  getLoggedUserID() {
    this.storeService.loggedInUserID$.subscribe((id) => {
      this.loggedInUserID = id;
    });
  }

  /**
   * gets the currently logged user from firebase auth
   */
  getLoggedUser(userID: string): void {
    this.userService.getUserById$(userID).subscribe((user) => {
      this.loggedUser = user;
      // console.log('this.loggedUser', this.loggedUser);
    });
  }

  /**
   * Open a Dialog to create a new Channel
   */
  openNewDialog() {
    const dialogRef = this.dialog.open(NewChannelComponent);
    dialogRef.afterClosed().subscribe();
  }

  /**
   * Open a Dialog to show all Channels
   */
  openListDialog() {
    const dialogRef = this.dialog.open(AllChannelsComponent);
    dialogRef.afterClosed().subscribe();
  }
}
