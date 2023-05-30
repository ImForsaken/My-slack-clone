import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthGuard } from 'src/app/shared/service/auth.guard';
import { ChannelDbService } from 'src/app/shared/service/channels-db.service';
import { UserDbService } from 'src/app/shared/service/user-db.service';
import { TChannel } from 'src/app/shared/types/chat';
import { TUser } from 'src/app/shared/types/user';

@Component({
  selector: 'app-new-channel',
  templateUrl: './new-channel.component.html',
  styleUrls: ['./new-channel.component.scss'],
})
export class NewChannelComponent implements OnInit {
  channelForm!: FormGroup;
  loggedUser$!: Subscription;
  loggedUser!: TUser;

  constructor(
    public dialogRef: MatDialogRef<NewChannelComponent>,
    private channelService: ChannelDbService,
    private authGuard: AuthGuard,
    private userService: UserDbService,
    private formBuilder: FormBuilder
  ) {
    this.channelForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      status: ['public', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getLoggedUser();
  }

  /**
   * observe with user are logged in
   */
  getLoggedUser(): void {
    const authUser: User = this.authGuard.getAuthUser();
    const authUserID: string = authUser.uid;
    this.loggedUser$ = this.userService
      .getUserById$(authUserID)
      .subscribe((user: TUser): void => {
        this.loggedUser = user;
      });
  }

  isInvalid(controlName: string): boolean {
    const control = this.channelForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }

  getErrorMessage(controlName: string): string {
    const control = this.channelForm.get(controlName);
    if (control && control.errors) {
      if (control.errors['required']) {
        return 'This field is required.';
      } else if (control.errors['minlength']) {
        return `Min. ${control.errors['minlength'].requiredLength} characters required.`;
      }
    }
    return '';
  }

  /**
   * Create a new channel and push it to Firestore
   */
  onNewChannel(): void {
    if (this.channelForm.valid && this.loggedUser) {
      const newChannel: TChannel = {
        name: this.channelForm.value.name,
        createdOn: this.loggedUser.id,
        status: this.channelForm.value.status as 'public' | 'private',
      };
      this.channelService.createChannel(newChannel);
      this.dialogRef.close();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
