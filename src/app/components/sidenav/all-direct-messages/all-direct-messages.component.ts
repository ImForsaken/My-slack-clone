import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/shared/service/store.service';
import { UserDbService } from 'src/app/shared/service/user-db.service';
import { TUser } from 'src/app/shared/types/user';

@Component({
  selector: 'app-all-direct-messages',
  templateUrl: './all-direct-messages.component.html',
  styleUrls: ['./all-direct-messages.component.scss'],
})
export class AllDirectMessagesComponent implements OnInit, OnDestroy {
  user!: TUser;
  subUser$!: Subscription;
  userLoaded: boolean = false;
  selectedUser!: TUser;
  isSelected: boolean = false;
  directMessages: TUser[] = [];
  allUsers: TUser[] = [];
  subAllUsers$!: Subscription;

  constructor(
    private storeService: StoreService,
    private userService: UserDbService,
    public dialogRef: MatDialogRef<AllDirectMessagesComponent>,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getAllUsers();
  }

  /**
   * fetch current logged User
   */
  getUser(): void {
    this.subUser$ = this.storeService.currentUser$.subscribe((user) => {
      if (user) {
        this.user = user;
        this.user.isOnline = true;
        this.userLoaded = true;
      }
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
    this.subUser$.unsubscribe();
    this.subAllUsers$.unsubscribe();
  }
}
