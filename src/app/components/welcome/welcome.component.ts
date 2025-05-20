import { Component } from '@angular/core';
import {IonCol, IonGrid, IonRow } from "@ionic/angular/standalone";

@Component({
  selector: 'app-welcome',
  imports: [IonRow, IonGrid, IonCol, ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

}
