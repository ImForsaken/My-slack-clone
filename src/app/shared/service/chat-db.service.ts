import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData, deleteDoc, doc, setDoc, updateDoc } from '@angular/fire/firestore';
import { collection, CollectionReference } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Chat } from '../types/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatDbService {
  private firestore: Firestore = inject(Firestore);
  private chatsDbRef!: CollectionReference;
  
  getChatsData() {
    this.chatsDbRef = collection(this.firestore, 'chats');
    return collectionData(this.chatsDbRef) as Observable<Chat[]>;
  }

  createChat(chatObj: Chat): Promise<void> {
    return setDoc(doc(this.chatsDbRef), chatObj);
  }

  updateChat(chatId: string, chatObj: Chat): Promise<void> {
    return updateDoc(doc(this.chatsDbRef, chatId), chatObj);
  }

  deleteChat(chatId: string): Promise<void> {
    return deleteDoc(doc(this.chatsDbRef, chatId));
  }
}
