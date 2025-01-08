import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss'],
  standalone:false,
})
export class DocumentListComponent implements OnInit {
  documents: any[] = [];
  selectedDocument: any | null = null;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.firebaseService.getDocuments().subscribe((data) => {
      this.documents = data;
    });
  }

  // Método para seleccionar un documento y mostrar el formulario de actualización
  selectDocument(document: any): void {
    this.selectedDocument = document;
  }

  // Método para limpiar la selección
  clearSelection(): void {
    this.selectedDocument = null;
  }

  // Método para eliminar un documento
  deleteDocument(id: string): void {
    this.firebaseService.deleteDocument(id).then(() => {
      console.log('Documento eliminado');
      // Opcional: Actualizar la lista localmente
      this.documents = this.documents.filter((doc) => doc.id !== id);
    }).catch((error) => {
      console.error('Error al eliminar el documento:', error);
    });
  }

  markAsFavorite(document: any): void {
    const updatedData = { isFavorite: !document.isFavorite };
    this.firebaseService.updateDocument(document.id, updatedData)
      .then(() => {
        console.log('Estado de favorito actualizado');
        document.isFavorite = !document.isFavorite; // Actualizamos localmente para evitar recarga
      })
      .catch(error => console.error('Error al actualizar el estado de favorito:', error));
  }
  
}
