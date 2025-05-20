import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { IonHeader, IonToolbar, IonRow, IonGrid, IonCol, IonButton, IonSearchbar } from "@ionic/angular/standalone";

@Component({
  selector: 'app-header',
  imports: [IonSearchbar, IonButton, IonCol, IonGrid, IonRow, IonToolbar, IonHeader,  CommonModule, RouterLink ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  userName: string | null = null;
  private userSubscription: Subscription | null = null;
  userId: any|string;
  showMenu: boolean = false;
  userProfileIcon: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userSubscription = this.authService.getCurrentUserObservable().subscribe((user: any) => {
      this.isLoggedIn = !!user;
      this.userId = user?.uid || null;
      this.userProfileIcon = user?.profileicon || null;
    });
  }

  logout() {
    this.authService.logout().then(() => {
      this.isLoggedIn = false;
      this.userName = null;
      this.showMenu = false;
      this.userProfileIcon = null;
    });
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }
}
