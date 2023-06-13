import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ChannelDbService } from 'src/app/shared/service/channels-db.service';
import { StoreService } from 'src/app/shared/service/store.service';
import { TChannel } from 'src/app/shared/types/chat';
import { TUser } from 'src/app/shared/types/user';

@Component({
  selector: 'app-new-channel',
  templateUrl: './new-channel.component.html',
  styleUrls: ['./new-channel.component.scss'],
})
export class NewChannelComponent implements OnInit, OnDestroy {
  channelForm!: FormGroup;
  user!: TUser;
  subUser$!: Subscription;
  userLoaded: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<NewChannelComponent>,
    private channelService: ChannelDbService,
    private storeService: StoreService,
    private formBuilder: FormBuilder
  ) {
    this.channelForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      status: ['public', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * fetch current logged User
   */
  getUser(): void {
    this.subUser$ = this.storeService.currentUser$.subscribe((user) => {
      if (user) {
        this.user = user;
        this.user.isOnline = true;
        this.userLoaded = true;
      }
    });
  }

  /**
   * Inputfield Validation
   * @param controlName
   * @returns
   */
  isInvalid(controlName: string): boolean {
    const control = this.channelForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }

  /**
   * display ErrorMessages
   * @param controlName
   * @returns
   */
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
    if (this.channelForm.valid && this.user) {
      const newChannel: TChannel = {
        name: this.channelForm.value.name,
        createdOn: this.user.id,
        status: this.channelForm.value.status as 'public' | 'private',
      };
      this.channelService.createChannel(newChannel);
      this.dialogRef.close();
    }
  }

  /**
   * close Dialog
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.subUser$.unsubscribe();
  }
}
