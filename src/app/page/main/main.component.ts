import { Component, OnDestroy, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { ChannelNode } from 'src/app/shared/interface/channelNode.interface';
import { ChannelService } from 'src/app/shared/service/channel.service';
import { UserDbService } from 'src/app/shared/service/user-db.service';
import { User } from 'src/app/shared/types/user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  isSidenavOpened: boolean = true;
  /**
   * Hier den aktuellen Channel aud Firebase angeben
   */
  channels: ChannelNode[] = [];
  currentChannelName: string = 'currentChannelName';
  allUsers$ = new Subscription();
  allUsers: User[] = [
    {
      chats: [],
      email: 'test@test.de',
      firstname: 'gerog',
      lastname: 'Tester',
      profilePicture: 'testimg.png',
    },
    {
      chats: [],
      email: 'test@test.de',
      firstname: 'heidi',
      lastname: 'Tester',
      profilePicture: 'testimg.png',
    },
  ];

  constructor(
    private channelservice: ChannelService,
    private userService: UserDbService
  ) {}

  ngOnInit() {
    this.channels = this.channelservice.getAllChannels();
    // this.allUsers = this.userService.getAllUsers(); gibt mir ein leeres array zurück
    this.getUsers();
  }

  displayName(name: string) {
    this.currentChannelName = name;
  }

  getUsers() {
    this.allUsers$ = this.userService.users$.subscribe((users: User[]) => {
      this.allUsers = users;
    });
  }

  ngOnDestroy() {
    this.allUsers$.unsubscribe();
  }
}
