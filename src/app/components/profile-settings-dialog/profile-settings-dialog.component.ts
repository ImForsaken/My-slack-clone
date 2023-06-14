import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoreService } from 'src/app/shared/service/store.service';
import { UserDbService } from 'src/app/shared/service/user-db.service';
import { TUser } from 'src/app/shared/types/user';

@Component({
  selector: 'app-profile-settings-dialog',
  templateUrl: './profile-settings-dialog.component.html',
  styleUrls: ['./profile-settings-dialog.component.scss'],
})
export class ProfileSettingsDialogComponent {
  userService: UserDbService = inject(UserDbService);
  storeService: StoreService = inject(StoreService);
  userId!: string;
  userInformation: TUser | undefined;
  editProfileForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { userId: string }) {
    this.userId = data.userId;
    this.editProfileForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      profilePicture: new FormControl('', Validators.required),
    });
    console.log(this.userId);
    this.userService.getUserById$(this.userId).subscribe((user: TUser) => {
      this.userInformation = user;
      console.log(this.userInformation);
      this.createEditProfileForm();
    });
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  createEditProfileForm() {
    this.editProfileForm = new FormGroup({
      firstname: new FormControl(
        this.userInformation!.firstname,
        Validators.required
      ),
      lastname: new FormControl(
        this.userInformation!.lastname,
        Validators.required
      ),
      profilePicture: new FormControl('', Validators.required),
    });
  }
}
