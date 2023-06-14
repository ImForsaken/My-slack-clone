import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/shared/service/store.service';
import { UiService } from 'src/app/shared/service/ui.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit, OnDestroy {
  hide = true;
  registerForm!: FormGroup;
  errorMsg: string | null = null;
  loginForm!: FormGroup;
  isLoading: boolean = false;
  private loadingSubs$!: Subscription;

  constructor(public store: StoreService, private uiService: UiService) {}

  ngOnInit(): void {
    this.setLoadingSpinner();
    this.registerForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      userEmail: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/),
      ]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      userPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
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

  setErrorMessage(message: string) {
    this.errorMsg = message;
  }

  ngOnDestroy(): void {
    if (this.loadingSubs$) {
      this.loadingSubs$.unsubscribe();
    }
  }
}
