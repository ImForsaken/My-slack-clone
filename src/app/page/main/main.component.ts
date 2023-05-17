import { Component } from '@angular/core';
import { ChannelNode } from 'src/app/shared/interface/channelNode.interface';

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
  channel: ChannelNode = { name: 'allgemein' };

  constructor() {}
}
