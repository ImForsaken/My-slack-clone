import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TUser } from 'src/app/shared/types/user';
import { UiService } from '../../shared/service/ui.service';
import { TChannel } from 'src/app/shared/types/chat';

@Component({
  selector: 'app-user-icon',
  templateUrl: './user-icon.component.html',
  styleUrls: ['./user-icon.component.scss'],
})
export class UserIconComponent implements OnInit, OnDestroy {
  userSub$!: Subscription;
  labelSub$!: Subscription;
  user!: TUser;
  channel!: TChannel;

  constructor(private uiService: UiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.getLabel();
  }

  getLabel() {
    this.labelSub$ = this.uiService.labelSubject$.subscribe((data) => {
      if (data) {
        // TUser property
        if ('username' in data) {
          this.cdr.markForCheck();
          this.user = data;
        }
        //TChannel property
        if ('name' in data) {
          this.channel = data;
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userSub$) {
      this.userSub$.unsubscribe;
    }
    if (this.labelSub$) {
      this.labelSub$.unsubscribe();
    }
  }
}
