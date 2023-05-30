//Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './shared/module/material.module';
import { FirebaseModule } from './shared/module/firebase.module';
import { QuillModule } from 'ngx-quill';
import { QuillConfigModule } from 'ngx-quill/config';
// Auth
import { LoginComponent } from './auth/login/login/login.component';
import { RegisterComponent } from './auth/register/register/register.component';
// Chat
import { ChatAreaComponent } from './chat/chat-area/chat-area.component';
import { ChatContentComponent } from './chat/chat-content/chat-content.component';
import { MessageComponent } from './chat/message/message.component';
import { TextEditorComponent } from './chat/text-editor/text-editor.component';
// Components
// Header
import { HeaderComponent } from './components/header/header.component';
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
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';
import { WelcomeComponent } from './page/welcome/welcome.component';
import { MainComponent } from './page/main/main.component';
import { NewChannelComponent } from './components/sidenav/new-channel/new-channel.component';
import { AllChannelsComponent } from './components/sidenav/all-channels/all-channels.component';
import { ThreadContentComponent } from './chat/thread-content/thread-content.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    WelcomeComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
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
    ThreadContentComponent,
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
