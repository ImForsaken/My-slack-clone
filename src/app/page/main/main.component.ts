import { Component, DoCheck, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
} from '@angular/router';
import { ChannelDbService } from 'src/app/shared/service/channels-db.service';
import { UserDbService } from 'src/app/shared/service/user-db.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, DoCheck {
  isSidenavOpened: boolean = true;
  isDirectMessageOpen: boolean = true;
  isChannelsOpen: boolean = true;

  channels: any[] = [];

  constructor(
    private channelService: ChannelDbService,
    private route: ActivatedRoute,
    private router: Router,
    public userServcie: UserDbService
  ) {}

  ngOnInit(): void {}

  ngDoCheck() {}
}
