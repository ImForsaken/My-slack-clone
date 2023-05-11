import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  opened: boolean = true;

  onMove(event: MouseEvent) {
    console.log('eventX', event.x);
  }
}
