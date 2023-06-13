import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserDbService } from './user-db.service';
import {
  Auth,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
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
  currentUser$!: Observable<TUser | null>;
  currentChat$!: Observable<string>;
  // loggedInUserID$ = new BehaviorSubject<string>(''); -> wird nicht mehr gebraucht?
  // userId!: string; -> wird nicht mehr gebraucht?
  user!: TUser;
  authLoggedUserUID!: string;

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

        this.currentUser$ = this.userDBService.getUserById$(user.uid);
        this.userDBService.getUserById$(user.uid).subscribe((user) => {
          this.user = user;
        });
      } else {
        // user is NOT logged in
        this.currentUser$ = of(null);
      }
    });
  }

  loginUser(loginForm: FormGroup): void {
    setPersistence(this.auth, browserSessionPersistence)
      .then(() => {
        this.loginCredentials(loginForm);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  guestLogin(): void {
    this.loginUser(this.guestLoginCredentials);
  }

  loginCredentials(loginForm: FormGroup) {
    // Existing and future Auth states are now persisted in the current session only. Closing the window would clear any existing state even if a user forgets to sign out. New sign-in will be persisted with session persistence.
    return signInWithEmailAndPassword(
      this.auth,
      loginForm.controls['userEmail'].value,
      loginForm.controls['userPassword'].value
    )
      .then((userCredential: UserCredential): void => {
        setTimeout(() => {
          this.setUserOnline(this.user);
          this.router.navigate(['/main']);
        }, 500);
      })
      .catch((error) => {
        console.warn('Error codes', error);
      });
  }

  /**
   * set Userstate to online and store it in Firebase
   * @param user
   */
  setUserOnline(user: TUser): void {
    if (!user.isOnline) {
      user.isOnline = true;
      this.userDBService.updateUser(user.id!, user);
    }
  }

  /**
   * set Userstate to offline and store it in Firebase
   * @param user
   */
  setUserOffline(user: TUser): void {
    if (user.isOnline) {
      user.isOnline = false;
      this.userDBService.updateUser(user.id!, user);
    }
  }

  logout(): void {
    signOut(this.auth)
      .then((result) => {
        this.setUserOffline(this.user);
        this.router.navigate(['']);
      })
      .catch((error) => {
        console.warn('cant log out', error);
      });
  }

  signUp(registerForm: FormGroup, registerComponent: RegisterFormComponent) {
    createUserWithEmailAndPassword(
      this.auth,
      registerForm.controls['userEmail'].value,
      registerForm.controls['userPassword'].value
    )
      .then(async (userCredential: UserCredential) => {
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

  createNewUser(id: string, registerForm: FormGroup): TUser {
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

  setStandardChannels(): TChannel[] {
    const channels: TChannel[] = [
      {
        name: 'Allgemein',
        id: '6DiSW40zY13TUg9RGBwL',
        status: 'public',
        createdOn: 'admin',
      },
      {
        name: 'Community',
        id: '3NvnI5JguDd2UizBqnkP',
        status: 'public',
        createdOn: 'admin',
      },
      {
        status: 'public',
        name: 'JavaScript',
        id: 'Y0nlU5MQOOdUbwElvEwQ',
        createdOn: 'admin',
      },
    ];
    return channels;
  }

  forgotForm(email: string): void {
    sendPasswordResetEmail(this.auth, email)
      .then((response) => {
        console.log('success', response);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }
}
