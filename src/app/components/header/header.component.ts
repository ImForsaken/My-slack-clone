import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StoreService } from 'src/app/shared/service/store.service';
import { ProfileSettingsDialogComponent } from './profile-settings-dialog/profile-settings-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public storeService: StoreService, public dialog: MatDialog) {}
  openDialog() {
    this.dialog.open(ProfileSettingsDialogComponent);
  }
}
