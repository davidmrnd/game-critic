import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FavoritesService } from '../../services/favorites.service';
import { CommonModule } from '@angular/common';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonRow, IonCol, IonGrid, IonAvatar } from "@ionic/angular/standalone";

@Component({
  selector: 'app-favorites-page',
  templateUrl: './following-page.component.html',
  styleUrls: ['./following-page.component.css'],
  imports: [IonGrid, IonCard, IonCol, IonRow, IonCardContent, IonCardTitle, IonAvatar, IonCardHeader, IonContent, CommonModule],
})
export class FollowingPageComponent implements OnInit {
  favorites: any[] = [];

  constructor(
    private authService: AuthService,
    private favoritesService: FavoritesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUserObservable().subscribe(async (user) => {
      if (!user) {
        window.location.href = '/login';
        return;
      }
      this.favorites = await this.favoritesService.getFavoritesByUserId(user.uid);
    });
  }

  goToVideogameDetail(videogameId: string) {
    this.router.navigate(['/videogame'], { queryParams: { id: videogameId } });
  }
}
