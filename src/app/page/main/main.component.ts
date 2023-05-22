import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDbService } from 'src/app/shared/service/user-db.service';
import { TUser } from 'src/app/shared/types/user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  isSidenavOpened: boolean = true;
  /**
   * Hier den aktuellen Channel aud Firebase angeben
   */
  currentChannelName: string = 'currentChannelName';
  allUsers$ = Observable<TUser[]>;
  allUsers: TUser[] = [
    {
      channels: [],
      username: '',
      directMessages: [],
      email: 'test@test.de',
      firstname: 'gerog',
      lastname: 'Tester',
      profilePicture: 'testimg.png',
      isOnline: false
    },
    {
      channels: [],
      username: '',
      directMessages: [],
      email: 'test@test.de',
      firstname: 'heidi',
      lastname: 'Tester',
      profilePicture: 'testimg.png',
      isOnline: false
    },
  ];

  constructor(
    private userService: UserDbService
  ) {
  }

  displayName(name: string) {
    this.currentChannelName = name;
  }
}
