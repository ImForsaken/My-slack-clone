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
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { collection, CollectionReference } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { TUser } from '../types/user';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserDbService {
  private firestore: Firestore = inject(Firestore);
  private usersCollRef: CollectionReference = collection(
    this.firestore,
    'users'
  );

  activeChatName: string = '';

  getAllUsers$(): Observable<TUser[]> {
    return collectionData(this.usersCollRef, { idField: 'id' }) as Observable<
      TUser[]
    >;
  }

  getUserById$(userId: string): Observable<TUser> {
    const usersDocRef: DocumentReference = doc(this.usersCollRef, userId);
    return docData(usersDocRef) as Observable<TUser>;
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
