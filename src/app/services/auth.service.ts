import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';

// Ajusta la ruta de environment según tu proyecto
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // 1. Inicializamos la app con la config de Firebase
  private app = initializeApp(environment.firebaseConfig);

  // 2. Obtenemos la instancia de Auth usando la app
  private auth = getAuth(this.app);

  // Registrar
  async register(email: string, password: string): Promise<User | null> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Error en el registro:', error);
      throw error;
    }
  }

  // Logincito
  async login(email: string, password: string): Promise<User | null> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Error en el login:', error);
      throw error;
    }
  }

  // Cerrar sesión
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  }
}
