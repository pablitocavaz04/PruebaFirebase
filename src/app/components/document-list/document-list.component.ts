import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss'],
  standalone: false,
})
export class DocumentListComponent implements OnInit {
  documents: any[] = [];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.firebaseService.getDocuments().subscribe((data) => {
      this.documents = data;
    });
  }

  deleteDocument(id: string): void {
    this.firebaseService.deleteDocument(id).then(() => {
      console.log('Documento eliminado');
    });
  }
}
