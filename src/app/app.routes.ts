import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { superAdminGuard } from './core/guards/super-admin-guard';
import { roleGuard } from './core/guards/role-guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth-routing-module').then(m => m.AuthRoutingModule)
  }, 
  {
    path: '',
    // canActivate: [authGuard],
    loadComponent: () => import('./layout/main-layout/main-layout').then(m => m.MainLayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard').then(m => m.DashboardComponent)
      },
      {
        path: 'quiz-management',
        loadComponent: () => import('./features/quiz-management/quiz-management').then(m => m.QuizManagementComponent)
      },
      {
        path: 'question-bank',
        loadComponent: () => import('./features/question-bank/question-bank').then(m => m.QuestionBankComponent)
      },
      {
        path: 'student-management',
        loadComponent: () => import('./features/student-management/student-management').then(m => m.StudentManagementComponent)
      },
      {
        path: 'course-management',
        loadComponent: () => import('./features/course-management/course-management').then(m => m.CourseManagementComponent)
      },
      {
        path: 'academic-configuration',
        loadComponent: () => import('./features/academic-configuration/academic-configuration').then(m => m.AcademicConfigurationComponent)
      },
      {
        path: 'response-viewing',
        loadComponent: () => import('./features/response-viewing/response-viewing').then(m => m.ResponseViewingComponent)
      },
      {
        path: 'notifications-management',
        loadComponent: () => import('./features/notifications-management/notifications-management').then(m => m.NotificationsManagementComponent)
      },
      {
        path: 'user-management',
        canActivate: [superAdminGuard],
        loadComponent: () => import('./features/user-management/user-management').then(m => m.UserManagementComponent)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];