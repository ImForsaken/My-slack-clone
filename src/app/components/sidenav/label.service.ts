import { Injectable } from '@angular/core';
import { TChannel } from 'src/app/shared/types/chat';
import { TUser } from 'src/app/shared/types/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LabelService {
  activeLabel: TUser | TChannel | null = null;
  labelSubject$ = new BehaviorSubject<TUser | TChannel | null>(null);

  /**
   * returns stored Channel-, Username as string or null
   * @returns
   */
  getActiveNameOfChannelOfUser(): string | null {
    if (this.activeLabel) {
      if ('username' in this.activeLabel) {
        console.log('if username: ', this.activeLabel);
        return this.activeLabel.username;
      } else if ('name' in this.activeLabel) {
        console.log('if name: ', this.activeLabel);
        return this.activeLabel.name;
      }
    }
    return null;
  }

  /**
   * returns stored user obj or null
   * @returns
   */
  getActiveUser(): TUser | null {
    if (this.activeLabel) {
      if ('username' in this.activeLabel) {
        const user = this.activeLabel;
        return user;
      }
    }
    return null;
  }

  /**
   * returns stored channel obj or null
   * @returns
   */
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
