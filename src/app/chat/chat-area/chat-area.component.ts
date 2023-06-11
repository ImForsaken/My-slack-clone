import { Component, Input, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Observable, Subscription, tap } from 'rxjs';
import { ChannelDbService } from 'src/app/shared/service/channels-db.service';
import { DirectMessageDbService } from 'src/app/shared/service/direct-messages-db.service';
import { ThreadService } from 'src/app/shared/service/thread.service';
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
  public threadService: ThreadService = inject(ThreadService);

  private routeSub!: Subscription;
  private threadSub!: Subscription;

  public messages!: Observable<TMessage[]> | null;

  @Input() chatType!: 'chat' | 'thread';

  /**
   * Executes on component initialisation.
   * Subscibe the ActivatedRoute and load the messages on route change.
   */
  ngOnInit(): void {
    if (this.chatType === 'chat') {
      this.routeSub = this.route.url.subscribe((route) => this.loadMessages(route));
    } else if (this.chatType === 'thread') {
      this.threadSub = this.threadService.loadedThread$.subscribe(threadId => {
        if (threadId) {
          this.messages = this.threadService.getThreadMessages$(threadId);
        } else {
          this.resetMessages();
        }
      })
    }
  }

  /**
   * Loads the messages via the chat or direct message service.
   * This depends on the given url segment. If the url starts with
   * channel the chat service is used, if the url starts with dmuser
   * the direct message service is used to load the messages.
   * @param route 
   */
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

  /**
   * Resets the messages to null.
   */
  resetMessages(): void {
    this.messages = null;
  }

  /**
   * Scolls to the last message in the current chat.
   */
  scrollToLastMessage(): void {
    const messagesEl: NodeListOf<Element> = document.querySelectorAll('.message');
    const lastMessageEl: Element = messagesEl[messagesEl.length - 1];

    lastMessageEl?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }

  /**
   * Executes when a component is destroyed.
   * Unsubsibe all subs when component gets destroyed.
   */
  ngOnDestroy(): void {
    if (this.chatType === 'chat') {
      this.routeSub.unsubscribe();
    } else if (this.chatType === 'thread') {
      this.threadSub.unsubscribe();
    }
  }
}
