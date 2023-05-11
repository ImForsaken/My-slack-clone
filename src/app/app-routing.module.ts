import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './page/welcome/welcome.component';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';
import { MainComponent } from './page/main/main.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'main', component: MainComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
