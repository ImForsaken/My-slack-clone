import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { UserDbService } from './user-db.service';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  user,
  User,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

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

  signOutUser() {
    signOut(this.auth)
      .then((result) => {
        // Sign-out successful.
        console.log('logged Out', result);
        this.router.navigate(['']);
      })
      .catch((error) => {
        // An error happened.
        console.log('cant log out', error);
      });
  }
}
