import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UserDbService } from 'src/app/shared/service/user-db.service';
import { TUser } from 'src/app/shared/types/user';
import { DirectMessagesDialogComponent } from '../dm-dialog/direct-messages-dialog.component';
import { StoreService } from 'src/app/shared/service/store.service';
import { TDirectMessage } from 'src/app/shared/types/chat';
import { UiService } from '../../../shared/service/ui.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-direct-messages',
  templateUrl: './direct-messages.component.html',
  styleUrls: ['./direct-messages.component.scss'],
})
export class DirectMessagesComponent {
  subAllUsers$!: Subscription;
  subUser$!: Subscription;
  allUsers: TUser[] = [];
  dmUsers: TUser[] = [];
  user!: TUser;
  isUserLoaded: boolean = false;
  isAllUsersLoaded: boolean = false;
  isDirectMessageOpen: boolean = true;
  selectedDmUsers: TUser | null = null;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private userDBService: UserDbService,
    private storeService: StoreService,
    public uiService: UiService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getAllUsers();
  }

  /**
   * store selected Direct Message User
   * @param dmUser
   */
  selectDMUser(dmUser: TUser): void {
    this.uiService.activeLabel = dmUser;
    this.uiService.labelSubject$.next(dmUser);
    const dmId = dmUser.directMessages.find((dm) => {
      return dm.chatPartnerID === this.storeService.user.id;
    });

    this.router.navigateByUrl(`main/dmuser_${dmId?.dmDocID}`);
  }

  /**
   * fetch the current logged in user
   */
  getUser(): void {
    this.subUser$ = this.storeService.currentUser$.subscribe((user) => {
      if (user) {
        this.user = user;
        this.isUserLoaded = true;
        this.getDMUsers();
      }
    });
  }

  /**
   * fetch all users from Firestore
   */
  getAllUsers(): void {
    this.subAllUsers$ = this.userDBService
      .getAllUsers$()
      .subscribe((users: TUser[]) => {
        this.allUsers = users;
        this.isAllUsersLoaded = true;
        this.getDMUsers();
      });
  }

  /**
   * load all users to view the direct messages label
   */
  getDMUsers(): void {
    if (this.isUserLoaded && this.isAllUsersLoaded) {
      const storedUserIDs: string[] = this.user.directMessages.map(
        (dm: TDirectMessage) => dm.chatPartnerID
      );
      this.dmUsers = this.allUsers.filter((user) =>
        storedUserIDs.includes(user.id!)
      );
    }
  }

  /**
   * shows the dialog with all existing users
   */
  openUsersDialog(): void {
    const dialogRef = this.dialog.open(DirectMessagesDialogComponent);
    dialogRef.afterClosed().subscribe();
  }

  /**
   * leave DirectMessage Chat by clicked user.
   * @param chatUserID
   */
  leaveDMChat(chatUserID: string): void {
    const directMessage = this.user.directMessages.find(
      (dm) => dm.chatPartnerID === chatUserID
    );
    if (directMessage) {
      const index: number = this.user.directMessages.indexOf(directMessage);
      this.user.directMessages.splice(index, 1);
      this.userDBService.updateUser(this.user.id!, this.user);
    }
  }

  /**
   * stop all subscriptions
   */
  ngOnDestroy(): void {
    this.subAllUsers$.unsubscribe();
    this.subUser$.unsubscribe();
  }
}
