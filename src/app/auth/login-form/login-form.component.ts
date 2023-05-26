import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StoreService } from 'src/app/shared/service/store.service';
import { ForgotPasswordDialogComponent } from '../forgot-password-dialog/forgot-password-dialog.component';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  loginForm!: FormGroup;
  hide: boolean = true;
  errorMsg: string | null = null;

  constructor(public store: StoreService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userEmail: new FormControl(''),
      userPassword: new FormControl(''),
    });
  }

  openDialog() {
    this.dialog.open(ForgotPasswordDialogComponent);
  }

  getErrorMessage() {
    if (this.loginForm.controls['userEmail'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.controls['userEmail'].hasError('email')
      ? 'Not a valid email'
      : '';
  }
}
