import { Component, OnInit } from '@angular/core';
import { signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { StoreService } from 'src/app/shared/service/store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hide: boolean = true;
  errorMsg: string | null = null;

  constructor(public store: StoreService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userEmail: new FormControl(''),
      userPassword: new FormControl(''),
    });
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
