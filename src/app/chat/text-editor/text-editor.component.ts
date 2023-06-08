import { Location } from '@angular/common';
import { Component, Input, inject, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
export class TextEditorComponent implements AfterViewInit, OnDestroy {
  private channelService: ChannelDbService = inject(ChannelDbService);
  private directMessageService: DirectMessageDbService = inject(DirectMessageDbService);
  private threadService: ThreadService = inject(ThreadService);
  private storeService: StoreService = inject(StoreService);
  private location: Location = inject(Location);

  private storeSub!: Subscription;
  private currentUser!: TUser | null;
  
  public text: string = '';
  public quillStyle = {
    border: '2px solid #3f3b3f',
    borderTop: 'none',
    borderRadius: '0 0 10px 10px'
  }

  @Input() inputType!: 'chat' | 'thread';
  
  ngAfterViewInit(): void {
    this.storeSub = this.storeService.currentUser$.subscribe(user => this.currentUser = user);
  }

  onKeyDown(event: KeyboardEvent): void {
    if (
      event.key === 'Enter' &&
      event.shiftKey == false &&
      this.text.length > 0
    ) {
      const inputSize = new Blob([this.text]).size;

      if (inputSize < 1000000) {
        this.prepareNewMessage();
      } else {
        console.log('File is to big');
      }
    }
  }

  prepareNewMessage(): void {
    if (!this.currentUser) return;

    const urlPath = this.location.path().split('/').at(-1);
    const chatType = urlPath?.split('_')[0];
    const chatId = urlPath?.split('_')[1];
    
    const message: TMessage = {
      userId: this.currentUser.id!,
      userName: this.currentUser.username,
      profilePicture: this.currentUser.profilePicture,
      text: this.text,
      timestamp: Date.now()
    }

    if (!chatType || !chatId) return;
    this.sendMessage(chatType, chatId, message);
  }

  sendMessage(chatType: string, chatId: string, message: TMessage): void {
    if (this.inputType === 'chat') {
      this.sendChatMessage(chatType, chatId, message);
    }
    
    if (this.inputType === 'thread') {
      this.sendThreadMessage(chatId, message);
    }

    this.text = '';
  }

  sendChatMessage(chatType: string, chatId: string, message: TMessage): void {
    if (chatType === 'channel') {
      this.channelService.addMessage(chatId!, message);
    } else if (chatType === 'dmuser') {
      this.directMessageService.addMessage(chatId!, message);
    }
  }

  sendThreadMessage(chatId: string, message: TMessage): void {
    let threadId: string = this.threadService.loadedThread$.getValue();

    if (!threadId) {
      threadId = this.threadService.createThread({messageId: this.threadService.messageId});
      this.channelService.addThreadToMessage(chatId!, this.threadService.messageId, threadId);
      this.threadService.loadedThread$.next(threadId);
    }
    this.threadService.addMessage(this.threadService.loadedThread$.getValue(), message);
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }
}
