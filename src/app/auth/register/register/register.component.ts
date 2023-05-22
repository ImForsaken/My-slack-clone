import { Component, OnInit, inject } from '@angular/core';
import { User, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StoreService } from 'src/app/shared/service/store.service';
import { TUser } from 'src/app/shared/types/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  registerForm!: FormGroup;
  errorMsg: string | null = null;
  loginForm!: FormGroup;

  private firestore: Firestore = inject(Firestore);

  constructor(public store: StoreService) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      userEmail: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/),
      ]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      userPassword: new FormControl('', Validators.required),
    });
  }

  getLoginData(): FormGroup {
    const loginForm = new FormGroup({
      userEmail: new FormControl(this.registerForm.controls['userEmail'].value),
      userPassword: new FormControl(
        this.registerForm.controls['userPassword'].value
      ),
    });

    return loginForm;
  }

  signUp() {
    createUserWithEmailAndPassword(
      this.store.auth,
      this.registerForm.controls['userEmail'].value,
      this.registerForm.controls['userPassword'].value
    )
      .then(async (userCredential) => {
        // Sign-Up
        const user = userCredential.user;
        console.log(user);
        await this.addUserToCollection(user);
        this.store.loginUser(this.getLoginData());
      })
      .catch((error) => {
        this.errorMsg = 'Email already in use!';
      });
  }

  async addUserToCollection(user: User) {
    await setDoc(
      doc(this.firestore, 'users', user.uid),
      this.createUserInterface(user.uid)
    );
  }

  createUserInterface(id: string) {
    const userData: TUser = {
      username: this.registerForm.controls['userName'].value,
      email: this.registerForm.controls['userEmail'].value,
      firstname: this.registerForm.controls['firstName'].value,
      lastname: this.registerForm.controls['lastName'].value,
      id: id,
      isOnline: false,
      profilePicture: 'imgUrl',
      channels: [],
      directMessages: [],
    };
    return userData;
  }
}
