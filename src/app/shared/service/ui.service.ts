import { Injectable } from '@angular/core';
import { TChannel } from 'src/app/shared/types/chat';
import { TUser } from 'src/app/shared/types/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  activeLabel: TUser | TChannel | null = null;
  labelSubject$ = new BehaviorSubject<TUser | TChannel | null>(null);
}
