import { Injectable } from '@angular/core';
import { ChannelNode } from '../interface/channelNode.interface';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

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

  activeChannel$ = new Subject<string>();

  constructor(private router: Router) {}

  ngOnInit() {}

  openChannel(channel: string) {
    this.activeChannel$.next(channel);
    this.router.navigate(['main/' + channel]);
  }

  /**
   * returns a copy of all channels from Firebase
   * @returns
   */
  getAllChannels(): ChannelNode[] {
    return this.allChannels.slice();
  }
}
