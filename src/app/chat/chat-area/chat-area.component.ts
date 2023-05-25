import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ChannelDbService } from 'src/app/shared/service/channels-db.service';
import { TMessage } from 'src/app/shared/types/message';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss'],
})
export class ChatAreaComponent {
  chatService: ChannelDbService = inject(ChannelDbService);
  route: ActivatedRoute = inject(ActivatedRoute);
  messages!: Observable<TMessage[]>;

  constructor() {
    this.route.url.subscribe((route) => {
      this.messages = this.chatService
        .getMessages$(route[0].path)
        .pipe(tap(this.scrollToLastMessage));
    });
  }

  scrollToLastMessage() {
    const messagesEl = document.querySelectorAll('.message');
    const lastMessageEl = messagesEl[messagesEl.length - 1];

    lastMessageEl?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }
}
