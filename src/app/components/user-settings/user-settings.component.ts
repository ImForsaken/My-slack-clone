import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserDbService } from 'src/app/shared/service/user-db.service';
import { TUser } from 'src/app/shared/types/user';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent {
  user: TUser | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      user: TUser;
    },
    private userService: UserDbService,
    public dialogRef: MatDialogRef<UserSettingsComponent>
  ) {}
  selectImage() {
    // Klick auf das Bild, um den Dateiauswahldialog zu öffnen
    console.log('selcect img');
  }

  onFileSelected(event: any) {
    // Datei ausgewählt, die URL des ausgewählten Bildes setzen
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.data.user.profilePicture = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }

  onSubmit(): void {
    if (this.user && this.user.id) {
      this.userService.updateUser(this.user?.id, this.user);
      console.log('update', this.user);
    }
    this.closeDialog();
  }
}
