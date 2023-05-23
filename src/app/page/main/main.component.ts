import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDbService } from 'src/app/shared/service/user-db.service';
import { TUser } from 'src/app/shared/types/user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  isSidenavOpened: boolean = true;
  isDirectMessageOpen: boolean = true;
  isChannelsOpen: boolean = true;
}
