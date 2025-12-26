import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { NotificationService } from '../../../core/services/notification';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
  standalone: true, // Change to true
  imports: [CommonModule, FormsModule, RouterLink, TitleCasePipe] // Add TitleCasePipe here
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);

  currentUser = signal<User | null>(null);
  userName = computed(() => {
    const user = this.currentUser();
    return user ? `${user.firstName} ${user.lastName}` : 'Guest';
  });

  searchQuery = signal('');
  unreadNotifications = signal(0);
  unreadMessages = signal(0);

  notifications = signal<any[]>([
    { id: 1, title: 'New Quiz Submission', message: 'Student submitted CS101 quiz', time: '2 min ago', read: false },
    { id: 2, title: 'System Update', message: 'Scheduled maintenance tonight', time: '1 hour ago', read: false },
    { id: 3, title: 'New Registration', message: '5 new students registered', time: '2 hours ago', read: true }
  ]);

  showNotifications = signal(false);
  showProfileMenu = signal(false);

  ngOnInit() {
    // Get current user
    this.authService.currentUser$.subscribe(user => {
      this.currentUser.set(user);
    });

    // Calculate unread notifications
    this.unreadNotifications.set(
      this.notifications().filter(n => !n.read).length
    );
  }

  onSearch() {
    if (this.searchQuery().trim()) {
      console.log('Searching for:', this.searchQuery());
      // Implement search functionality
    }
  }

  clearSearch() {
    this.searchQuery.set('');
  }

  toggleNotifications() {
    this.showNotifications.set(!this.showNotifications());
    this.showProfileMenu.set(false);
    
    // Mark all notifications as read when opening
    if (this.showNotifications()) {
      this.notifications.update(notifications => 
        notifications.map(n => ({ ...n, read: true }))
      );
      this.unreadNotifications.set(0);
    }
  }

  toggleProfileMenu() {
    this.showProfileMenu.set(!this.showProfileMenu());
    this.showNotifications.set(false);
  }

  markNotificationAsRead(id: number) {
    this.notifications.update(notifications =>
      notifications.map(n => n.id === id ? { ...n, read: true } : n)
    );
    this.unreadNotifications.update(count => Math.max(0, count - 1));
  }

  viewAllNotifications() {
    console.log('View all notifications');
    this.showNotifications.set(false);
  }

  logout() {
    this.authService.logout();
  }

  getInitials(): string {
    const user = this.currentUser();
    if (!user) return '?';
    
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  }
}