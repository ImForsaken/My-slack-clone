  import { Injectable, inject } from '@angular/core';
  import { Firestore, collectionData, deleteDoc, doc, setDoc, updateDoc } from '@angular/fire/firestore';
  import { collection, CollectionReference } from '@firebase/firestore';
  import { Observable } from 'rxjs';
  import { Chat } from '../types/chat';
  
  @Injectable({
    providedIn: 'root'
  })
  export class MessageDbService {
    private firestore: Firestore = inject(Firestore);
    private messagesDbRef!: CollectionReference;
    private messages$!: Observable<Chat[]>;
    private messages!: Chat[];
    
    // constructor() {
    //   this.getMessagesDb().subscribe(data => this.messages = data);
    // }
    
    // private getMessagesDb() {
    //   this.messagesDbRef = collection(this.firestore, 'chats');
    //   this.chats$ = collectionData(this.chatsDbRef) as Observable<Chat[]>;
    //   return this.chats$;
    // }
  
    // createChat(chatObj: Chat): Promise<void> {
    //   return setDoc(doc(this.chatsDbRef), chatObj);
    // }
  
    // getChat(chatId: string): Chat | undefined {
    //   return this.chats.find(chat => chat.id === chatId);
    // }
  
    // updateChat(chatId: string, chatObj: Chat): Promise<void> {
    //   return updateDoc(doc(this.chatsDbRef, chatId), chatObj);
    // }
  
    // deleteChat(chatId: string): Promise<void> {
    //   return deleteDoc(doc(this.chatsDbRef, chatId));
    // }
}
