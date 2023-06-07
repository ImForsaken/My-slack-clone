import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { SidenavService } from 'src/app/shared/service/sidenav.service';
import { ThreadService } from 'src/app/shared/service/thread.service';
import { TMessage } from 'src/app/shared/types/message';

@Component({
  selector: 'app-thread-content',
  templateUrl: './thread-content.component.html',
  styleUrls: ['./thread-content.component.scss']
})
export class ThreadContentComponent {
  sidenavService: SidenavService = inject(SidenavService);
  public threadService: ThreadService = inject(ThreadService);

  public messages!: Observable<TMessage[]> | null;

  constructor() {
    this.threadService.loadedThread$.subscribe(threadId => {
      if (threadId) this.messages = this.threadService.getThreadMessages$(threadId);
    })
  }

  resetMessages() {
    this.messages = null;
  }
}
