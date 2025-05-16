import { Component } from '@angular/core';
import {WelcomeComponent} from "../../components/welcome/welcome.component";
import { CarouselComponent } from "../../components/carousel/carousel.component";
import { RouterLink } from '@angular/router';
import { IonContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-home-page',
  imports: [IonContent, 
    WelcomeComponent,
    CarouselComponent,
    RouterLink
],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
