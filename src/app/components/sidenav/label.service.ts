import { Injectable } from '@angular/core';
import { TChannel } from 'src/app/shared/types/chat';
import { TUser } from 'src/app/shared/types/user';

@Injectable({
  providedIn: 'root',
})
export class LabelService {
  activeLabel: TUser | TChannel | null = null;
}
