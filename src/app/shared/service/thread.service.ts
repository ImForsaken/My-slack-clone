import { Injectable, inject } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, Query, collection, collectionData, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TThread } from '../types/thread';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  private firestore: Firestore = inject(Firestore);
  private threadsCollRef: CollectionReference = collection(this.firestore, 'threads');


  getThreadMessages$(threadId: string): Observable<TThread[]> {
    console.log(threadId)
    const threadMessageCollRef: CollectionReference = collection(this.firestore, `threads/${threadId}/messages`);
    return collectionData(threadMessageCollRef, { idField: 'id' }) as Observable<TThread[]>;
  }

  // getAllChannels$() {
  //   return collectionData(this.channelsCollRef, {
  //     idField: 'id',
  //   }) as Observable<TChannel[]>;
  // }

  // getChannel$(chatId: string): Observable<DocumentData> {
  //   const channelsDocRef: DocumentReference<DocumentData> = doc(
  //     this.channelsCollRef,
  //     chatId
  //   );
  //   return docData(channelsDocRef);
  // }

  // createChannel(chatObj: TChannel): Promise<void> {
  //   return setDoc(doc(this.channelsCollRef), chatObj);
  // }

  // updateChannel(chatId: string, chatObj: TChannel): Promise<void> {
  //   return updateDoc(doc(this.channelsCollRef, chatId), chatObj);
  // }

  // deleteChannel(chatId: string): Promise<void> {
  //   return deleteDoc(doc(this.channelsCollRef, chatId));
  // }

  // addMessage(chatId: string, message: TMessage): Promise<void> {
  //   const messageCollRef: CollectionReference = collection(
  //     this.firestore,
  //     `channels/${chatId}/messages`
  //   );
  //   return setDoc(doc(messageCollRef), message);
  // }

  // deleteMessage(chatId: string, messageId: string): Promise<void> {
  //   const messageCollRef: CollectionReference = collection(
  //     this.firestore,
  //     `channels/${chatId}/messages`
  //   );
  //   return deleteDoc(doc(messageCollRef, messageId));
  // }

  // getMessages$(chatId: string): Observable<TMessage[]> {
  //   const messageCollRef: CollectionReference = collection(
  //     this.firestore,
  //     `channels/${chatId}/messages`
  //   );
  //   const messageQueryRef: Query<DocumentData> = query(
  //     messageCollRef,
  //     orderBy('timestamp')
  //   );
  //   return collectionData(messageQueryRef, { idField: 'id' }) as Observable<
  //     TMessage[]
  //   >;
  // }
}
