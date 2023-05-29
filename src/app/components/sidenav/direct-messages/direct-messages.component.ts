import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UserDbService } from 'src/app/shared/service/user-db.service';
import { TUser } from 'src/app/shared/types/user';
import { AllDirectMessagesComponent } from '../all-direct-messages/all-direct-messages.component';
import { AuthGuard } from 'src/app/shared/service/auth.guard';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-direct-messages',
  templateUrl: './direct-messages.component.html',
  styleUrls: ['./direct-messages.component.scss'],
})
export class DirectMessagesComponent {
  subAllUsers$!: Subscription;
  allUsers: TUser[] = [];
  loggedUser$!: Subscription;
  loggedUser!: TUser;
  isDirectMessageOpen: boolean = true;

  constructor(
    private authGuard: AuthGuard,
    public dialog: MatDialog,
    private userService: UserDbService
  ) {}

  ngOnInit(): void {
    this.getLoggedUser();
    this.getAllUsers();
  }

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
   * observe all users from Firestore
   */
  getAllUsers(): void {
    this.subAllUsers$ = this.userService
      .getAllUsers$()
      .subscribe((users: TUser[]): void => {
        this.allUsers = users;
        console.log('allUsers: ', users);
      });
  }
  //alle User aus der DB laden

  // meine dmUser abgleichen

  // und diese rendern

  openUsersDialog() {
    const dialogRef = this.dialog.open(AllDirectMessagesComponent);
    dialogRef.afterClosed().subscribe();
  }

  ngOnDestroy() {
    this.subAllUsers$.unsubscribe();
    this.loggedUser$.unsubscribe();
  }
}
