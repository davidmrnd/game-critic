import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { StarsComponent } from "../../components/stars/stars.component";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonContent, IonCardHeader, IonAvatar, IonCardTitle, IonCardContent, IonRow, IonCol, IonCard, IonGrid, IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-following-page',
  templateUrl: './following-page.component.html',
  styleUrls: ['./following-page.component.css'],
  imports: [IonButton, IonGrid, IonCard, IonCol, IonRow, IonCardContent, IonCardTitle, IonAvatar, IonCardHeader, IonContent, StarsComponent, CommonModule, RouterLink],
})
export class FollowingPageComponent implements OnInit {
  groupedComments: any[] = [];

  constructor(private authService: AuthService, private dataService: DataService) {}

  async ngOnInit(): Promise<void> {
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    await sleep(400);
    this.authService.getCurrentUserObservable().subscribe((user) => {
      if (user) {
        this.dataService.getFollowingComments(user.uid).subscribe((comments) => {
          const grouped = comments.reduce((acc: any, comment: any) => {
            const userId = comment.userId;
            if (!acc[userId]) {
              acc[userId] = {
                username: comment.user?.username,
                profileicon: comment.user?.profileicon,
                id: userId,
                comments: [],
              };
            }
            acc[userId].comments.push(comment);
            return acc;
          }, {});

          this.groupedComments = Object.values(grouped).map((group: any) => {
            group.comments.sort((a: any, b: any) => b.createdAt.localeCompare(a.createdAt));
            return group;
          });

          this.groupedComments.sort((a: any, b: any) => {
            const mostRecentA = a.comments[0].createdAt;
            const mostRecentB = b.comments[0].createdAt;
            return mostRecentB.localeCompare(mostRecentA);
          });
        });
      } else {
        // Redirigir al login si no hay usuario autenticado
        window.location.href = '/login';
      }
    });
  }

  moveCarousel(username: string, direction: 'prev' | 'next'): void {
    const carouselTrack = document.querySelector(`.carousel-track[data-username="${username}"]`) as HTMLElement;

    if (!carouselTrack) {
      console.error(`Carousel track for user "${username}" not found.`);
      return;
    }

    const slideWidth = carouselTrack.firstElementChild?.clientWidth || 0;
    const totalSlides = carouselTrack.children.length;
    const currentTransform = parseFloat(
      getComputedStyle(carouselTrack).transform.split(',')[4] || '0'
    );

    const maxTransform = -(slideWidth * (totalSlides - 1));

    let newTransform = currentTransform;

    if (direction === 'prev') {
      if (currentTransform === 0) {
        newTransform = maxTransform;
      } else {
        newTransform = Math.min(currentTransform + slideWidth, 0);
      }
    } else if (direction === 'next') {
      if (currentTransform === maxTransform) {
        newTransform = 0;
      } else {
        newTransform = Math.max(currentTransform - slideWidth, maxTransform);
      }
    }

    carouselTrack.style.transform = `translateX(${newTransform}px)`;
  }
}
