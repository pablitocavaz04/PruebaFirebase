import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss'],
  standalone:false,
})
export class FavoriteListComponent implements OnInit {
  favoriteDocuments: any[] = [];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.firebaseService.getDocuments().subscribe((documents) => {
      this.favoriteDocuments = documents.filter((doc) => doc.isFavorite); // Filtrar solo favoritos
    });
  }
}
