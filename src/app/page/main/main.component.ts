import { Component, OnInit } from '@angular/core';
import { ChannelNode } from 'src/app/shared/interface/channelNode.interface';
import { ChannelService } from 'src/app/shared/service/channel.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  isSidenavOpened: boolean = true;
  /**
   * Hier den aktuellen Channel aud Firebase angeben
   */
  channels: ChannelNode[] = [];
  currentChannelName: string = 'currentChannelName';

  constructor(private channelservice: ChannelService) {}

  ngOnInit() {
    this.channels = this.channelservice.getAllChannels();
  }

  displayName(name: string) {
    this.currentChannelName = name;
  }
}
