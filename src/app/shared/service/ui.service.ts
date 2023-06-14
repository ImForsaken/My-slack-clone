import { Injectable } from '@angular/core';
import { TChannel } from 'src/app/shared/types/chat';
import { TUser } from 'src/app/shared/types/user';
import { BehaviorSubject, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  activeLabel: TUser | TChannel | null = null;
  labelSubject$ = new BehaviorSubject<TUser | TChannel | null>(null);

  loadingStateChanged$ = new Subject<boolean>();

  constructor(private snackbar: MatSnackBar) {}

  showSnackbar(message: string, action: string, duration: number): void {
    this.snackbar.open(message, action, { duration: duration });
  }
}
