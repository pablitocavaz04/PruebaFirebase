import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDocs, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private db = getFirestore(initializeApp(environment.firebaseConfig));
  private collectionName = 'PruebaFirebase';
  private documents$ = new BehaviorSubject<any[]>([]);

  constructor() {
    this.loadDocuments();
  }

  private async loadDocuments(): Promise<void> {
    const snapshot = await getDocs(collection(this.db, this.collectionName));
    const documents = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    this.documents$.next(documents);
  }

  // Obtener todos los documentos como Observable
  getDocuments() {
    return this.documents$.asObservable();
  }

  // Crear un nuevo documento
  async createDocument(data: any): Promise<void> {
    const document = { ...data, isFavorite: false };
    await addDoc(collection(this.db, this.collectionName), document);
    this.loadDocuments(); // Recargar documentos
  }

  // Eliminar un documento
  async deleteDocument(id: string): Promise<void> {
    const documentRef = doc(this.db, this.collectionName, id);
    await deleteDoc(documentRef);
    this.loadDocuments(); // Recargar documentos
  }

  // Editar un documento
  async updateDocument(id: string, data: any): Promise<void> {
    const documentRef = doc(this.db, this.collectionName, id);
    await updateDoc(documentRef, data);
    this.loadDocuments(); // Recargar documentos
  }
}
