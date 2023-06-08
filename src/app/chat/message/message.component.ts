import { Component, Input, inject } from '@angular/core';
import { ChannelDbService } from 'src/app/shared/service/channels-db.service';
import { SidenavService } from 'src/app/shared/service/sidenav.service';
import { ThreadService } from 'src/app/shared/service/thread.service';
import { TMessage } from 'src/app/shared/types/message';
import { Location } from '@angular/common';
import { DirectMessageDbService } from 'src/app/shared/service/direct-messages-db.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  private channelService: ChannelDbService = inject(ChannelDbService);
  private directMessageService: DirectMessageDbService = inject(DirectMessageDbService);
  private location: Location = inject(Location);
  public threadService: ThreadService = inject(ThreadService);
  public sidenavService: SidenavService = inject(SidenavService);
  
  @Input() messageType!: 'chat' | 'thread';
  @Input() message!: TMessage;

  deleteMessage(messageId: string): void {
    const urlPath: string |undefined = this.location.path().split('/').at(-1);
    const chatType: string |undefined = urlPath?.split('_')[0];
    const chatId: string |undefined = urlPath?.split('_')[1];

    if (this.messageType === 'chat') {
      if (chatType === 'channel') {
        this.channelService.deleteMessage(chatId!, messageId, this.message.threadId);
      } else if (chatType === 'dmuser') {
        this.directMessageService.deleteMessage(chatId!, messageId);
      }
    }
    if (this.messageType === 'thread') {
      this.threadService.deleteMessage(this.threadService.loadedThread$.getValue(), messageId);
    }
  }

  showThread(messageId: string, threadId: string | undefined): void {
    this.threadService.openThread(threadId, messageId);
  }
}