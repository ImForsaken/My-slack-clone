import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './page/welcome/welcome.component';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';
import { MainComponent } from './page/main/main.component';
import { LoginComponent } from './auth/login/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'main', component: MainComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
