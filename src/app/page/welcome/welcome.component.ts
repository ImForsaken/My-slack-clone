import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/shared/service/auth.guard';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WelcomeComponent {
  constructor(private router: Router, private authGuard: AuthGuard) {
    if (this.authGuard.canActivate()) {
      this.router.navigate(['/main']);
    }
  }
}
