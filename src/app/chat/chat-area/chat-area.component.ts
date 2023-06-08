import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ChannelDbService } from 'src/app/shared/service/channels-db.service';
import { DirectMessageDbService } from 'src/app/shared/service/direct-messages-db.service';
import { TMessage } from 'src/app/shared/types/message';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss'],
})
export class ChatAreaComponent implements OnInit {
  private chatService: ChannelDbService = inject(ChannelDbService);
  private directMessageService: DirectMessageDbService = inject(DirectMessageDbService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  public messages!: Observable<TMessage[]>;

  @Input() chatType!: 'chat' | 'thread';

  ngOnInit() {
    if (this.chatType === 'chat') {
      this.route.url.subscribe((route) => {
        console.log('Router subscription');
        const currentRoute = route[0].path.split('_');
        if (currentRoute[0] === 'channel') {
          this.messages = this.chatService
            .getMessages$(currentRoute[1])
            .pipe(tap(this.scrollToLastMessage));
        } else if (currentRoute[0] === 'dmuser') {
          this.messages = this.directMessageService
            .getMessages$(currentRoute[1])
            .pipe(tap(this.scrollToLastMessage));
        }
      });
    }
  }

  scrollToLastMessage() {
    const messagesEl = document.querySelectorAll('.message');
    const lastMessageEl = messagesEl[messagesEl.length - 1];

    lastMessageEl?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }
}
