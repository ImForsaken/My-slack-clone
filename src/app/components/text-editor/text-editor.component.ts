import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChannelDbService } from 'src/app/shared/service/channels-db.service';
import { Chat } from 'src/app/shared/types/chat';
import { Message } from 'src/app/shared/types/message';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: [
    './text-editor.component.scss'
  ]
})
export class TextEditorComponent {
  channelService: ChannelDbService = inject(ChannelDbService);
  route: ActivatedRoute = inject(ActivatedRoute);
  text: string = '';
  chatId!: string;
  
  quillStyle = {
    border: '2px solid #3f3b3f',
    borderTop: 'none',
    borderRadius: '0 0 10px 10px'
  }

  constructor() {
    this.route.url.subscribe(route => {
      this.chatId = route[0].path;
    });
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
    const date = new Date();
    const message: Message = {
      userId: 'xyz',
      userName: 'Dennis Ammen',
      profilePicture: 'url',
      text: this.text,
      timestamp: date.toUTCString()
    }

    this.channelService.addMessage(this.chatId, message);
    this.text = '';
  }
}
