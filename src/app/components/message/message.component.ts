import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChannelDbService } from 'src/app/shared/service/channels-db.service';
import { Message } from 'src/app/shared/types/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  channelService: ChannelDbService = inject(ChannelDbService);
  route: ActivatedRoute = inject(ActivatedRoute);
  channelId!: string;
  @Input() message!: Message;

  constructor() {
    this.route.url.subscribe(route => {
      this.channelId = route[0].path;
    });
  }

  deleteMessage(messageId: string) {
    
    this.channelService.deleteMessage(this.channelId, messageId);
  }
}
