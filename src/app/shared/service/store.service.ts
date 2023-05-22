import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { UserDbService } from './user-db.service';
import {
  Auth,
  browserSessionPersistence,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  user,
  User,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { setPersistence } from '@firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  userService: UserDbService = inject(UserDbService);
  public auth: Auth = inject(Auth);
  userSubscription!: Subscription;

  userAuth$ = user(this.auth);
  loggedInUser$!: User;
  currentChat$!: Observable<string>;

  constructor(public router: Router) {
    // this.userService.getUserByEmail$('tester@testmail.com').subscribe(user => {
    //   this.loggedInUser$ = user[0];
    //   this.currentChat$ = new BehaviorSubject<string>(this.loggedInUser$.chats[0]).asObservable();
    // });
    this.userSubscription = this.userAuth$.subscribe((aUser: User | null) => {
      //handle user state changes here. Note, that user will be null if there is no currently logged in user.
      console.log('userSubscription', aUser);
    });
  }

  loginUser(loginForm: FormGroup) {
    console.log(loginForm);
    setPersistence(this.auth, browserSessionPersistence)
      .then(() => {
        this.signUpUser(loginForm);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  signUpUser(loginForm: FormGroup) {
    // Existing and future Auth states are now persisted in the current session only. Closing the window would clear any existing state even if a user forgets to sign out. New sign-in will be persisted with session persistence.
    return signInWithEmailAndPassword(
      this.auth,
      loginForm.controls['userEmail'].value,
      loginForm.controls['userPassword'].value
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Login successful', user);
        this.router.navigate(['/main']);
      })
      .catch((error) => {
        console.log('Error codes', error);
      });
  }

  logout() {
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

  forgetForm() {
    const email = 'kevin-herbst1993@web.de';
    sendPasswordResetEmail(this.auth, email)
      .then((response) => {
        console.log('success', response);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  // autoLogout(expirationDuration: number) {
  //   setTimeout(() => {
  //     this.logout();
  //   }, expirationDuration);
  // }
}
