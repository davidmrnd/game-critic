import { Component } from '@angular/core';
import { ProfileComponent } from '../../components/profile/profile.component';
import { NewcommentComponent } from "../../components/newcomment/newcomment.component";
import { IonContent, IonCol, IonRow, IonGrid } from "@ionic/angular/standalone";

@Component({
  selector: 'app-newcomment-page',
  imports: [IonGrid, IonRow, IonCol, IonContent, 
    ProfileComponent,
    NewcommentComponent
  ],
  templateUrl: './newcomment-page.component.html',
  styleUrl: './newcomment-page.component.css'
})
export class NewcommentPageComponent {

}
