import { Component } from '@angular/core';
import {CarouselComponent} from '../../components/carousel/carousel.component';
import { IonContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-categories-page',
  imports: [IonContent, 
    CarouselComponent
  ],
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.css'
})
export class CategoriesPageComponent {

}
