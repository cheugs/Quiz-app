// src/app/features/dashboard/dashboard.component.ts
import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboardService } from '../../core/services/dashboard';
import { AuthService } from '../../core/services/auth';
import { 
  DashboardStats, 
  ParticipationTrend, 
  CoursePerformance, 
  ClassPerformance 
} from '../../models/analytics.model';
import { Quiz } from '../../models/quiz.model';
import { Notification } from '../../models/notification.model';
import { User } from '../../models/user.model';

// Import all icon components
import { ICON_COMPONENTS } from '../../../assets/icon-dashboard';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ...ICON_COMPONENTS],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  private authService = inject(AuthService);

  // Signals for reactive data
  currentUser = signal<User | null>(null);
  dashboardStats = signal<DashboardStats | null>(null);
  participationTrend = signal<ParticipationTrend | null>(null);
  coursePerformance = signal<CoursePerformance[]>([]);
  classPerformance = signal<ClassPerformance[]>([]);
  recentQuizzes = signal<Quiz[]>([]);
  recentNotifications = signal<Notification[]>([]);
  isLoading = signal(true);

  // Computed values
  userName = computed(() => {
    const user = this.currentUser();
    return user ? `${user.firstName} ${user.lastName}` : 'Admin';
  });

  userInitials = computed(() => {
    const user = this.currentUser();
    if (!user) return 'A';
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  });

  // Chart data
  participationChartData = computed(() => {
    const trend = this.participationTrend();
    if (!trend) return null;
    
    return {
      labels: trend.data.map(d => d.date),
      datasets: [
        {
          label: 'Participation Rate',
          data: trend.data.map(d => d.participationRate),
          backgroundColor: '#6b8e7f'
        }
      ]
    };
  });

  constructor() {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadDashboardData();
  }

  loadUserData(): void {
    this.currentUser.set(this.authService.getCurrentUser());
  }

  loadDashboardData(): void {
    this.isLoading.set(true);
    
    this.dashboardStats.set(this.dashboardService.stats$());
    this.participationTrend.set(this.dashboardService.participationTrend$());
    this.coursePerformance.set(this.dashboardService.coursePerformance$());
    this.classPerformance.set(this.dashboardService.classPerformance$());
    this.recentQuizzes.set(this.dashboardService.recentQuizzes$());
    this.recentNotifications.set(this.dashboardService.recentNotifications$());

    setTimeout(() => {
      this.isLoading.set(false);
    }, 1000);
  }

  refreshDashboard(): void {
    this.dashboardService.refreshDashboard();
  }

  formatNumber(num: number): string {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  }

  getPerformanceColor(score: number): string {
    if (score >= 90) return '#10b981';
    if (score >= 80) return '#3b82f6';
    if (score >= 70) return '#f59e0b';
    return '#ef4444';
  }

  getTrendIconName(value: number): string {
    return value >= 0 ? 'trending-up' : 'trending-down';
  }

  getTrendColor(value: number): string {
    return value >= 0 ? '#10b981' : '#ef4444';
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  getQuizStatusColor(status: string): string {
    switch(status) {
      case 'active': return '#10b981';
      case 'draft': return '#6b7280';
      case 'scheduled': return '#3b82f6';
      case 'closed': return '#ef4444';
      default: return '#6b7280';
    }
  }
}