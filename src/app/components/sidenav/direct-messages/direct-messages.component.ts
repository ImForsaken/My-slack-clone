import { Component } from '@angular/core';
import { DirectMessagesServiceService } from 'src/app/shared/service/direct-messages-service.service';

@Component({
  selector: 'app-direct-messages',
  templateUrl: './direct-messages.component.html',
  styleUrls: ['./direct-messages.component.scss'],
})
export class DirectMessagesComponent {
  allUsers: any[] = [];
  constructor(private dmService: DirectMessagesServiceService) {}
}
