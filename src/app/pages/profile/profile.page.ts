import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from 'firebase/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone:false,
})
export class ProfilePage implements OnInit {
  currentUser: User | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Obtener usuario actual
    // OJO: En la SDK de Firebase, no hay un getUser() en AuthService
    // Deberías implementar un "onAuthStateChanged" en tu AuthService.
    // Aquí, simplificamos asumiendo que lo tienes o usas getAuth().currentUser
  }

  async onLogout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}
