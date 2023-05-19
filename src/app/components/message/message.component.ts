import { Component, Input, inject } from '@angular/core';
import { ChatDbService } from 'src/app/shared/service/chat-db.service';
import { Message } from 'src/app/shared/types/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  chatService: ChatDbService = inject(ChatDbService);
  @Input() message!: Message;

  deleteMessage(messageId: string) {
    this.chatService.deleteMessage('bHADuOvmaLFl970vTDFK', messageId);
  }
}
