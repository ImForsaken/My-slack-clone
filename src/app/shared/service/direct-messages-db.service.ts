import { Injectable, inject } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  setDoc,
  Query,
  query,
  orderBy,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TMessage } from '../types/message';
import { TDirectMessages } from '../types/dm';
import { UserDbService } from './user-db.service';

/**
 * Service for managing direct message chats in the firebase firestore.
 */
@Injectable({
  providedIn: 'root',
})
export class DirectMessageDbService {
  private firestore: Firestore = inject(Firestore);
  private userDbService: UserDbService = inject(UserDbService);
  private directMessagesCollRef: CollectionReference = collection(this.firestore, 'directMessages');
  public addDirectMessages: TDirectMessages[] = [];

  /**
   * Gets the firebase collection for all direct message chats.
   * @returns Obserable for all direct messages.
   */
  getAllDirectMessages$() {
    return collectionData(this.directMessagesCollRef, { idField: 'id', }) as Observable<TDirectMessages[]>;
  }

  /**
   * Gets the firebase message collection from the direct message document with the given id.
   * @param dmId Id of the direct message chat.
   * @returns Observable of the direct message document.
   */
  getDirectMessage$(dmId: string): Observable<TDirectMessages[]> {
    const directMessagesDocRef: DocumentReference<DocumentData> = doc(this.directMessagesCollRef, dmId);
    return docData(directMessagesDocRef) as Observable<TDirectMessages[]>;
  }

  /**
   * Creates a new direct message chat in firebase and adds a reference to the
   * participating chat users in the directMessages array in the user object.
   * @param userId Document id of the current user.
   * @param partnerId Document id of the chatpartner.
   * @returns Document id of the created direct message chat.
   */
  createDirectMessage(userId: string, partnerId: string): string {
    const docRef = doc(this.directMessagesCollRef);
    const docId: string = docRef.id;

    this.userDbService.addDirectMessageChat(userId, partnerId, docId);
    setDoc(docRef, { userIDs: [userId, partnerId], });

    return docId;
  }

  /**
   * Deletes the direct message chat in firebase including the reference of the
   * participating users in the users directMessages array.
   * @param dmId Direct message document id.
   * @returns deleteDoc promise.
   */
  async deleteDirectMessage(dmId: string): Promise<void> {
    await this.userDbService.deleteDirectMessagesChat(dmId);
    return deleteDoc(doc(this.directMessagesCollRef, dmId));
  }

  /**
   * Adds a message to the direct message chat with the given id.
   * @param dmId Direct message document id.
   * @param message Object of type TMessage.
   * @returns setDoc promise.
   */
  addMessage(dmId: string, message: TMessage): Promise<void> {
    const messageCollRef: CollectionReference = collection(this.firestore, `directMessages/${dmId}/messages`);
    return setDoc(doc(messageCollRef), message);
  }

  /**
   * Deletes the message with the given id from the direct message chat in firebase.
   * @param dmId Direct message document id.
   * @param messageId Direct message message id.
   * @returns deleteDoc promise.
   */
  deleteMessage(dmId: string, messageId: string): Promise<void> {
    const messageCollRef: CollectionReference = collection(this.firestore, `directMessages/${dmId}/messages`);
    return deleteDoc(doc(messageCollRef, messageId));
  }

  /**
   * Gets the firebase collection for all messages of the direct message chat with the given id.
   * @param dmId Diect message document id.
   * @returns Observable for all messages.
   */
  getMessages$(dmId: string): Observable<TMessage[]> {
    const messageCollRef: CollectionReference = collection(this.firestore, `directMessages/${dmId}/messages`);
    const messageQueryRef: Query<DocumentData> = query(messageCollRef, orderBy('timestamp'));
    return collectionData(messageQueryRef, { idField: 'id' }) as Observable<TMessage[]>;
  }
}
