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
  getDoc,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { collection, CollectionReference } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { TUser } from '../types/user';
import { TDirectMessages } from '../types/dm';
import { StringMap } from 'quill';

/**
 * Service for managing users in the firebase firestore.
 */
@Injectable({
  providedIn: 'root',
})
export class UserDbService {
  private firestore: Firestore = inject(Firestore);
  private usersCollRef: CollectionReference = collection(
    this.firestore,
    'users'
  );
  public allUsers: TUser[] = [];
  // loggedUser!: TUser;

  /**
   * Gets the firebase collection for all users.
   * @returns Obserable for all users.
   */
  getAllUsers$(): Observable<TUser[]> {
    return collectionData(this.usersCollRef, { idField: 'id' }) as Observable<
      TUser[]
    >;
  }

  /**
   * Gets the firebase user document with the given id from the users collection.
   * @param chatId Id of the channel/chat.
   * @returns Observable of the channel/chat document.
   */
  getUserById$(userId: string): Observable<TUser> {
    const usersDocRef: DocumentReference = doc(this.usersCollRef, userId);
    return docData(usersDocRef, { idField: 'id' }) as Observable<TUser>;
  }

  /**
   * Gets the firebase user document with the given email from the users collection.
   * @param chatId Id of the channel/chat.
   * @returns Observable of the channel/chat document.
   */
  getUserByEmail$(email: string): Observable<TUser[]> {
    const userQueryRef: Query<DocumentData> = query(
      this.usersCollRef,
      where('email', '==', email)
    );
    return collectionData(userQueryRef, { idField: 'id' }) as Observable<
      TUser[]
    >;
  }

  /**
   * Creates a new user in firebase with the provided id as document id.
   * @param userId Document user id.
   * @param userObj Object of type TUser.
   * @returns setDoc promise.
   */
  createUser(userId: string, userObj: TUser): Promise<void> {
    return setDoc(doc(this.usersCollRef, userId), userObj);
  }

  /**
   * Updates the user with the given id in firebase with the new user object.
   * @param userId Document user id.
   * @param userObj Object of type TUser.
   * @returns updateDoc promise.
   */
  updateUser(userId: string, userObj: TUser): Promise<void> {
    return updateDoc(doc(this.usersCollRef, userId), userObj);
  }

  /**
   * Deletes the user with the given id in firebase.
   * @param userId Document user id.
   * @param userObj Object of type TUser.
   * @returns setDoc promise.
   */
  deleteUser(userId: string): Promise<void> {
    return deleteDoc(doc(this.usersCollRef, userId));
  }

  /**
   * Adds the direct message chat to the current users and chat partner users direct messages array.
   * @param userId Document id of the user.
   * @param partnerId Document id of the chat parnter user.
   * @param docId Document id of the direct message chat.
   */
  async addDirectMessageChat(
    userId: string,
    partnerId: string,
    docId: string
  ): Promise<void> {
    const user: TUser = (await getDoc(doc(this.usersCollRef, userId)).then(
      (user) => user.data()
    )) as TUser;
    const partner: TUser = (await getDoc(
      doc(this.usersCollRef, partnerId)
    ).then((user) => user.data())) as TUser;

    this.addDirectMessageChatToUser(user, partner, partnerId, docId);
    this.addDirectMessageChatToUser(partner, user, userId, docId);
  }

  /**
   * Adds the direct message chat to the users direct messages array and updates the firebase db.
   * @param user Document of the user.
   * @param partner Document of the parnter.
   * @param partnerId Document id of the partner.
   * @param docId Document id of the direct message chat.
   */
  private addDirectMessageChatToUser(
    user: TUser,
    partner: TUser,
    partnerId: string,
    docId: string
  ) {
    user?.['directMessages'].push({
      chatPartnerID: partnerId,
      chatPartnerName: partner.username,
      dmDocID: docId,
    });
    this.updateUser(user?.['id']!, user);
  }

  /**
   * Deletes the direct message chat from both users (current user and chat partner).
   * @param dmId Document id of the direct message chat.
   */
  async deleteDirectMessagesChat(dmId: string) {
    const directMessagesCollRef: CollectionReference = collection(
      this.firestore,
      'directMessages'
    );
    const directMessageChat: TDirectMessages = (await getDoc(
      doc(directMessagesCollRef, dmId)
    ).then((dmChat) => dmChat.data())) as TDirectMessages;
    const user: TUser = (await getDoc(
      doc(this.usersCollRef, directMessageChat.userIDs[0])
    ).then((user) => user.data())) as TUser;
    const partner: TUser = (await getDoc(
      doc(this.usersCollRef, directMessageChat.userIDs[1])
    ).then((user) => user.data())) as TUser;
    const userDmIndex = user?.['directMessages'].findIndex(
      (dm) => dm.dmDocID === dmId
    );
    const partnerDmIndex = partner?.['directMessages'].findIndex(
      (dm) => dm.dmDocID === dmId
    );

    user?.['directMessages'].splice(userDmIndex, 1);
    partner?.['directMessages'].splice(partnerDmIndex, 1);

    this.updateUser(user?.['id']!, user);
    this.updateUser(partner?.['id']!, partner);
  }

  // Werden aktuell nicht verwendet. ggf. löschen:

  // /**
  //  * Adds a new contact.
  //  * @param userId Document id of the user.
  //  * @param contactId Document id of the dm contact.
  //  * @returns setDoc promise.
  //  */
  // addContact(userId: string, contactId: string): Promise<void> {
  //   const contactsDbRef: CollectionReference = collection(this.firestore, `users/${userId}/contacts`);
  //   return setDoc(doc(contactsDbRef), { contactId });
  // }

  // /**
  //  * Deletes the contact.
  //  * @param userId Document id of the user.
  //  * @param contactId Document id of the dm contact.
  //  * @returns deleteDoc promise.
  //  */
  // deleteContact(userId: string, contactId: string): Promise<void> {
  //   const contactsDbRef: CollectionReference = collection(this.firestore, `users/${userId}/contacts`);
  //   return deleteDoc(doc(contactsDbRef, contactId));
  // }
}
