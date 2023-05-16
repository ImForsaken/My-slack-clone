import { Component } from '@angular/core';
import { Chat } from 'src/app/shared/types/chat';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: [
    './text-editor.component.scss'
  ]
})
export class TextEditorComponent {
  text!: string;
  quillStyle = {
    border: '2px solid #cac0cb',
    borderTop: 'none',
    borderRadius: '0 0 10px 10px'
  }

  chat: Chat = {
    name: 'Test',
    createdOn: ''
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      // console.log(this.text);
      this.text = '';
    }
  }

}
