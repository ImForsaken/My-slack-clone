import { Component } from '@angular/core';
import { StoreService } from 'src/app/shared/service/store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public storeService: StoreService) {}
}
