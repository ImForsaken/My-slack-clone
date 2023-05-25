import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ChannelDbService } from 'src/app/shared/service/channels-db.service';
import { DirectMessageDbService } from 'src/app/shared/service/direct-messages-db.service';
import { UserDbService } from 'src/app/shared/service/user-db.service';
import { TMessage } from 'src/app/shared/types/message';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss']
})
export class ChatAreaComponent {
  chatService: ChannelDbService = inject(ChannelDbService);
  userService: UserDbService = inject(UserDbService);
  dmService: DirectMessageDbService = inject(DirectMessageDbService);
  route: ActivatedRoute = inject(ActivatedRoute);
  messages!: Observable<TMessage[]>;

  constructor() {
    this.route.url.subscribe(route => {
      this.messages = this.chatService.getMessages$(route[0].path).pipe(tap(this.scrollToLastMessage));
    });
    // this.dmService.createDirectMessage('E7VEbgwn0gTz5HYikQzuKqpRo8b2', 'iJ4qDD1kFNV3qRnPFh5laGbXjaI2');
    // this.dmService.deleteDirectMessage('h7AadiXPcgbZtl3s9LH5');
  }

  scrollToLastMessage() {
    const messagesEl = document.querySelectorAll('.message');
    const lastMessageEl = messagesEl[messagesEl.length - 1];

    lastMessageEl?.scrollIntoView({block: 'center', behavior: 'smooth'});
  }
}
