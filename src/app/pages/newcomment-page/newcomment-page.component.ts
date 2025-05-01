import { Component } from '@angular/core';
import { ProfileComponent } from '../../components/profile/profile.component';
import { NewcommentComponent } from "../../components/newcomment/newcomment.component";

@Component({
  selector: 'app-newcomment-page',
  imports: [
    ProfileComponent,
    NewcommentComponent
  ],
  templateUrl: './newcomment-page.component.html',
  styleUrl: './newcomment-page.component.css'
})
export class NewcommentPageComponent {

}
