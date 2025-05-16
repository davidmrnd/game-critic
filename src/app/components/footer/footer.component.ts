import { Component } from '@angular/core';
import { IonFooter, IonGrid, IonToolbar, IonRow, IonCol } from "@ionic/angular/standalone";

@Component({
  selector: 'app-footer',
  imports: [IonCol, IonRow, IonToolbar, IonGrid, IonFooter, ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
