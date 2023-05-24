import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ChannelDbService } from 'src/app/shared/service/channels-db.service';
import { UserDbService } from 'src/app/shared/service/user-db.service';
import { TMessage } from 'src/app/shared/types/message';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss'],
})
export class ChatAreaComponent {
  chatService: ChannelDbService = inject(ChannelDbService);
  userService: UserDbService = inject(UserDbService);
  route: ActivatedRoute = inject(ActivatedRoute);
  messages!: Observable<TMessage[]>;
  chatId: string = 'bHADuOvmaLFl970vTDFK'; // Wird später mit Subscription aus Route ausgelesen, siehe constructor.

  constructor() {
    this.route.url.subscribe((route) => {
      this.messages = this.chatService
        .getMessages$(route[0].path)
        .pipe(tap(this.scrollToLastMessage));
    });
    // this.messages = this.chatService.getMessages$(this.chatId).pipe(tap(this.scrollToLastMessage)); // Bis Chat Id in Route -> danach über subscription.
  }

  scrollToLastMessage() {
    const messagesEl = document.querySelectorAll('.message');
    const lastMessageEl = messagesEl[messagesEl.length - 1];

    lastMessageEl?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }
}
