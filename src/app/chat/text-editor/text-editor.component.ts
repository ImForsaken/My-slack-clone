import { Component } from '@angular/core';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: [
    './text-editor.component.scss'
  ]
})
export class TextEditorComponent {
  editor = {
    border: '2px solid #cac0cb',
    borderTop: 'none',
    borderRadius: '0 0 10px 10px'
  }
}
