import { Component, Input, inject } from '@angular/core';
import { ChatDbService } from 'src/app/shared/service/chat-db.service';
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
  @Input() chatId!: string;
  chatService: ChatDbService = inject(ChatDbService);
  text!: string;

  quillStyle = {
    border: '2px solid #cac0cb',
    borderTop: 'none',
    borderRadius: '0 0 10px 10px'
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const date = new Date();
      const message: Message = {
        userId: 'xyz',
        userName: 'Dennis Ammen',
        text: this.text,
        timestamp: date.toISOString()
      }

      this.chatService.addMessage(this.chatId, message);

      this.text = '';
    }
  }

}
