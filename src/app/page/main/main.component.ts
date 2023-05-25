import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoggedUser } from 'src/app/shared/service/loggedUser.service';
import { UserDbService } from 'src/app/shared/service/user-db.service';
import { TUser } from 'src/app/shared/types/user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  isSidenavOpened: boolean = true;

  constructor(public userServcie: UserDbService, public dialog: MatDialog) {}

  ngOnInit(): void {}
}
