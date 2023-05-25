import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthGuard } from 'src/app/shared/service/auth.guard';
import { StoreService } from 'src/app/shared/service/store.service';
import { UserDbService } from 'src/app/shared/service/user-db.service';
import { TUser } from 'src/app/shared/types/user';

@Component({
  selector: 'app-all-direct-messages',
  templateUrl: './all-direct-messages.component.html',
  styleUrls: ['./all-direct-messages.component.scss'],
})
export class AllDirectMessagesComponent implements OnInit, OnDestroy {
  private subLoggedUser$!: Subscription;
  private subAllUsers$!: Subscription;
  loggedUser!: TUser;
  selectedUser!: TUser;
  isSelected: boolean = false;
  directMessages: TUser[] = [];
  allUsers: TUser[] = [];

  constructor(
    private authGuard: AuthGuard,
    private storeService: StoreService,
    private userService: UserDbService,
    public dialogRef: MatDialogRef<AllDirectMessagesComponent>,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
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
   * observe all users from Firestore
   */
  getAllUsers(): void {
    this.subAllUsers$ = this.userService
      .getAllUsers$()
      .subscribe((users: TUser[]): void => {
        this.allUsers = users;
      });
  }

  /**
   * when a channel is selected it will be added to the user and updated Firebase
   */
  onAddUser(): void {
    if (this.selectedUser) {
      console.log('user ausgewählt');
      // build new DirectMessageObject
      // push it to user
      // update database
    } else {
      console.log('es wurde kein channel ausgewählt');
    }
    this.dialogRef.close();
    this.isSelected = false;
  }

  /**
   * set selected User
   * @param User
   */
  selectUser(user: TUser): void {
    if (user) {
      this.selectedUser = user;
      this.isSelected = true;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subLoggedUser$.unsubscribe();
    this.subAllUsers$.unsubscribe();
  }
}
