import { Injectable, inject } from '@angular/core';
import { DocumentData, DocumentReference, Firestore, Query, collectionData, deleteDoc, doc, docData, orderBy, query, setDoc, updateDoc } from '@angular/fire/firestore';
import { collection, CollectionReference } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Chat } from '../types/chat';
import { Message } from '../types/message';

@Injectable({
  providedIn: 'root'
})
export class ChannelDbService {
  private firestore: Firestore = inject(Firestore);
  private channelsCollRef: CollectionReference = collection(this.firestore, 'channels');

  getAllChannels$() {
    return collectionData(this.channelsCollRef, { idField: 'id' }) as Observable<Chat[]>;
  }

  getChannel$(chatId: string): Observable<DocumentData> {
    const channelsDocRef: DocumentReference<DocumentData> = doc(this.channelsCollRef, chatId);
    return docData(channelsDocRef);
  }

  createChannel(chatObj: Chat): Promise<void> {
    return setDoc(doc(this.channelsCollRef), chatObj);
  }

  updateChannel(chatId: string, chatObj: Chat): Promise<void> {
    return updateDoc(doc(this.channelsCollRef, chatId), chatObj);
  }

  deleteChannel(chatId: string): Promise<void> {
    return deleteDoc(doc(this.channelsCollRef, chatId));
  }

  addMessage(chatId: string, message: Message): Promise<void> {
    const messageCollRef: CollectionReference = collection(this.firestore, `channels/${chatId}/messages`);
    return setDoc(doc(messageCollRef), message);
  }

  deleteMessage(chatId: string, messageId: string): Promise<void> {
    const messageCollRef: CollectionReference = collection(this.firestore, `channels/${chatId}/messages`);
    return deleteDoc(doc(messageCollRef, messageId));
  }

  getMessages$(chatId: string): Observable<Message[]> {
    const messageCollRef: CollectionReference = collection(this.firestore, `channels/${chatId}/messages`);
    const messageQueryRef: Query<DocumentData> = query(messageCollRef, orderBy('timestamp'));
    return collectionData(messageQueryRef, { idField: 'id' }) as Observable<Message[]>;
  }
}
