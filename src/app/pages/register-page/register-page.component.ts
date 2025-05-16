import { Component } from '@angular/core';
import {RegistrationComponent} from '../../components/registration/registration.component';
import { IonContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-register-page',
  imports: [IonContent, 
    RegistrationComponent
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

}
