import { Location } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { ChannelDbService } from 'src/app/shared/service/channels-db.service';
import { DirectMessageDbService } from 'src/app/shared/service/direct-messages-db.service';
import { StoreService } from 'src/app/shared/service/store.service';
import { ThreadService } from 'src/app/shared/service/thread.service';
import { TMessage } from 'src/app/shared/types/message';
import { TUser } from 'src/app/shared/types/user';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: [
    './text-editor.component.scss'
  ]
})
export class TextEditorComponent {
  channelService: ChannelDbService = inject(ChannelDbService);
  directMessageService: DirectMessageDbService = inject(DirectMessageDbService);
  threadService: ThreadService = inject(ThreadService);
  storeService: StoreService = inject(StoreService);
  location: Location = inject(Location);
  currentUser!: TUser | null;
  text: string = '';
  chatId!: string;
  
  quillStyle = {
    border: '2px solid #3f3b3f',
    borderTop: 'none',
    borderRadius: '0 0 10px 10px'
  }

  @Input() inputType!: 'chat' | 'thread';
  
  ngAfterViewInit() {
    this.storeService.currentUser$.subscribe(user =>  {this.currentUser = user; console.log('text editor')});
  }

  onKeyDown(event: KeyboardEvent) {
    if (
      event.key === 'Enter' &&
      event.shiftKey == false &&
      this.text.length > 0
    ) {
      const inputSize = new Blob([this.text]).size;

      if (inputSize < 1000000) {
        this.sendNewMessage();
      } else {
        console.log('File is to big');
      }
    }
  }

  sendNewMessage() {
    if (!this.currentUser) return;
    const urlId = this.location.path().split('/').at(-1);
    const chatType = urlId?.split('_')[0];
    const chatId = urlId?.split('_')[1];
    const date = new Date();
    const message: TMessage = {
      userId: this.currentUser.id!,
      userName: this.currentUser.username,
      profilePicture: this.currentUser.profilePicture,
      text: this.text,
      timestamp: Date.now()
    }

    if (this.inputType === 'chat') {
      if (chatType === 'channel') {
        this.channelService.addMessage(chatId!, message);
      } else if (chatType === 'dmuser') {
        this.directMessageService.addMessage(chatId!, message);
      }
    }
    if (this.inputType === 'thread') {
      let threadId = this.threadService.loadedThread$.getValue();

      if (!threadId) {
        threadId = this.threadService.createThread({messageId: this.threadService.messageId});
        this.channelService.addThreadToMessage(chatId!, this.threadService.messageId, threadId);
        this.threadService.loadedThread$.next(threadId);
      }
      this.threadService.addMessage(this.threadService.loadedThread$.getValue(), message);
    }
    this.text = '';
  }
}
