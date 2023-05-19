import { Component, inject } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { ChatDbService } from 'src/app/shared/service/chat-db.service';
import { UserDbService } from 'src/app/shared/service/user-db.service';
import { Message } from 'src/app/shared/types/message';
import { User } from 'src/app/shared/types/user';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss']
})
export class ChatAreaComponent {
  chatService: ChatDbService = inject(ChatDbService);
  userService: UserDbService = inject(UserDbService);
  chatId: string = 'bHADuOvmaLFl970vTDFK'; // Wird bei Click auf Chat an Chat Komponente übergeben.
  messages!: Observable<Message[]>;

  constructor() {
    this.messages = this.chatService.getMessages$(this.chatId).pipe(tap(this.scrollToLastMessage));
  }

  scrollToLastMessage() {
    const messagesEl = document.querySelectorAll('.message');
    const lastMessageEl = messagesEl[messagesEl.length - 1];

    lastMessageEl?.scrollIntoView({block: 'center', behavior: 'smooth'});
  }
}
