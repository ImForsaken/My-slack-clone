import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDbService } from './user-db.service';
import {
  Auth,
  browserSessionPersistence,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  user,
  User,
  UserCredential,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { setPersistence } from '@firebase/auth';
import { TUser } from '../types/user';
import { AuthGuard } from './auth.guard';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  userService: UserDbService = inject(UserDbService);
  public auth: Auth = inject(Auth);
  currentUser$!: Observable<TUser>;
  currentChat$!: Observable<string>;
  loggedInUserID$ = new BehaviorSubject<string>('');
  loggedInUser$!: User;

  constructor(public router: Router) {
    // this.userAuth$.subscribe((aUser: User | null) => {
      //handle user state changes here. Note, that user will be null if there is no currently logged in user.
      // console.log('userSubscription', aUser);
    // });
  }
  guestLoginCredentials = new FormGroup({
    userEmail: new FormControl('guestuser@guestuserslackclone.de'),
    userPassword: new FormControl('123456'),
  });


  loginUser(loginForm: FormGroup): void {
    setPersistence(this.auth, browserSessionPersistence)
      .then(() => {
        this.signUpUser(loginForm);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  guestLogin() {
    this.loginUser(this.guestLoginCredentials);
  }

  signUpUser(loginForm: FormGroup) {
    // Existing and future Auth states are now persisted in the current session only. Closing the window would clear any existing state even if a user forgets to sign out. New sign-in will be persisted with session persistence.
    return signInWithEmailAndPassword(
      this.auth,
      loginForm.controls['userEmail'].value,
      loginForm.controls['userPassword'].value
    )
      .then((userCredential: UserCredential) => {
        const user = userCredential.user;
        this.currentUser$ = this.userService.getUserById$(user.uid);
        this.loggedInUserID$.next(user.uid); // Wenn login erfolgreich, wird der neue wert weitergereicht.
        console.log('Login successful for User:', user);
        this.router.navigate(['/main']);
      })
      .catch((error) => {
        console.log('Error codes', error);
      });
  }

  logout(): void {
    signOut(this.auth)
      .then((result) => {
        // Sign-out successful.
        console.log('logged Out', result);
        this.router.navigate(['']);
      })
      .catch((error) => {
        console.log('cant log out', error);
      });
  }

  forgotForm(email: string) {
    sendPasswordResetEmail(this.auth, email)
      .then((response) => {
        console.log('success', response);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }
}
