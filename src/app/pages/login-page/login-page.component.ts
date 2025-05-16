import { Component } from '@angular/core';
import {LoginComponent} from "../../components/login/login.component";
import { IonContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-login-page',
    imports: [IonContent, 
        LoginComponent
    ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

}
