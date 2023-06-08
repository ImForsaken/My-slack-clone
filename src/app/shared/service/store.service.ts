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
  loggedInUserID$ = new BehaviorSubject<string>('');
  userId!: string;
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
      console.log('Auth State Change getriggert')
      if (user) {
        // user is logged in
        this.authLoggedUserUID = user.uid;

        this.currentUser$ = this.userDBService.getUserById$(user.uid);
        this.userDBService
          .getUserById$(user.uid)
          .subscribe((user) => {console.log('inside onAuthStateChange');(this.user = user)});
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
      .then((userCredential: UserCredential) => {
        const user = userCredential.user;
        console.log('Login successful for User:', user);
        // this.currentUser$ = this.userDBService.getUserById$(user.uid); // ist auch in onAuthStateChanged ????
        // ############################
        // ######### Login ############
        // ############################
        console.log('this.user', this.user);
        this.user.isOnline = true;
        console.log('this.user.isOnline', this.user.isOnline);
        // this.userDBService.updateUser(this.user.id!, this.user);

        setTimeout(() => {
          this.router.navigate(['/main']);
        }, 500);
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

        // ############################
        // ######### LogOUT ############
        // ############################
        this.currentUser$ = this.userDBService.getUserById$(this.user.id!); // ist auch in onAuthStateChanged ????
        console.log('this.user', this.user);
        this.user.isOnline = false;
        console.log('this.user.isOnline', this.user.isOnline);
        // this.userDBService.updateUser(this.user.id!, this.user);

        this.router.navigate(['']);
      })
      .catch((error) => {
        console.log('cant log out', error);
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
