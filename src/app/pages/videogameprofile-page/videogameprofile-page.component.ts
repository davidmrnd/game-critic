import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { ProfileComponent } from '../../components/profile/profile.component';
import { StarsComponent } from '../../components/stars/stars.component';
import { CommentariesComponent } from '../../components/commentaries/commentaries.component';
import { AuthService } from '../../services/auth.service';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { IonContent, IonButton, IonRow, IonCol, IonGrid, IonIcon } from "@ionic/angular/standalone";
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-videogameprofile-page',
  templateUrl: './videogameprofile-page.component.html',
  styleUrls: ['./videogameprofile-page.component.css'],
  standalone: true,
  imports: [IonIcon, IonGrid, IonCol, IonRow, IonButton, IonContent, 
    CommonModule,
    ProfileComponent,
    StarsComponent,
    CommentariesComponent
  ]
})
export class VideogamePageComponent implements OnInit {
  comments: any[] = [];
  averageRating: number = 0;
  videogameId!: string;
  userId: string = '';
  hasComment: boolean = false;
  isFavorite: boolean = false;
  currentUserId: string = '';
  videogameTitle: string = '';

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private authService: AuthService,
    private firestore: Firestore,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.videogameId = params['id'];
      if (this.videogameId) {
        this.loadComments();
        this.checkIfUserHasComment();
        this.checkFavorite();
        // Obtener el título del videojuego
        this.dataService.getVideogameById(this.videogameId).subscribe(game => {
          if (game) {
            this.videogameTitle = game.title;
          }
        });
      }
    });
  }

  loadComments(): void {
    this.dataService.getCommentsByVideogameId(this.videogameId).subscribe(comments => {
      this.comments = comments;
      this.calculateAverage();
    });
  }

  calculateAverage(): void {
    if (!this.comments.length) {
      this.averageRating = 0;
      return;
    }
    const total = this.comments.reduce((sum, c) => sum + c.rating, 0);
    this.averageRating = Math.round(total / this.comments.length);
  }

  async checkIfUserHasComment(): Promise<void> {
    this.authService.getCurrentUserObservable().subscribe(async (user) => {
      if (user) {
        this.userId = user.uid;

        const commentsCollection = collection(this.firestore, 'comments');
        const q = query(
          commentsCollection,
          where('userId', '==', this.userId),
          where('videogameId', '==', this.videogameId)
        );

        const querySnapshot = await getDocs(q);
        this.hasComment = !querySnapshot.empty;
      }
    });
  }

  async checkFavorite() {
    this.authService.getCurrentUserObservable().subscribe(async (user) => {
      if (user && this.videogameId) {
        this.currentUserId = user.uid;
        this.isFavorite = await this.favoritesService.isFavorite(user.uid, this.videogameId);
      }
    });
  }

  // El icono de estrella se colorea según el valor de isFavorite
  async toggleFavorite() {
    if (!this.currentUserId || !this.videogameId) return;
    if (this.isFavorite) {
      await this.favoritesService.removeFavorite(this.currentUserId, this.videogameId);
      this.isFavorite = false;
    } else {
      // Obtén los datos del videojuego para guardarlos en favoritos
      this.dataService.getVideogameById(this.videogameId).subscribe(async (game) => {
        if (game) {
          await this.favoritesService.addFavorite(this.currentUserId, game);
          this.isFavorite = true;
        }
      });
    }
  }

  navigateToAddComment() {
    this.authService.getCurrentUserObservable().subscribe((user) => {
      if (user === null) {
        window.location.href = '/login';
      } else {
        window.location.href = '/newcomment?id=' + this.videogameId;
      }
    });
  }
}
