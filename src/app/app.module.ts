//Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './shared/module/material.module';
// Firebase

// Components
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';
import { WelcomeComponent } from './page/welcome/welcome.component';
import { MainComponent } from './page/main/main.component';
import { DirectMessagesComponent } from './components/sidenav/direct-messages/direct-messages.component';
import { ChannelsComponent } from './components/sidenav/channels/channels.component';
import { DataProtectionComponent } from './components/info/data-protection/data-protection.component';
import { LegalNoticeComponent } from './components/info/legal-notice/legal-notice.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    WelcomeComponent,
    MainComponent,
    DirectMessagesComponent,
    ChannelsComponent,
    DataProtectionComponent,
    LegalNoticeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
