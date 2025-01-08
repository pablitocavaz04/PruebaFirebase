import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss'],
  standalone: false, // Aseguramos que no es standalone
})
export class DocumentListComponent implements OnInit {
  documents: any[] = [];
  filteredDocuments: any[] = []; // Lista filtrada
  selectedDocument: any | null = null; // Documento seleccionado para actualizar
  searchTerm: string = ''; // Término de búsqueda
  updateForm: FormGroup; // Formulario reactivo para actualizar

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService
  ) {
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.firebaseService.getDocuments().subscribe((data) => {
      this.documents = data;
      this.filteredDocuments = data; // Inicialmente, la lista filtrada es igual a la original
    });
  }

  // Método para filtrar documentos según el término de búsqueda
  filterDocuments(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredDocuments = this.documents.filter((doc) =>
      doc.title.toLowerCase().includes(term) ||
      doc.description.toLowerCase().includes(term)
    );
  }

  selectDocument(document: any): void {
    this.selectedDocument = document;
    this.updateForm.patchValue({
      title: document.title,
      description: document.description,
    });
  }

  clearSelection(): void {
    this.selectedDocument = null;
    this.updateForm.reset();
  }

  onUpdate(): void {
    if (this.updateForm.valid && this.selectedDocument) {
      const updatedData = this.updateForm.value;
      this.firebaseService
        .updateDocument(this.selectedDocument.id, updatedData)
        .then(() => {
          console.log('Documento actualizado');
          this.clearSelection();
        })
        .catch((error) =>
          console.error('Error al actualizar el documento:', error)
        );
    }
  }

  deleteDocument(id: string): void {
    this.firebaseService
      .deleteDocument(id)
      .then(() => {
        console.log('Documento eliminado');
        this.documents = this.documents.filter((doc) => doc.id !== id);
        this.filteredDocuments = this.filteredDocuments.filter((doc) => doc.id !== id);
      })
      .catch((error) => {
        console.error('Error al eliminar el documento:', error);
      });
  }

  markAsFavorite(document: any): void {
    const updatedData = { isFavorite: !document.isFavorite };
    this.firebaseService
      .updateDocument(document.id, updatedData)
      .then(() => {
        console.log('Estado de favorito actualizado');
        document.isFavorite = !document.isFavorite;
      })
      .catch((error) =>
        console.error('Error al actualizar el estado de favorito:', error)
      );
  }
}
