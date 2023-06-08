import { Component, Input, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Observable, Subscription, tap } from 'rxjs';
import { ChannelDbService } from 'src/app/shared/service/channels-db.service';
import { DirectMessageDbService } from 'src/app/shared/service/direct-messages-db.service';
import { TMessage } from 'src/app/shared/types/message';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss'],
})
export class ChatAreaComponent implements OnDestroy {
  private chatService: ChannelDbService = inject(ChannelDbService);
  private directMessageService: DirectMessageDbService = inject(DirectMessageDbService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  private routeSub!: Subscription;

  public messages!: Observable<TMessage[]>;

  @Input() chatType!: 'chat' | 'thread';

  ngOnInit(): void {
    if (this.chatType === 'chat') {
      this.routeSub = this.route.url.subscribe((route) => this.loadMessages(route));
    }
  }

  loadMessages(route: UrlSegment[]): void {
    const currentRoute: string[] = route[0].path.split('_');
        
    if (currentRoute[0] === 'channel') {
      this.messages = this.chatService
        .getMessages$(currentRoute[1])
        .pipe(tap(this.scrollToLastMessage));
    } else if (currentRoute[0] === 'dmuser') {
      this.messages = this.directMessageService
        .getMessages$(currentRoute[1])
        .pipe(tap(this.scrollToLastMessage));
    }
  }

  scrollToLastMessage(): void {
    const messagesEl: NodeListOf<Element> = document.querySelectorAll('.message');
    const lastMessageEl: Element = messagesEl[messagesEl.length - 1];

    lastMessageEl?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
