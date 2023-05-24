import { Injectable, inject } from '@angular/core';
import { CollectionReference, DocumentData, DocumentReference, Firestore, collection, collectionData, deleteDoc, doc, docData, setDoc, updateDoc, Query, query, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TMessage } from '../types/message';
import { TDirectMessages } from '../types/dm';
import { UserDbService } from './user-db.service';
import { TUser } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class DirectMessageDbService {
  private firestore: Firestore = inject(Firestore);
  private userDbService: UserDbService = inject(UserDbService);
  private directMessagesCollRef: CollectionReference = collection(this.firestore, 'directMessages');

  /**
   * Returns an observable for all stored direct messages in the 'directMessages' collection.
   * @returns Obserable for all direct messages.
   */
  getAllDirectMessages$() {
    return collectionData(this.directMessagesCollRef, { idField: 'id' }) as Observable<TDirectMessages[]>;
  }

  /**
   * Returns an observable for one direct message chat from the 'directMessages' collection.
   * @param dmId Id of the direct message chat.
   * @returns 
   */
  getDirectMessage$(dmId: string): Observable<DocumentData> {
    const directMessagesDocRef: DocumentReference<DocumentData> = doc(this.directMessagesCollRef, dmId);
    return docData(directMessagesDocRef);
  }

  /**
   * Creates a new direct message chat and adds a reference to the
   * participating chat users in the directMessages array in the user object.
   * @param userId Document id of the current user.
   * @param partnerId Document id of the chatpartner.
   * @returns Document id of the created direct message chat.
   */
  createDirectMessage(userId: string, partnerId: string,): string {
    const docRef = doc(this.directMessagesCollRef);
    const docId = docRef.id;

    this.userDbService.addDirectMessageChat(userId, partnerId, docId);
    this.userDbService.addDirectMessageChat(partnerId, userId, docId);

    setDoc(docRef, {
      userIds: [
        userId,
        partnerId
      ]
    });

    return docId;
  }

  /**
   * 
   * @param dmId 
   * @returns 
   */
  // updateDirectMessage(dmId: string, dmObj: TDirectMessages): Promise<void> {
  //   return updateDoc(doc(this.directMessagesCollRef, dmId), dmObj);
  // }

  /**
   * Deletes the direct message chat including the reference of the participating users
   * in the users directMessages array.
   * @param dmId Direct message document id.
   * @returns deleteDoc promise.
   */
  deleteDirectMessage(dmId: string): Promise<void> {
    this.userDbService.deleteDirectMessagesChat(dmId);
    return deleteDoc(doc(this.directMessagesCollRef, dmId));
  }

  /**
   * Adds the given message to the direct message chat. 
   * @param dmId Direct message document id.
   * @param message Message object.
   * @returns setDoc promise.
   */
  addMessage(dmId: string, message: TMessage): Promise<void> {
    const messageCollRef: CollectionReference = collection(this.firestore, `directMessages/${dmId}/messages`);
    return setDoc(doc(messageCollRef), message);
  }

  /**
   * Deletes the message from the direct message chat.
   * @param dmId Diect message document id.
   * @param messageId DM message id.
   * @returns deleteDoc promise.
   */
  deleteMessage(dmId: string, messageId: string): Promise<void> {
    const messageCollRef: CollectionReference = collection(this.firestore, `directMessages/${dmId}/messages`);
    return deleteDoc(doc(messageCollRef, messageId));
  }

  /**
   * Returns an observable of all messages of the direct message chat.
   * @param dmId Diect message document id.
   * @returns Observable of all messages.
   */
  getMessages$(dmId: string): Observable<TMessage[]> {
    const messageCollRef: CollectionReference = collection(this.firestore, `directMessages/${dmId}/messages`);
    const messageQueryRef: Query<DocumentData> = query(messageCollRef, orderBy('timestamp'));
    return collectionData(messageQueryRef, { idField: 'id' }) as Observable<TMessage[]>;
  }
}

