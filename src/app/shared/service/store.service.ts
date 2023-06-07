import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDbService } from './user-db.service';
import {
  Auth,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
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
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { TChannel } from '../types/chat';
import { RegisterFormComponent } from 'src/app/auth/register-form/register-form.component';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private firestore: Firestore = inject(Firestore);
  userService: UserDbService = inject(UserDbService);
  public auth: Auth = inject(Auth);
  currentUser$!: Observable<TUser>;
  currentChat$!: Observable<string>;
  loggedInUserID$ = new BehaviorSubject<string>('');
  userId!: string;

  guestLoginCredentials = new FormGroup({
    userEmail: new FormControl('guestuser@guestuserslackclone.de'),
    userPassword: new FormControl('123456'),
  });

  constructor(public router: Router) {}

  loginUser(loginForm: FormGroup): void {
    setPersistence(this.auth, browserSessionPersistence)
      .then(() => {
        this.loginCredentials(loginForm);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  guestLogin() {
    this.loginUser(this.guestLoginCredentials);
  }

  loginCredentials(loginForm: FormGroup) {
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
        setTimeout(() => {
          this.router.navigate(['/main']);
        }, 500);
      })
      .catch((error) => {
        console.log('Error codes', error);
      });
  }

  signUp(registerForm: FormGroup, registerComponent: RegisterFormComponent) {
    createUserWithEmailAndPassword(
      this.auth,
      registerForm.controls['userEmail'].value,
      registerForm.controls['userPassword'].value
    )
      .then(async (userCredential) => {
        // Sign-Up
        const user = userCredential.user;
        console.log(user);
        await this.addUserToCollection(user, registerForm);
        this.loginUser(this.getLoginData(registerForm));
      })
      .catch((error) => {
        registerComponent.setErrorMessage('Email already in use!');
      });
  }

  getLoginData(registerForm: FormGroup): FormGroup {
    const loginForm = new FormGroup({
      userEmail: new FormControl(registerForm.controls['userEmail'].value),
      userPassword: new FormControl(
        registerForm.controls['userPassword'].value
      ),
    });
    return loginForm;
  }

  async addUserToCollection(user: User, registerForm: FormGroup) {
    await setDoc(
      doc(this.firestore, 'users', user.uid),
      this.createNewUser(user.uid, registerForm)
    );
  }

  createNewUser(id: string, registerForm: FormGroup) {
    const userData: TUser = {
      username: registerForm.controls['userName'].value,
      email: registerForm.controls['userEmail'].value,
      firstname: registerForm.controls['firstName'].value,
      lastname: registerForm.controls['lastName'].value,
      id: id,
      isOnline: false,
      profilePicture: '../../../assets/images/user.png',
      channels: this.setStandardChannels(),
      directMessages: [],
    };
    return userData;
  }

  setStandardChannels() {
    const channels: TChannel[] = [
      {
        name: 'Allgemein',
        id: '6DiSW40zY13TUg9RGBwL',
        status: 'public',
      },
      {
        name: 'Community',
        id: '3NvnI5JguDd2UizBqnkP',
        status: 'public',
      },
      {
        status: 'public',
        name: 'JavaScript',
        id: 'Y0nlU5MQOOdUbwElvEwQ',
        createdOn: 'activeUser',
      },
    ];
    return channels;
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
