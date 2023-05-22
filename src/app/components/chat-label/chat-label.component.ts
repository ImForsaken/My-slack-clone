import { Component, Input } from '@angular/core';
import { UserDbService } from 'src/app/shared/service/user-db.service';
import { TUser } from 'src/app/shared/types/user';

@Component({
  selector: 'app-chat-label',
  templateUrl: './chat-label.component.html',
  styleUrls: ['./chat-label.component.scss'],
})
export class ChatLabelComponent {
  isOnline: boolean = true;

  username: string = 'Georg Strassberger';
  @Input() user!: TUser;

  constructor(private userService: UserDbService) {}

  onDeleteUser(userID: string | undefined) {
    if (userID) {
      this.userService.deleteUser(userID);
    }
  }
}
