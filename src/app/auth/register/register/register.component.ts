import { Component, OnInit, inject } from '@angular/core';
import { createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StoreService } from 'src/app/shared/service/store.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  registerForm!: FormGroup;
  errorMsg: string | null = null;
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

  createUserInterface(id: string) {
    return {
      userName: this.registerForm.controls['userName'].value,
      userEmail: this.registerForm.controls['userEmail'].value,
      firstName: this.registerForm.controls['firstName'].value,
      lastName: this.registerForm.controls['lastName'].value,
      userId: id,
      isOnline: false,
      profilePicture: 'imgUrl',
    };
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
        await setDoc(
          doc(this.firestore, 'users', user.uid),
          this.createUserInterface(user.uid)
        );
      })
      .catch((error) => {
        this.errorMsg = 'Email already in use!';
      });
  }
}
