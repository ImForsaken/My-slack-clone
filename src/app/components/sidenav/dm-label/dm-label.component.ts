import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserDbService } from 'src/app/shared/service/user-db.service';
import { TUser } from 'src/app/shared/types/user';

@Component({
  selector: 'app-dm-label',
  templateUrl: './dm-label.component.html',
  styleUrls: ['./dm-label.component.scss'],
})
export class DmLabelComponent {
  @Input() dmUser!: TUser;
  @Output() leaveChat: EventEmitter<string> = new EventEmitter<string>();

  constructor(private userService: UserDbService) {}

  /**
   * remove DM-label from list
   */
  leaveDMChat(dmUser: TUser): void {
    this.leaveChat.emit(dmUser.id);
  }

  /**
   * delete User from Database
   * @param userID
   */
  onDeleteUser(userID: string): void {
    if (userID) {
      this.userService.deleteUser(userID);
    }
  }
}
