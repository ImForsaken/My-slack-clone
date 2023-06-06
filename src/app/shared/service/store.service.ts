import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserDbService } from './user-db.service';
import {
  Auth,
  browserSessionPersistence,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { setPersistence } from '@firebase/auth';
import { TUser } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  userZZZ!: TUser;
  authLoggedUserUID!: string;
  currentUser$!: Observable<TUser | null>;
  currentChat$!: Observable<string>;

  guestLoginCredentials = new FormGroup({
    userEmail: new FormControl('guestuser@guestuserslackclone.de'),
    userPassword: new FormControl('123456'),
  });

  constructor(
    public router: Router,
    public userDBService: UserDbService,
    public auth: Auth
  ) {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        // user is logged in
        this.authLoggedUserUID = user.uid;
        console.log('uid: ', user.uid);
        this.currentUser$ = this.userDBService.getUserById$(user.uid);
        this.userDBService
          .getUserById$(user.uid)
          .subscribe((user) => (this.userZZZ = user));
        console.log('currentUser:', this.currentUser$);
      } else {
        // user is not logged in
        console.log('elseBlock');
        if (this.userZZZ) {
          console.log('TEEEEESSSSSTT');
          this.userZZZ.username = 'Ignatz';
          this.userDBService.updateUser(this.authLoggedUserUID, this.userZZZ);
        }
        this.currentUser$ = of(null);
        //1. firestore der User mit Id this.userUID status update auf Offline nur wenn this.userUID ist definiert
      }
    });
  }

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
        this.currentUser$ = this.userDBService.getUserById$(user.uid);
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
