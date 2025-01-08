import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CreateDocumentComponent } from './components/create-document/create-document.component';
import { DocumentListComponent } from './components/document-list/document-list.component';
import { UpdateDocumentComponent } from './components/update-document/update-document.component';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateDocumentComponent,
    DocumentListComponent,
    UpdateDocumentComponent,
    FavoriteListComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    ReactiveFormsModule, // Asegúrate de importar ReactiveFormsModule
    FormsModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
