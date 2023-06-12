import { Injectable } from '@angular/core';
import { TChannel } from 'src/app/shared/types/chat';
import { TUser } from 'src/app/shared/types/user';

@Injectable({
  providedIn: 'root',
})
export class LabelService {
  activeLabel: TUser | TChannel | null = null;

  getActiveName(): string | null {
    if (this.activeLabel) {
      if ('username' in this.activeLabel) {
        return this.activeLabel.username;
      } else if ('name' in this.activeLabel) {
        return this.activeLabel.name;
      }
    }
    return null;
  }

  getActiveObject() {
    if (this.activeLabel) {
      if ('username' in this.activeLabel) {
        const user = this.activeLabel;
        return user;
      }
    }
    return null;
  }
}
