import { Injectable, inject } from '@angular/core';
import { DocumentData, DocumentReference, Firestore, Query, collectionData, deleteDoc, doc, docData, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { collection, CollectionReference } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserDbService {
  private firestore: Firestore = inject(Firestore);
  private usersDbRef!: CollectionReference;

  getAllUsers$(): Observable<User[]> {
    this.usersDbRef = collection(this.firestore, 'users');
    return collectionData(this.usersDbRef, { idField: 'id' }) as Observable<User[]>;
  }

  getUserById$(userId: string): Observable<User> {
    const usersDocRef: DocumentReference = doc(this.usersDbRef, userId);
    return docData(usersDocRef) as Observable<User>;
  }

  getUserByEmail$(email: string): Observable<User[]> {
    const userCollRef: CollectionReference = collection(this.firestore, `users`);
    const userQueryRef: Query<DocumentData> = query(userCollRef, where('email', '==', email));
    return collectionData(userQueryRef, { idField: 'id' }) as Observable<User[]>;
  }

  createUser(userId: string, userObj: User): Promise<void> {
    return setDoc(doc(this.usersDbRef, userId), userObj);
  }

  updateUser(userId: string, userObj: User): Promise<void> {
    return updateDoc(doc(this.usersDbRef, userId), userObj);
  }

  deleteUser(userId: string): Promise<void> {
    return deleteDoc(doc(this.usersDbRef, userId));
  }

  addContact(userId: string, contactId: string): Promise<void> {
    const contactsDbRef: CollectionReference = collection(this.firestore, `users/${userId}/contacts`);
    return setDoc(doc(contactsDbRef), { contactId });
  }

  deleteContact(userId: string, contactId: string): Promise<void> {
    const contactsDbRef: CollectionReference = collection(this.firestore, `users/${userId}/contacts`);
    return deleteDoc(doc(contactsDbRef, contactId));
  }

  // Get User Funktion ergänzen -> ähnlich wie getUserData.
}
