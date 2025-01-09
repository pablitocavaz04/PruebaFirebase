import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone:false,
})
export class LoginPage {
  loginForm: FormGroup;
  errorMessage: string = "";

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        await this.authService.login(email, password);
        console.log('Login exitoso');
        this.router.navigate(['/home']);
      } catch (error: any) {
        console.error('Error en el login:', error);
        this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
      }
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  
}
