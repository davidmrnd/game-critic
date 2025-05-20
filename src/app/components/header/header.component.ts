import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service'; // añadido
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
  showUserDropdown: boolean = false;

  constructor(private authService: AuthService, private dataService: DataService) {}

  ngOnInit() {
    this.userSubscription = this.authService.getCurrentUserObservable().subscribe((user: any) => {
      this.isLoggedIn = !!user;
      this.userId = user?.uid || null;

      if (user && user.uid) {
        const localImage = localStorage.getItem(`profile-image-${user.uid}`);
        if (localImage) {
          this.userProfileIcon = localImage;
        } else {
          this.dataService.getUsersById(user.uid).subscribe((userData: any) => {
            if (userData && userData.profileicon) {
              this.userProfileIcon = userData.profileicon;
            } else {
              this.userProfileIcon = '/assets/images/usericondefault.png';
            }
          });
        }
      } else {
        this.userProfileIcon = '/assets/images/usericondefault.png';
      }
    });
  }

  logout() {
    this.authService.logout().then(() => {
      this.isLoggedIn = false;
      this.userName = null;
      this.showMenu = false;
      this.userProfileIcon = null;
      this.closeUserDropdown();
    });
  }

  toggleUserDropdown() {
    this.showUserDropdown = !this.showUserDropdown;
  }

  closeUserDropdown() {
    this.showUserDropdown = false;
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }
}
