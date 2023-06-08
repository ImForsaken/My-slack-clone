import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SidenavService } from 'src/app/shared/service/sidenav.service';
import { ThreadService } from 'src/app/shared/service/thread.service';
import { TMessage } from 'src/app/shared/types/message';

@Component({
  selector: 'app-thread-content',
  templateUrl: './thread-content.component.html',
  styleUrls: ['./thread-content.component.scss']
})
export class ThreadContentComponent implements OnInit, OnDestroy {
  public sidenavService: SidenavService = inject(SidenavService);
  public threadService: ThreadService = inject(ThreadService);
  
  private threadSub!: Subscription;

  public messages!: Observable<TMessage[]> | null;

  ngOnInit(): void {
    this.threadSub = this.threadService.loadedThread$.subscribe(threadId => {
      if (threadId) {
        this.messages = this.threadService.getThreadMessages$(threadId);
      } else {
        this.resetMessages();
      }
    })
  }

  resetMessages(): void {
    this.messages = null;
  }

  ngOnDestroy(): void {
    this.threadSub.unsubscribe();
  }
}
