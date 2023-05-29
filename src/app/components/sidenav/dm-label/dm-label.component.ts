import { Component, Input } from '@angular/core';
import { UserDbService } from 'src/app/shared/service/user-db.service';
import { TUser } from 'src/app/shared/types/user';

@Component({
  selector: 'app-dm-label',
  templateUrl: './dm-label.component.html',
  styleUrls: ['./dm-label.component.scss'],
})
export class DmLabelComponent {
  isOnline: boolean = true;

  username: string = 'Georg Strassberger';
  @Input() user!: TUser;

  constructor(private userService: UserDbService) {}

  onDeleteUser(userID: string | undefined): void {
    if (userID) {
      this.userService.deleteUser(userID);
    }
  }

  leaveDMChat(): void {
    console.log('dm Chat verlassen');
  }
}
