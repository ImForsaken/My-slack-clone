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
  hide = true;

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

  loginUser() {
    signInWithEmailAndPassword(
      this.store.auth,
      this.loginForm.controls['userEmail'].value,
      this.loginForm.controls['userPassword'].value
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Login successful', user, user.uid);
        this.store.router.navigate(['/main']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('Error codes', errorCode, errorMessage);
      });
  }
}
