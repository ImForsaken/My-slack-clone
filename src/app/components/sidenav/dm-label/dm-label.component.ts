import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/shared/service/store.service';
import { UserDbService } from 'src/app/shared/service/user-db.service';
import { TUser } from 'src/app/shared/types/user';

@Component({
  selector: 'app-dm-label',
  templateUrl: './dm-label.component.html',
  styleUrls: ['./dm-label.component.scss'],
})
export class DmLabelComponent {
  private storeService: StoreService = inject(StoreService);

  @Input() dmUser!: TUser;
  @Output() leaveChat: EventEmitter<string> = new EventEmitter<string>();

  constructor(private userService: UserDbService, private router: Router) {}

  /**
   * set dmUser.id to url
   * @param dmUser
   */
  openDirectMessage(dmUser: TUser): void {
    const dmId = dmUser.directMessages.find((dm) => {
      return dm.chatPartnerID === this.storeService.user.id;
    });

    this.router.navigateByUrl(`main/dmuser_${dmId?.dmDocID}`);
  }

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
