//Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/module/material.module';
import { FirebaseModule } from './shared/module/firebase.module';
import { QuillModule } from 'ngx-quill';
import { QuillConfigModule } from 'ngx-quill/config';
// Auth
import { ForgotPasswordDialogComponent } from './auth/forgot-password-dialog/forgot-password-dialog.component';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { RegisterFormComponent } from './auth/register-form/register-form.component';
// Chat
import { ChatAreaComponent } from './chat/chat-area/chat-area.component';
import { ChatContentComponent } from './chat/chat-content/chat-content.component';
import { MessageComponent } from './chat/message/message.component';
import { TextEditorComponent } from './chat/text-editor/text-editor.component';
// Components
// Header
import { HeaderComponent } from './components/header/header.component';
import { ProfileSettingsDialogComponent } from './components/header/profile-settings-dialog/profile-settings-dialog.component';
// Info
import { DataProtectionComponent } from './components/info/data-protection/data-protection.component';
import { LegalNoticeComponent } from './components/info/legal-notice/legal-notice.component';
// Sidenav
import { ChannelLabelComponent } from './components/sidenav/channel-label/channel-label.component';
import { ChannelsComponent } from './components/sidenav/channels/channels.component';
import { DirectMessagesComponent } from './components/sidenav/direct-messages/direct-messages.component';
import { DmLabelComponent } from './components/sidenav/dm-label/dm-label.component';
// Page
import { AppComponent } from './app.component';
import { WelcomeComponent } from './page/welcome/welcome.component';
import { MainComponent } from './page/main/main.component';
import { NewChannelComponent } from './components/sidenav/new-channel/new-channel.component';
import { AllChannelsComponent } from './components/sidenav/channels-dialog/all-channels.component';
import { DirectMessagesDialogComponent } from './components/sidenav/dm-dialog/direct-messages-dialog.component';
import { ThreadContentComponent } from './chat/thread-content/thread-content.component';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';
import { UserIconComponent } from './components/user-icon/user-icon.component';
import { ChatHintComponent } from './chat/chat-hint/chat-hint.component';
import { LogoComponent } from './components/logo/logo.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    WelcomeComponent,
    MainComponent,
    ForgotPasswordDialogComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ChatAreaComponent,
    ChatContentComponent,
    MessageComponent,
    TextEditorComponent,
    HeaderComponent,
    DataProtectionComponent,
    LegalNoticeComponent,
    ChannelLabelComponent,
    ChannelsComponent,
    DirectMessagesComponent,
    DmLabelComponent,
    NewChannelComponent,
    AllChannelsComponent,
    DirectMessagesDialogComponent,
    ThreadContentComponent,
    ProfileSettingsDialogComponent,
    UserIconComponent,
    ChatHintComponent,
    LogoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FirebaseModule,
    QuillModule.forRoot(),
    QuillConfigModule.forRoot({
      modules: {
        keyboard: {
          bindings: {
            customEnter: {
              key: 'Enter',
              shiftKey: false,
              handler: () => {},
            },
          },
        },
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block'],
        ],
      },
      placeholder: 'Write a message.',
      theme: 'snow',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
