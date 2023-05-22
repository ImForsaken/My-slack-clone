import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserDbService } from 'src/app/shared/service/user-db.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss'],
})
export class ChannelsComponent {
  currentChannels!: any;
  selectedChannelName!: string;
  @Output() selectedChannel: EventEmitter<string> = new EventEmitter<string>();

  constructor(private userService: UserDbService, private router: Router) {
    this.userService.getUserByEmail$('tester@mail.com').subscribe(user => { // User kommt vom auth Service
      this.currentChannels = user[0].channels;
    });
  }

  openChannel(channelId: string) {
    this.selectedChannelName = channelId;
    this.router.navigateByUrl(`main/${channelId}`);
  }
}
