import { Injectable, inject } from '@angular/core';
import { DocumentData, DocumentReference, Firestore, collectionData, deleteDoc, doc, docData, setDoc, updateDoc } from '@angular/fire/firestore';
import { collection, CollectionReference } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserDbService {
  private firestore: Firestore = inject(Firestore);
  private usersDbRef!: CollectionReference;
  private users$!: Observable<User[]>;
  private users!: User[];
  
  constructor() {
    this.users$ = this.getUsersData();
    this.users$.subscribe(data => this.users = data);
  }

  private getUsersData() {
    this.usersDbRef = collection(this.firestore, 'users');
    return collectionData(this.usersDbRef, { idField: 'id' }) as Observable<User[]>;
  }

  createUser(userObj: User): Promise<void> {
    return setDoc(doc(this.usersDbRef), userObj);
  }

  getUser$(userId: string): Observable<DocumentData> {
    const usersDocRef: DocumentReference = doc(this.usersDbRef, userId);
    return docData(usersDocRef);
  }

  updateUser(userId: string, userObj: User): Promise<void> {
    return updateDoc(doc(this.usersDbRef, userId), userObj);
  }

  deleteUser(userId: string): Promise<void> {
    return deleteDoc(doc(this.usersDbRef, userId));
  }

  getAllUsers(): User[] {
    return this.users;
  }

  // addContact(userId: string, contactId: string): Promise<void> {
  //   const contactsDbRef: CollectionReference = collection(this.firestore, `users/${userId}/contacts`);
  //   return setDoc(doc(contactsDbRef), {contactId});
  // }

  // deleteContact(userId: string, contactId: string): Promise<void> {
  //   const contactsDbRef: CollectionReference = collection(this.firestore, `users/${userId}/contacts`);
  //   return deleteDoc(doc(contactsDbRef, contactId));
  // }

  // Get User Funktion ergänzen -> ähnlich wie getUserData.
}
