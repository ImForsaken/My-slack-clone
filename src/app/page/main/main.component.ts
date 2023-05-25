import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthGuard } from 'src/app/shared/service/auth.guard';
import { UserDbService } from 'src/app/shared/service/user-db.service';
import { TUser } from 'src/app/shared/types/user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  loggedUser$!: Subscription;
  loggedUser!: TUser;
  isSidenavOpened: boolean = true;

  constructor(
    public userServcie: UserDbService,
    public dialog: MatDialog,
    private authGuard: AuthGuard,
    private userService: UserDbService
  ) {}

  ngOnInit(): void {
    this.getLoggedUser();
  }

  /**
   * observe with user are logged in
   */
  getLoggedUser(): void {
    const authUser: User = this.authGuard.getAuthUser();
    const authUserID: string = authUser.uid;
    this.loggedUser$ = this.userService
      .getUserById$(authUserID)
      .subscribe((user: TUser): void => {
        this.loggedUser = user;
        console.log('loggedUserIs: ', user);
      });
  }
}
