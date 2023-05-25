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
  allUsers$!: Subscription;
  allUsers: TUser[] = [];

  isDirectMessageOpen: boolean = true;

  constructor(private userService: UserDbService) {}

  ngOnInit(): void {
    this.allUsers$ = this.userService
      .getAllUsers$()
      .subscribe((users: TUser[]) => {
        console.log('users: ', users);
      });
  }

  //alle User aus der DB laden

  // meine dmUser abgleichen

  // und diese rendern

  ngOnDestroy() {
    this.allUsers$.unsubscribe();
  }
}
