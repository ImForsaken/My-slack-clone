import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StoreService } from 'src/app/shared/service/store.service';
import { ForgotPasswordDialogComponent } from '../forgot-password-dialog/forgot-password-dialog.component';
import { UiService } from 'src/app/shared/service/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  hide: boolean = true;
  errorMsg: string | null = null;
  isLoading: boolean = false;
  private loadingSubs$!: Subscription;

  constructor(
    public store: StoreService,
    public dialog: MatDialog,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.setLoadingSpinner();
    this.loginForm = new FormGroup({
      userEmail: new FormControl(''),
      userPassword: new FormControl(''),
    });
  }

  /**
   * subscribe loading status
   */
  setLoadingSpinner(): void {
    this.loadingSubs$ = this.uiService.loadingStateChanged$.subscribe(
      (isLoading) => {
        this.isLoading = isLoading;
      }
    );
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

  ngOnDestroy(): void {
    if (this.loadingSubs$) {
      this.loadingSubs$.unsubscribe();
    }
  }
}
