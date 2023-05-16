//Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './shared/module/material.module';
import { FirebaseModule } from './shared/module/firebase.module';

// Components
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';
import { WelcomeComponent } from './page/welcome/welcome.component';
import { MainComponent } from './page/main/main.component';
import { DirectMessagesComponent } from './components/direct-messages/direct-messages.component';
import { ChannelsComponent } from './components/channels/channels.component';
import { ChatAreaComponent } from './chat/chat-area/chat-area.component';
import { MessageComponent } from './chat/message/message.component';
import { TextEditorComponent } from './chat/text-editor/text-editor.component';

import { QuillModule } from 'ngx-quill';
import { QuillConfigModule } from 'ngx-quill/config';



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
    TextEditorComponent
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
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['image', 'code-block']
          ]
        },
        placeholder: 'Write a message.',
        theme: 'snow'
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
