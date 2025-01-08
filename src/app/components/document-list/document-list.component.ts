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
  selectedDocument: any | null = null; // Documento seleccionado para actualizar
  updateForm: FormGroup; // Formulario reactivo para actualizar

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService
  ) {
    // Inicializamos el formulario reactivo
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.firebaseService.getDocuments().subscribe((data) => {
      this.documents = data;
    });
  }

  // Método para seleccionar un documento y mostrar el formulario de actualización
  selectDocument(document: any): void {
    this.selectedDocument = document;
    // Rellenamos el formulario con los datos actuales del documento
    this.updateForm.patchValue({
      title: document.title,
      description: document.description,
    });
  }

  // Método para limpiar la selección y ocultar el formulario
  clearSelection(): void {
    this.selectedDocument = null;
    this.updateForm.reset();
  }

  // Método para actualizar un documento en Firebase
  onUpdate(): void {
    if (this.updateForm.valid && this.selectedDocument) {
      const updatedData = this.updateForm.value;
      this.firebaseService
        .updateDocument(this.selectedDocument.id, updatedData)
        .then(() => {
          console.log('Documento actualizado');
          this.clearSelection(); // Limpiamos la selección después de actualizar
        })
        .catch((error) =>
          console.error('Error al actualizar el documento:', error)
        );
    }
  }

  // Método para eliminar un documento
  deleteDocument(id: string): void {
    this.firebaseService
      .deleteDocument(id)
      .then(() => {
        console.log('Documento eliminado');
        // Opcional: Actualizar la lista localmente
        this.documents = this.documents.filter((doc) => doc.id !== id);
      })
      .catch((error) => {
        console.error('Error al eliminar el documento:', error);
      });
  }

  // Método para marcar o desmarcar un documento como favorito
  markAsFavorite(document: any): void {
    const updatedData = { isFavorite: !document.isFavorite };
    this.firebaseService
      .updateDocument(document.id, updatedData)
      .then(() => {
        console.log('Estado de favorito actualizado');
        document.isFavorite = !document.isFavorite; // Actualizamos localmente para evitar recarga
      })
      .catch((error) =>
        console.error('Error al actualizar el estado de favorito:', error)
      );
  }
}
