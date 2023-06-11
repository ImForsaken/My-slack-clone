import { Component, Input, inject, OnInit } from '@angular/core';
import { ChannelDbService } from 'src/app/shared/service/channels-db.service';
import { SidenavService } from 'src/app/shared/service/sidenav.service';
import { ThreadService } from 'src/app/shared/service/thread.service';
import { TMessage } from 'src/app/shared/types/message';
import { Location } from '@angular/common';
import { DirectMessageDbService } from 'src/app/shared/service/direct-messages-db.service';
import { StoreService } from 'src/app/shared/service/store.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  private channelService: ChannelDbService = inject(ChannelDbService);
  private directMessageService: DirectMessageDbService = inject(DirectMessageDbService);
  private location: Location = inject(Location);
  public threadService: ThreadService = inject(ThreadService);
  public sidenavService: SidenavService = inject(SidenavService);
  public storeService: StoreService = inject(StoreService);

  public threadText!: string;
  
  @Input() messageType!: 'chat' | 'thread';
  @Input() message!: TMessage;

  /**
   * Executes on component initialisation.
   * Sets the text for the message footer wether there is already a thread.
   */
  ngOnInit() {
    this.threadText = this.message?.threadId ? 'Show Thread' : 'Open new Thread';
  }
  
  /**
   * Deletes the message and differentiates between channel and direct message based on the url.
   * @param messageId Document id of the message.
   */
  deleteMessage(messageId: string): void {
    const urlPath: string |undefined = this.location.path().split('/').at(-1);
    const chatType: string |undefined = urlPath?.split('_')[0];
    const chatId: string |undefined = urlPath?.split('_')[1];

    if (this.messageType === 'chat') {
      if (chatType === 'channel') {
        this.channelService.deleteMessage(chatId!, messageId, this.message.threadId);
      } else if (chatType === 'dmuser') {
        this.directMessageService.deleteMessage(chatId!, messageId, this.message.threadId);
      }
    }
    if (this.messageType === 'thread') {
      this.threadService.deleteMessage(this.threadService.loadedThread$.getValue(), messageId);
    }
  }

  /**
   * Opens the thread sidenav via the sidenav service.
   * @param messageId Document id of the message.
   * @param threadId Document id of the thread.
   */
  showThread(messageId: string, threadId: string | undefined): void {
    this.threadService.openThread(threadId, messageId);
  }
}