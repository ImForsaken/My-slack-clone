import { Injectable, inject } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, Query, collection, collectionData, deleteDoc, doc, orderBy, query, setDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { TMessage } from '../types/message';
import { SidenavService } from './sidenav.service';
import { TThread } from '../types/thread';

/**
 * Service for managing chat threads in the firebase firestore.
 */
@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  private firestore: Firestore = inject(Firestore);
  private sidenavService: SidenavService = inject(SidenavService);
  private threadsCollRef: CollectionReference = collection(this.firestore, 'threads');
  
  messageId!: string;
  loadedThread$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  /**
   * Creates a new thread document in fireabes.
   * @param threadObj Object of type TThread.
   * @returns Id of the created firebase document.
   */
  createThread(threadObj: TThread): string {
    const threadDocRef = doc(this.threadsCollRef);
    setDoc(threadDocRef, threadObj);
    return threadDocRef.id;
  }

  /**
   * Deletes the firebase thread document with the given id.
   * @param threadId Firebase document id of the thread.
   * @returns deleteDoc promise.
   */
  deleteThread(threadId: string): Promise<void> {
    return deleteDoc(doc(this.threadsCollRef, threadId));
  }

  /**
   * Gets the firebase message collection for the thread with the given id.
   * @param threadId Firebase document id of the thread.
   * @returns Observable of the thread messages.
   */
  getThreadMessages$(threadId: string): Observable<TMessage[]> {
    const threadMessageCollRef: CollectionReference = collection(this.firestore, `threads/${threadId}/messages`);
    const threadQueryRef: Query<DocumentData> = query(threadMessageCollRef, orderBy('timestamp'));
    return collectionData(threadQueryRef, { idField: 'id' }) as Observable<TMessage[]>;
  }

  /**
   * Adds a message to the thread with the given id.
   * @param threadId Firebase document id of the thread.
   * @param message Object of type TMessage.
   * @returns setDoc promise.
   */
  addMessage(threadId: string, message: TMessage): Promise<void> {
    const threadMessageCollRef: CollectionReference = collection(this.firestore, `threads/${threadId}/messages`);
    return setDoc(doc(threadMessageCollRef), message);
  }

  /**
   * Deletese a message to the thread with the given id.
   * @param threadId Firebase document id of the thread.
   * @param messageId Firebase document id of the message.
   * @returns deleteDoc promise.
   */
  deleteMessage(threadId: string, messageId: string): Promise<void> {
    const threadMessageCollRef: CollectionReference = collection(this.firestore, `threads/${threadId}/messages`);
    return deleteDoc(doc(threadMessageCollRef, messageId));
  }

  /**
   * Opens the thread sidenav with the sidenav service and sets the message id and, if available the thread id in the service.
   * @param threadId Firebase document id of the thread.
   * @param messageId Firebase document id of the message.
   */
  openThread(threadId: string | undefined, messageId: string) {
    this.sidenavService.open();
    this.messageId = messageId;

    if (threadId) {
      this.loadedThread$.next(threadId);
    } else {
      this.loadedThread$.next('');
    }
  }
}
