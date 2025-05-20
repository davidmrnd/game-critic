import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonContent, IonLabel, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonItem, IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-registration',
  imports: [IonButton, IonItem, IonCardTitle, IonCardContent, IonCardHeader, IonCard, IonLabel, IonContent, FormsModule, CommonModule, RouterModule],
  standalone: true,
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  email: string = '';
  password: string = '';
  name: string = '';
  username: string = '';
  errorMessage: string = '';
  termsAccepted: boolean = false;
  profileImage: string = '';

  constructor(private authService: AuthService) {}

  register() {
    if (!this.termsAccepted) {
      this.errorMessage = 'Debes aceptar los términos y condiciones.';
      return;
    }

    if (!this.email || !this.password || !this.name || !this.username) {
      this.errorMessage = 'Por favor, completa todos los campos.';
      return;
    }

    // Pasa la imagen al servicio de registro si es necesario
    this.authService.register(this.email, this.password, this.name, this.username, this.profileImage)
      .then(() => {
        document.body.innerHTML = '<div style="font-size: 8rem; text-align: center;">✅</div>';
        setTimeout(() => {
          window.location.href = '/login';
        }, 1000);

        this.email = '';
        this.password = '';
        this.name = '';
        this.username = '';
        this.profileImage = '';
        this.termsAccepted = false;
        this.errorMessage = '';
      })
      .catch(error => {
        this.errorMessage = error.message || 'Ocurrió un error. Inténtalo de nuevo.';
      });
  }

  onPoliciesClick() {
    termsAccepted: true;
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.profileImage = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}
