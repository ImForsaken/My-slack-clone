import { Component } from '@angular/core';
import { StoreService } from 'src/app/shared/service/store.service';

@Component({
  selector: 'app-forgot-password-dialog',
  templateUrl: './forgot-password-dialog.component.html',
  styleUrls: ['./forgot-password-dialog.component.scss'],
})
export class ForgotPasswordDialogComponent {
  userEmail!: string;

  constructor(public store: StoreService) {}
}
