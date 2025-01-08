import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-update-document',
  templateUrl: './update-document.component.html',
  styleUrls: ['./update-document.component.scss'],
  standalone:false,
})
export class UpdateDocumentComponent implements OnInit {
  @Input() documentId: string | null = null; // Recibe el ID del documento a actualizar
  @Input() initialData: any; // Recibe los datos iniciales del documento
  updateForm: FormGroup;

  constructor(private fb: FormBuilder, private firebaseService: FirebaseService) {
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.initialData) {
      this.updateForm.patchValue(this.initialData); // Rellena el formulario con los datos actuales
    }
  }

  onSubmit(): void {
    if (this.updateForm.valid && this.documentId) {
      this.firebaseService.updateDocument(this.documentId, this.updateForm.value)
        .then(() => {
          console.log('Documento actualizado');
          this.updateForm.reset();
        })
        .catch(error => console.error('Error al actualizar el documento:', error));
    }
  }
}
