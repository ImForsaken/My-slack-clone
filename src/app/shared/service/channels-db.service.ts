import { Injectable, inject } from '@angular/core';
import {
  DocumentData,
  DocumentReference,
  Firestore,
  Query,
  collectionData,
  deleteDoc,
  doc,
  docData,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { collection, CollectionReference } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { TChannel } from '../types/chat';
import { TMessage } from '../types/message';
import { ThreadService } from './thread.service';

/**
 * Service for managing channels/chats in the firebase firestore.
 */
@Injectable({
  providedIn: 'root',
})
export class ChannelDbService {
  private firestore: Firestore = inject(Firestore);
  private threadService: ThreadService = inject(ThreadService);
  private channelsCollRef: CollectionReference = collection(this.firestore, 'channels');
  public allChannels: TChannel[] = [];

  /**
   * Gets the firebase collection for all channels/chats.
   * @returns Obserable for all channels/chats.
   */
  getAllChannels$(): Observable<TChannel[]> {
    return collectionData(this.channelsCollRef, { idField: 'id', }) as Observable<TChannel[]>;
  }

  /**
   * Gets the firebase message collection from the direct message document with the given id.
   * @param chatId Id of the channel/chat.
   * @returns Observable of the channel/chat document.
   */
  getChannel$(chatId: string): Observable<TChannel[]> {
    const channelsDocRef: DocumentReference<DocumentData> = doc(this.channelsCollRef, chatId);
    return docData(channelsDocRef) as Observable<TChannel[]>;
  }

  /**
   * Creates a new channel/chat in firebase.
   * @param chatObj Object of type TChannel.
   * @returns setDoc promise.
   */
  createChannel(chatObj: TChannel): Promise<void> {
    return setDoc(doc(this.channelsCollRef), chatObj);
  }

  /**
   * Updates the channel/chat with the given id in firebase.
   * @param chatId Channel/chat document id.
   * @param chatObj Object of type TChannel.
   * @returns setDoc promise.
   */
  updateChannel(chatId: string, chatObj: TChannel): Promise<void> {
    return updateDoc(doc(this.channelsCollRef, chatId), chatObj);
  }

  /**
   * Deletes the channel/chat with the given id in firebase.
   * @param chatId Channel/chat document id.
   * @returns deleteDoc promise.
   */
  deleteChannel(chatId: string): Promise<void> {
    return deleteDoc(doc(this.channelsCollRef, chatId));
  }

  /**
   * Adds a message to the channel/chat with the given id.
   * @param chatId Channel/chat document id.
   * @param message Object of type TMessage.
   * @returns setDoc promise.
   */
  addMessage(chatId: string, message: TMessage): Promise<void> {
    const messageCollRef: CollectionReference = collection(this.firestore, `channels/${chatId}/messages`);
    return setDoc(doc(messageCollRef), message);
  }

  /**
   * Deletes the message with the given id of the channel/chat.
   * If a thread exists for the message, it will be deleted as well.
   * @param chatId Channel/chat document id.
   * @param messageId Message document id.
   * @param threadId thread document id.
   * @returns setDoc promise.
   */
  deleteMessage(chatId: string, messageId: string, threadId?: string): Promise<void> {
    const messageCollRef: CollectionReference = collection(this.firestore, `channels/${chatId}/messages`);
    
    if (threadId) {
      this.threadService.deleteThread(threadId);
    }

    return deleteDoc(doc(messageCollRef, messageId));
  }

  /**
   * Gets the firebase collection for all messages of the channel/chat with the given id.
   * @param chatId Channel/chat document id.
   * @returns Observable for all messages.
   */
  getMessages$(chatId: string): Observable<TMessage[]> {
    const messageCollRef: CollectionReference = collection(this.firestore, `channels/${chatId}/messages`);
    const messageQueryRef: Query<DocumentData> = query(messageCollRef, orderBy('timestamp'));
    return collectionData(messageQueryRef, { idField: 'id' }) as Observable<TMessage[]>;
  }

  /**
   * Adds a reference of a thread to the message in the chat with the given ids.
   * @param chatId Document id of the chat.
   * @param messageId Document id of the message.
   * @param threadId Document id of the new thread.
   * @returns updateDoc promise.
   */
  addThreadToMessage(chatId: string, messageId: string, threadId: string): Promise<any> {
    const messageDocRef: DocumentReference = doc(this.channelsCollRef, `${chatId}/messages/${messageId}`);
    const updateData = { threadId }
    return updateDoc(messageDocRef, updateData);
  }
}
