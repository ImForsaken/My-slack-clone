import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UserDbService } from 'src/app/shared/service/user-db.service';
import { TUser } from 'src/app/shared/types/user';
import { DirectMessagesDialogComponent } from '../dm-dialog/direct-messages-dialog.component';
import { StoreService } from 'src/app/shared/service/store.service';
import { TDirectMessage } from 'src/app/shared/types/chat';
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
  myStoredUsers: TUser[] = [];
  user!: TUser;
  isUserLoaded: boolean = false;
  isAllUsersLoaded: boolean = false;
  isDirectMessageOpen: boolean = true;

  constructor(
    public dialog: MatDialog,
    private userDBService: UserDbService,
    private storeService: StoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getAllUsers();
    this.loadMyStoredUsers();
  }

  /**
   * observe the current logged in user
   */
  getUser(): void {
    this.subUser$ = this.storeService.currentUser$.subscribe((user) => {
      if (user) {
        this.user = user;
        this.isUserLoaded = true;
        this.loadMyStoredUsers();
      }
    });
  }

  /**
   * observe all users from Firestore
   */
  getAllUsers(): void {
    this.subAllUsers$ = this.userDBService
      .getAllUsers$()
      .subscribe((users: TUser[]) => {
        this.allUsers = users;
        this.isAllUsersLoaded = true;
        this.loadMyStoredUsers();
      });
  }

  /**
   * load all users to view the direct messages label
   */
  loadMyStoredUsers(): void {
    if (this.isUserLoaded && this.isAllUsersLoaded) {
      const storedUserIDs: string[] = this.user.directMessages.map(
        (dm: TDirectMessage) => dm.chatPartnerID
      );
      this.myStoredUsers = this.allUsers.filter((user) =>
        storedUserIDs.includes(user.id!)
      );
      console.log('myStoredUsers:', this.myStoredUsers);
    }
  }

  openDirectMessage(user: TUser) {
    this.router.navigateByUrl(`main/${user.id}`);
  }

  /**
   * shows the dialog with all existing users
   */
  openUsersDialog(): void {
    const dialogRef = this.dialog.open(DirectMessagesDialogComponent);
    dialogRef.afterClosed().subscribe();
  }

  ngOnDestroy(): void {
    this.subAllUsers$.unsubscribe();
    this.subUser$.unsubscribe();
  }
}
