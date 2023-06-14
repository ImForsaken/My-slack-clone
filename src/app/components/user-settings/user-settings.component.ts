import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserDbService } from 'src/app/shared/service/user-db.service';
import { TUser } from 'src/app/shared/types/user';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent {
  @ViewChild('tfUsername') myInputRef!: ElementRef;
  isImageSizeExceeded: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      user: TUser;
    },
    private userService: UserDbService,
    public dialogRef: MatDialogRef<UserSettingsComponent>
  ) {}

  getValueFromInput() {
    const inputValue = this.myInputRef.nativeElement.value.trim();
    if (inputValue.length > 3) {
      return inputValue;
    } else {
      return this.data.user.username;
    }
  }

  userSettings(): TUser {
    const currentUser: TUser = {
      username: this.getValueFromInput(),
      channels: this.data.user.channels,
      directMessages: this.data.user.directMessages,
      profilePicture: this.data.user.profilePicture,
      email: this.data.user.email,
      lastname: this.data.user.lastname,
      firstname: this.data.user.firstname,
      id: this.data.user.id,
      isOnline: this.data.user.isOnline,
    };
    return currentUser;
  }

  onFileSelected(event: Event): void {
    console.log('EVENT: ', event);
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;
    if (files && files.length > 0) {
      const file = files[0];
      const maxFileSize = 1 * 1024 * 1024; // 5 MB

      if (file.size > maxFileSize) {
        console.log('Bild zu groß!');
        this.isImageSizeExceeded = true;
        // Hier kannst du die Fehlermeldung entsprechend in deiner Benutzeroberfläche anzeigen
        return;
      }
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          this.data.user.profilePicture = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
    this.isImageSizeExceeded = false;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const updatedUser = this.userSettings();
    if (updatedUser.id) {
      this.userService.updateUser(updatedUser.id, updatedUser);
    }
    console.log('update', this.data.user);
    this.closeDialog();
  }
}
