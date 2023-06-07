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
  private channelService: ChannelDbService = inject(ChannelDbService);
  public threadService: ThreadService = inject(ThreadService);
  public sidenavService: SidenavService = inject(SidenavService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  private channelId!: string;
  
  @Input() messageType!: 'chat' | 'thread';
  @Input() message!: TMessage;

  constructor() {
    this.route.url.subscribe(route => {
      this.channelId = route[0].path;
    });
  }

  deleteMessage(messageId: string) {
    if (this.messageType === 'chat') {
      this.channelService.deleteMessage(this.channelId, messageId, this.message.threadId);
    }
    if (this.messageType === 'thread') {
      console.log('Delete Thread Message', this.threadService.loadedThread$.getValue(), messageId)
      this.threadService.deleteMessage(this.threadService.loadedThread$.getValue(), messageId);
    }
  }

  showThread(messageId: string, threadId: string | undefined) {
    this.threadService.openThread(threadId, messageId);
  }
}
