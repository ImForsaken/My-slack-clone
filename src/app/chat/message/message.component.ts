import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChannelDbService } from 'src/app/shared/service/channels-db.service';
import { SidenavService } from 'src/app/shared/service/sidenav.service';
import { ThreadService } from 'src/app/shared/service/thread.service';
import { TMessage } from 'src/app/shared/types/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  channelService: ChannelDbService = inject(ChannelDbService);
  route: ActivatedRoute = inject(ActivatedRoute);
  sidenavService: SidenavService = inject(SidenavService);
  threadService: ThreadService = inject(ThreadService);
  channelId!: string;
  @Input() message!: TMessage;

  constructor() {
    this.route.url.subscribe(route => {
      this.channelId = route[0].path;
    });
  }

  deleteMessage(messageId: string) {
    
    this.channelService.deleteMessage(this.channelId, messageId);
  }

  loadThread(threadId: string | undefined) {
    if (threadId) {
      this.threadService.getThreadMessages$(threadId).subscribe(data => console.log(data));
    }
  }
}
