import { Injectable } from '@angular/core';
import { ChannelNode } from '../interface/channelNode.interface';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  // Wird später mit der DatenBank Firebase verknüpft
  allChannels: ChannelNode[] = [
    {
      name: 'Channels',
      children: [
        { name: 'allgemain' },
        { name: 'community' },
        { name: 'news' },
      ],
    },
  ];

  constructor() {}

  /**
   * returns a copy of all channels from Firebase
   * @returns
   */
  getAllChannels(): ChannelNode[] {
    return this.allChannels.slice();
  }
}
