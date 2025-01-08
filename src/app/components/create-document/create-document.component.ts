import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.scss'],
  standalone: false,
})
export class CreateDocumentComponent {
  documentForm: FormGroup;

  constructor(private fb: FormBuilder, private firebaseService: FirebaseService) {
    this.documentForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.documentForm.valid) {
      this.firebaseService
        .createDocument(this.documentForm.value)
        .then(() => {
          console.log('Documento creado');
          this.documentForm.reset();
        })
        .catch((error) => console.error('Error al crear documento:', error));
    }
  }
}
