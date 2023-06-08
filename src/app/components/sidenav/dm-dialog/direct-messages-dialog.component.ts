import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/shared/service/store.service';
import { UserDbService } from 'src/app/shared/service/user-db.service';
import { DirectMessageDbService } from 'src/app/shared/service/direct-messages-db.service';
import { TDirectMessage } from 'src/app/shared/types/chat';
import { TUser } from 'src/app/shared/types/user';

@Component({
  selector: 'app-direct-messages-dialog',
  templateUrl: './direct-messages-dialog.component.html',
  styleUrls: ['./direct-messages-dialog.component.scss'],
})
export class DirectMessagesDialogComponent implements OnInit, OnDestroy {
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
    private dmServcie: DirectMessageDbService,
    public dialogRef: MatDialogRef<DirectMessagesDialogComponent>,
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
      console.log('dm dialog comp')
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
        console.log('dm dialog comp')
        this.allUsers = users.filter((user: TUser) => {
          return (
            user.id !== this.user.id && // Aktueller Benutzer ausschließen
            !this.user.directMessages.some(
              (dm: TDirectMessage) => dm.chatPartnerID === user.id
            )
          );
        });
      });
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

  /**
   * when a channel is selected it will be added to the user and updated Firebase
   */
  onAddUser(): void {
    if (this.selectedUser.id && this.user.id) {
      this.dmServcie.createDirectMessage(this.user.id, this.selectedUser.id);
    } else {
      console.warn('Es wurde kein Benutzer ausgewählt.');
    }
    this.dialogRef.close();
    this.isSelected = false;
  }

  /**
   * close Dialog
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subUser$.unsubscribe();
    this.subAllUsers$.unsubscribe();
  }
}
