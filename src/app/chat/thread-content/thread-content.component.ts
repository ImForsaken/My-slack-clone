import { Component, inject } from '@angular/core';
import { SidenavService } from 'src/app/shared/service/sidenav.service';

@Component({
  selector: 'app-thread-content',
  templateUrl: './thread-content.component.html',
  styleUrls: ['./thread-content.component.scss']
})
export class ThreadContentComponent {
  sidenavService: SidenavService = inject(SidenavService);
  
}
