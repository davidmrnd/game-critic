import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { StarsComponent } from '../stars/stars.component';
import { Firestore, collection, query, where, getDocs, updateDoc, doc, addDoc, deleteDoc } from '@angular/fire/firestore';
import { IonContent, IonCard, IonLabel, IonCardContent, IonAvatar, IonItem, IonRow, IonCol, IonButton, IonText } from "@ionic/angular/standalone";

@Component({
  selector: 'app-newcomment',
  standalone: true,
  imports: [IonText, IonButton, IonCol, IonRow, IonItem, IonAvatar, IonCardContent, IonLabel, IonCard, IonContent, CommonModule, RouterModule, FormsModule, StarsComponent],
  templateUrl: './newcomment.component.html',
  styleUrls: ['./newcomment.component.css']
})
export class NewcommentComponent implements OnInit {
  user: any = null;
  commentContent: string = '';
  rating: number = 0;
  videogameId: string = '';
  existingCommentId: string | null = null;
  message: string = '';

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private route: ActivatedRoute,
    private firestore: Firestore,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.videogameId = params['id'];
    });

    this.authService.getCurrentUserObservable().subscribe((user) => {
      if (user) {
        this.dataService.getUsersById(user.uid).subscribe((userData) => {
          this.user = userData;
          this.checkExistingComment();
        });
      }
    });
  }

  async checkExistingComment(): Promise<void> {
    const commentsCollection = collection(this.firestore, 'comments');
    const q = query(
      commentsCollection,
      where('userId', '==', this.user?.id),
      where('videogameId', '==', this.videogameId)
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const existingComment = querySnapshot.docs[0];
      this.existingCommentId = existingComment.id;
      const data = existingComment.data();
      this.commentContent = data['content'];
      this.rating = data['rating'];
    }
  }

  async submitComment(): Promise<void> {
    if (!this.commentContent || this.rating === 0 || !this.videogameId) {
      this.message = 'Por favor, completa todos los campos antes de enviar el comentario.';
      return;
    }

    const newComment = {
      userId: this.user?.id,
      videogameId: this.videogameId,
      content: this.commentContent,
      rating: this.rating,
      createdAt: new Date().toISOString()
    };

    try {
      const commentsCollection = collection(this.firestore, 'comments');

      if (this.existingCommentId) {
        const commentDoc = doc(this.firestore, 'comments', this.existingCommentId);
        await updateDoc(commentDoc, newComment);
      } else {
        await addDoc(commentsCollection, newComment);
      }

      this.router.navigate(['/videogame'], { queryParams: { id: this.videogameId } });

      this.commentContent = '';
      this.rating = 0;
    } catch (error) {
      this.message = ('Hubo un error al enviar el comentario. Inténtalo de nuevo.')
    }
  }

  async deleteComment(): Promise<void> {
    if (!this.existingCommentId) {
      return;
    }

    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este comentario?');
    if (!confirmDelete) {
      return;
    }

    try {
      const commentDoc = doc(this.firestore, 'comments', this.existingCommentId);
      await deleteDoc(commentDoc);

      this.router.navigate(['/videogame'], { queryParams: { id: this.videogameId } });
    } catch (error) {
      console.error('Error al eliminar el comentario:', error);
      this.message = 'Hubo un error al eliminar el comentario. Inténtalo de nuevo.';
    }
  }
}
