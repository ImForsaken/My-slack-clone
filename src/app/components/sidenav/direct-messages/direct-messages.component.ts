import { Component } from '@angular/core';
import { DirectMessageDbService } from 'src/app/shared/service/direct-messages-db.service';

@Component({
  selector: 'app-direct-messages',
  templateUrl: './direct-messages.component.html',
  styleUrls: ['./direct-messages.component.scss'],
})
export class DirectMessagesComponent {
  allUsers: any[] = [];
  constructor(private dmService: DirectMessageDbService) {}
}
