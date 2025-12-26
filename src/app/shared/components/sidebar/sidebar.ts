import { Component, OnInit, signal, computed, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { User, UserRole } from '../../../models/user.model';
import { IconComponent } from '../../../../assets/icon';

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  route: string;
  roles: UserRole[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, IconComponent]
})
export class SidebarComponent implements OnInit {
  private authService = inject(AuthService);

  @Output() sidebarToggled = new EventEmitter<boolean>();

  currentUser = signal<User | null>(null);
  isCollapsed = signal(false);
  activeMenu = signal<string>('dashboard');

  menuItems = signal<MenuItem[]>([
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard',
      roles: [UserRole.ADMINISTRATOR, UserRole.SUPER_ADMIN, UserRole.COORDINATOR, UserRole.INSTRUCTOR]
    },
    {
      id: 'quiz-management',
      title: 'Quiz Management',
      icon: 'quiz',
      route: '/quiz-management',
      roles: [UserRole.ADMINISTRATOR, UserRole.SUPER_ADMIN, UserRole.COORDINATOR]
    },
    {
      id: 'question-bank',
      title: 'Question Bank',
      icon: 'questions',
      route: '/question-bank',
      roles: [UserRole.ADMINISTRATOR, UserRole.SUPER_ADMIN, UserRole.COORDINATOR, UserRole.INSTRUCTOR]
    },
    {
      id: 'student-management',
      title: 'Student Management',
      icon: 'students',
      route: '/student-management',
      roles: [UserRole.ADMINISTRATOR, UserRole.SUPER_ADMIN]
    },
    {
      id: 'course-management',
      title: 'Course Management',
      icon: 'courses',
      route: '/course-management',
      roles: [UserRole.ADMINISTRATOR, UserRole.SUPER_ADMIN, UserRole.COORDINATOR]
    },
    {
      id: 'academic-configuration',
      title: 'Academic Configuration',
      icon: 'academic',
      route: '/academic-configuration',
      roles: [UserRole.SUPER_ADMIN]
    },
    {
      id: 'user-management',
      title: 'User Management',
      icon: 'users',
      route: '/user-management',
      roles: [UserRole.SUPER_ADMIN]
    },
    {
      id: 'response-viewing',
      title: 'Response Viewing',
      icon: 'responses',
      route: '/response-viewing',
      roles: [UserRole.ADMINISTRATOR, UserRole.SUPER_ADMIN, UserRole.COORDINATOR, UserRole.INSTRUCTOR]
    },
    {
      id: 'notifications-management',
      title: 'Notifications',
      icon: 'notifications',
      route: '/notifications-management',
      roles: [UserRole.ADMINISTRATOR, UserRole.SUPER_ADMIN, UserRole.COORDINATOR]
    }
  ]);

  filteredMenuItems = computed(() => {
    // TODO: Uncomment this block when backend is connected
    /*
    const user = this.currentUser();
    if (!user) {
      console.log('No user found, showing empty menu');
      return [];
    }
    
    console.log('Current user role:', user.role);
    console.log('User role type:', typeof user.role);
    
    const filtered = this.menuItems().filter(item => {
      const userRole = user.role.toString().toUpperCase();
      const hasAccess = item.roles.some(role => 
        role.toString().toUpperCase() === userRole
      );
      
      console.log(`Menu item "${item.title}" - User role: ${userRole}, Required: ${item.roles}, Has access: ${hasAccess}`);
      return hasAccess;
    });
    
    console.log('Filtered menu items count:', filtered.length);
    console.log('Filtered menu items:', filtered.map(i => i.title));
    return filtered;
    */
    
    // TEMPORARY: Show all menu items until backend is connected
    console.log('Showing all menu items (backend not connected)');
    return this.menuItems();
  });

  ngOnInit() {
    console.log('Sidebar component initialized');
    
    // TODO: Uncomment this when backend is connected
    /*
    this.authService.currentUser$.subscribe({
      next: (user) => {
        console.log('User data received in sidebar:', user);
        if (user) {
          console.log('User role:', user.role);
          console.log('User role type:', typeof user.role);
        }
        this.currentUser.set(user);
      },
      error: (err) => {
        console.error('Error getting user:', err);
      }
    });
    */
  }

  toggleSidebar() {
    const newState = !this.isCollapsed();
    this.isCollapsed.set(newState);
    this.sidebarToggled.emit(newState);
    console.log('Sidebar toggled:', newState);
  }

  setActiveMenu(menuId: string) {
    this.activeMenu.set(menuId);
  }

  logout() {
    this.authService.logout();
  }

  getInitials(): string {
    // TODO: Uncomment when backend is connected
    /*
    const user = this.currentUser();
    if (!user) return '?';
    
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
    */
    
    // TEMPORARY: Return placeholder until backend is connected
    return 'AD';
  }

  formatRole(role: UserRole | undefined): string {
    if (!role) return '';
    
    switch(role.toString().toUpperCase()) {
      case 'SUPER_ADMIN':
        return 'Super Admin';
      case 'ADMINISTRATOR':
        return 'Administrator';
      case 'COORDINATOR':
        return 'Coordinator';
      case 'INSTRUCTOR':
        return 'Instructor';
      default:
        return role.toString();
    }
  }
}