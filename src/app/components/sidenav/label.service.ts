import { Injectable } from '@angular/core';
import { TChannel } from 'src/app/shared/types/chat';
import { TUser } from 'src/app/shared/types/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LabelService {
  activeLabel: TUser | TChannel | null = null;
  mySubject = new BehaviorSubject<TUser | TChannel | null>(null);

  getActiveNameOfChannelOfUser(): string | null {
    if (this.activeLabel) {
      if ('username' in this.activeLabel) {
        return this.activeLabel.username;
      } else if ('name' in this.activeLabel) {
        return this.activeLabel.name;
      }
    }
    return null;
  }

  getActiveUser(): TUser | null {
    if (this.activeLabel) {
      if ('username' in this.activeLabel) {
        const user = this.activeLabel;
        return user;
      }
    }
    return null;
  }

  getActiveChannel(): TChannel | null {
    if (this.activeLabel) {
      if ('name' in this.activeLabel) {
        const channel: TChannel = this.activeLabel;
        return channel;
      }
    }
    return null;
  }
}
