import { Component, inject } from '@angular/core';
import { ChatDbService } from 'src/app/shared/services/chat-db.service';
import { UserDbService } from 'src/app/shared/services/user-db.service';
import { Message } from 'src/app/shared/types/message';
import { User } from 'src/app/shared/types/user';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss']
})
export class ChatAreaComponent {
  chatService: ChatDbService = inject(ChatDbService);
  userService: UserDbService = inject(UserDbService);

  chatId: string = 'bHADuOvmaLFl970vTDFK'; // Wird bei Click auf Chat an Chat Komponente übergenen.

  constructor() {
    const user: User = {
      firstname: 'Maria',
      lastname: 'Tester',
      email: 'tester@mail.com',
      profilePicture: 'imageUrl',
      chats: [
        'bHADuOvmaLFl970vTDFK'
      ]
    }
    console.log(this.userService.createUser(user));
  }

  // messages: Message[] = [
  //   {
  //     userId: 'Dennis Ammen',
  //     text: 'Hallo leude!',
  //     timestamp: '16:13'
  //   },
  //   {
  //     userId: 'Dennis Ammen',
  //     text: '<p>sdfl kjsdf sldkjf sdlkfj lsdfj sldkfj sdlf jweop perot epro terpto erop ioper eoprt ieoprt ieprot ipert igpdfg ölekrtöd fgokedrö odiopgö kdörlk gdoöfgk örgdfo gkdrö gkdfög klrdöodfg kdrölkg födokr öldfkg ödrgk ödflkg </p>',
  //     timestamp: '15:11'
  //   },
  //   {
  //     userId: 'Dennis Ammen',
  //     text: '<p>sdfsldfkjsdflsdkfjsdlfksjdflsdkfjsdlkfjsdflksfjsdlfkjsdfklsfjslkfjsdklfjsdklfsjdflksdjfkl sdlkfjs lsdkfj skldfjkljsdflksjdflksdjf sldkfj klsdfj skldfjklsdfj lskdfj lsdkfj slkdfj lksjdfl sjdf lksdjf lksdfj lksdjf sdf</p>',
  //     timestamp: '17:09'
  //   },
  //   {
  //     userId: 'Dennis Ammen',
  //     text: `<p>sdfsfsf</p><pre class="ql-syntax" spellcheck="false">sdfsf
  //     </pre><p>sfsffasdad</p><p><br></p><pre class="ql-syntax" spellcheck="false">asdasdasd
      
  //     asdasd
  //     </pre><p><br></p>`,
  //     timestamp: '11:57'
  //   },
  // ]
}
