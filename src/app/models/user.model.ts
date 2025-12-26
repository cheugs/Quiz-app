// src/app/models/user.model.ts
import { Course } from './course.model';
import { Class } from './class.model';

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMINISTRATOR = 'administrator',
  COORDINATOR = 'coordinator',
  INSTRUCTOR = 'instructor'
}

export enum UserStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  PENDING = 'pending',
  INACTIVE = 'inactive'
}

export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: UserStatus;
  department?: string;
  avatarUrl?: string;
  phoneNumber?: string;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  
  // Permissions (role-based)
  permissions: string[];
  
  // Relations (optional, for API responses)
  assignedCourses?: Course[];
  assignedClasses?: Class[];
}

export interface AdminUser extends User {
  isSuperAdmin: boolean;
  canManageUsers: boolean;
  canConfigureSystem: boolean;
  assignedDepartments: string[];
}

// Add LoginResponse interface here
export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

// Add other auth-related interfaces
export interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RegisterRequest {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  role?: UserRole;
  department?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}