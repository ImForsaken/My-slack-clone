import { Component, Input } from '@angular/core';
import { ChannelNode } from 'src/app/components/channels/channelNote.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  opened: boolean = true;

  /**
   * Hier den aktuellen Channel aud Firebase angeben
   */
  channel: ChannelNode = { name: 'allgemein' };
  constructor() {}
}
