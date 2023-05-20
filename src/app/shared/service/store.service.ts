import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../types/user';
import { UserDbService } from './user-db.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  userService: UserDbService = inject(UserDbService);

  loggedInUser$!: User;
  currentChat$!: Observable<string>;


  constructor() {
    // this.userService.getUserByEmail$('tester@testmail.com').subscribe(user => {
    //   this.loggedInUser$ = user[0];
    //   this.currentChat$ = new BehaviorSubject<string>(this.loggedInUser$.chats[0]).asObservable();
    // });
  }
}
