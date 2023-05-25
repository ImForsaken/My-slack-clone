import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserDbService } from 'src/app/shared/service/user-db.service';
import { TUser } from 'src/app/shared/types/user';

@Component({
  selector: 'app-direct-messages',
  templateUrl: './direct-messages.component.html',
  styleUrls: ['./direct-messages.component.scss'],
})
export class DirectMessagesComponent {
  subAllUsers$!: Subscription;
  allUsers: TUser[] = [];
  loggedUser!: TUser;
  isDirectMessageOpen: boolean = true;

  constructor(private userService: UserDbService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  /**
   * observe all users from Firestore
   */
  getAllUsers(): void {
    this.subAllUsers$ = this.userService
      .getAllUsers$()
      .subscribe((users: TUser[]): void => {
        console.log('subAllUsers: ', users);
      });
  }
  //alle User aus der DB laden

  // meine dmUser abgleichen

  // und diese rendern

  openUsersDialog() {}

  ngOnDestroy() {
    this.subAllUsers$.unsubscribe();
  }
}
