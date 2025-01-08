import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private collectionName = 'PruebaFirebase'; // Cambia esto por el nombre de tu colección

  constructor(private firestore: AngularFirestore) {}

  // Obtener todos los documentos
  getDocuments(): Observable<any[]> {
    return this.firestore.collection(this.collectionName).valueChanges({ idField: 'id' });
  }

  // Crear un nuevo documento
  createDocument(data: any): Promise<any> {
    return this.firestore.collection(this.collectionName).add(data);
  }

  // Eliminar un documento
  deleteDocument(id: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }
  // Editar un documento
updateDocument(id: string, data: any): Promise<void> {
  return this.firestore.collection(this.collectionName).doc(id).update(data);
}

}
