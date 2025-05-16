import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonHeader, IonFooter, IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonContent, IonFooter, IonHeader, IonApp, IonRouterOutlet, HeaderComponent, FooterComponent],
})
export class AppComponent {
  constructor() {}
}
