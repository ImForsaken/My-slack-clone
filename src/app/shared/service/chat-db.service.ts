import { Injectable, inject } from '@angular/core';
import { DocumentData, DocumentReference, Firestore, Query, collectionData, deleteDoc, doc, docData, orderBy, query, setDoc, updateDoc } from '@angular/fire/firestore';
import { collection, CollectionReference } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Chat } from '../types/chat';
import { Message } from '../types/message';

@Injectable({
  providedIn: 'root'
})
export class ChatDbService {
  private firestore: Firestore = inject(Firestore);
  private chatsCollRef!: CollectionReference;

  getAllChats$() {
    this.chatsCollRef = collection(this.firestore, 'chats');
    return collectionData(this.chatsCollRef) as Observable<Chat[]>;
  }

  getChat$(chatId: string): Observable<DocumentData> {
    const chatsDocRef: DocumentReference<DocumentData> = doc(this.chatsCollRef, chatId);
    return docData(chatsDocRef);
  }

  createChat(chatObj: Chat): Promise<void> {
    return setDoc(doc(this.chatsCollRef), chatObj);
  }

  updateChat(chatId: string, chatObj: Chat): Promise<void> {
    return updateDoc(doc(this.chatsCollRef, chatId), chatObj);
  }

  deleteChat(chatId: string): Promise<void> {
    return deleteDoc(doc(this.chatsCollRef, chatId));
  }

  addMessage(chatId: string, message: Message): Promise<void> {
    const messageCollRef: CollectionReference = collection(this.firestore, `chats/${chatId}/messages`);
    return setDoc(doc(messageCollRef), message);
  }

  deleteMessage(chatId: string, messageId: string): Promise<void> {
    const messageCollRef: CollectionReference = collection(this.firestore, `chats/${chatId}/messages`);
    return deleteDoc(doc(messageCollRef, messageId));
  }

  getMessages$(chatId: string): Observable<Message[]> {
    const messageCollRef: CollectionReference = collection(this.firestore, `chats/${chatId}/messages`);
    const messageQueryRef: Query<DocumentData> = query(messageCollRef, orderBy('timestamp'));
    return collectionData(messageQueryRef, { idField: 'id' }) as Observable<Message[]>;
  }
}
