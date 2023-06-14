import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/shared/service/store.service';
import { TUser } from 'src/app/shared/types/user';

@Component({
  selector: 'app-chat-hint',
  templateUrl: './chat-hint.component.html',
  styleUrls: ['./chat-hint.component.scss'],
})
export class ChatHintComponent {
  userSub$!: Subscription;
  user: TUser | null = null;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.userSub$ = this.storeService.currentUser$.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userSub$) {
      this.userSub$.unsubscribe();
    }
  }
}
