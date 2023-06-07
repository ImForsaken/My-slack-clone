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
    console.log(this.userId);
    this.userService.getUserById$(this.userId).subscribe((user: TUser) => {
      this.userInformation = user;
      console.log(this.userInformation);
    });
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  editUserProfile() {
    this.editProfileForm = new FormGroup({
      username: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.required),
      profilePicture: new FormControl('', Validators.required),
    });
  }
}
