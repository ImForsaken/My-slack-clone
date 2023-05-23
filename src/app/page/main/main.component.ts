import { Component } from '@angular/core';
import { ChannelDbService } from 'src/app/shared/service/channels-db.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  isSidenavOpened: boolean = true;
  isDirectMessageOpen: boolean = true;
  isChannelsOpen: boolean = true;

  channels: any[] = [];

  constructor(private channelService: ChannelDbService) {}
}
