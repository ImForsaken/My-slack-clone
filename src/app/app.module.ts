//Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './shared/module/material.module';
import { FirebaseModule } from './shared/module/firebase.module';
import { QuillModule } from 'ngx-quill';
import { QuillConfigModule } from 'ngx-quill/config';
// Components
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';
import { WelcomeComponent } from './page/welcome/welcome.component';
import { MainComponent } from './page/main/main.component';
import { DirectMessagesComponent } from './components/sidenav/direct-messages/direct-messages.component';
import { ChannelsComponent } from './components/sidenav/channels/channels.component';
import { ChannelComponent } from './components/sidenav/channel/channel.component';
import { ChatAreaComponent } from './components/chat-area/chat-area.component';
import { MessageComponent } from './components/message/message.component';
import { TextEditorComponent } from './components/text-editor/text-editor.component';
import { DataProtectionComponent } from './components/info/data-protection/data-protection.component';
import { LegalNoticeComponent } from './components/info/legal-notice/legal-notice.component';
import { ChatLabelComponent } from './components/chat-label/chat-label.component';
import { ForgotPasswordDialogComponent } from './auth/forgot-password-dialog/forgot-password-dialog.component';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { RegisterFormComponent } from './auth/register-form/register-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    WelcomeComponent,
    MainComponent,
    DirectMessagesComponent,
    ChannelsComponent,
    ChatAreaComponent,
    MessageComponent,
    TextEditorComponent,
    DataProtectionComponent,
    LegalNoticeComponent,
    ChannelComponent,
    ChatLabelComponent,
    ForgotPasswordDialogComponent,
    LoginFormComponent,
    RegisterFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
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
