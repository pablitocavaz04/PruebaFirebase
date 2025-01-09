import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';

import { CreateDocumentComponent } from '../components/create-document/create-document.component';
import { DocumentListComponent } from '../components/document-list/document-list.component';
import { FavoriteListComponent } from '../components/favorite-list/favorite-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  declarations: [
    HomePage,
    CreateDocumentComponent,
    DocumentListComponent,
    FavoriteListComponent,
  ],
})
export class HomePageModule {}
