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

@Injectable({
  providedIn: 'root',
})
export class UserDbService {
  private firestore: Firestore = inject(Firestore);
  private usersCollRef: CollectionReference = collection(
    this.firestore,
    'users'
  );
  allUsers: TUser[] = [];
  loggedUser!: TUser;
  activeChatName: string = '';

  getAllUsers$(): Observable<TUser[]> {
    return collectionData(this.usersCollRef, { idField: 'id' }) as Observable<
      TUser[]
    >;
  }

  getUserById$(userId: string): Observable<TUser> {
    const usersDocRef: DocumentReference = doc(this.usersCollRef, userId);
    return docData(usersDocRef, { idField: 'id' }) as Observable<TUser>;
  }

  getUserByEmail$(email: string): Observable<TUser[]> {
    const userQueryRef: Query<DocumentData> = query(
      this.usersCollRef,
      where('email', '==', email)
    );
    return collectionData(userQueryRef, { idField: 'id' }) as Observable<
      TUser[]
    >;
  }

  createUser(userId: string, userObj: TUser): Promise<void> {
    return setDoc(doc(this.usersCollRef, userId), userObj);
  }

  updateUser(userId: string, userObj: TUser): Promise<void> {
    return updateDoc(doc(this.usersCollRef, userId), userObj);
  }

  deleteUser(userId: string): Promise<void> {
    return deleteDoc(doc(this.usersCollRef, userId));
  }

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

    user?.['directMessages'].push({
      chatPartnerId: partnerId,
      chatPartnerName: partner.username,
      dmDocId: docId,
    });
    this.updateUser(user?.['id']!, user);

    partner?.['directMessages'].push({
      chatPartnerId: userId,
      chatPartnerName: user.username,
      dmDocId: docId,
    });
    this.updateUser(partner?.['id']!, partner);
  }

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
      (dm) => dm.dmDocId === dmId
    );
    const partnerDmIndex = partner?.['directMessages'].findIndex(
      (dm) => dm.dmDocId === dmId
    );
    user?.['directMessages'].splice(userDmIndex, 1);
    partner?.['directMessages'].splice(partnerDmIndex, 1);

    this.updateUser(user?.['id']!, user);
    this.updateUser(partner?.['id']!, partner);
  }

  addContact(userId: string, contactId: string): Promise<void> {
    const contactsDbRef: CollectionReference = collection(
      this.firestore,
      `users/${userId}/contacts`
    );
    return setDoc(doc(contactsDbRef), { contactId });
  }

  deleteContact(userId: string, contactId: string): Promise<void> {
    const contactsDbRef: CollectionReference = collection(
      this.firestore,
      `users/${userId}/contacts`
    );
    return deleteDoc(doc(contactsDbRef, contactId));
  }

  // Get User Funktion ergänzen -> ähnlich wie getUserData.
}
