import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './page/welcome/welcome.component';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';
import { MainComponent } from './page/main/main.component';
import { LegalNoticeComponent } from './components/info/legal-notice/legal-notice.component';
import { DataProtectionComponent } from './components/info/data-protection/data-protection.component';
import { AuthGuard } from './shared/service/auth.guard';
import { ChatContentComponent } from './chat/chat-content/chat-content.component';
import { ChatHintComponent } from './chat/chat-hint/chat-hint.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ChatHintComponent }, //Hier eine Info Componente erstellen / einstzen
      { path: ':name', component: ChatContentComponent },
    ],
  },
  { path: 'legal-notice', component: LegalNoticeComponent },
  { path: 'data-protection', component: DataProtectionComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
