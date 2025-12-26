import { User } from './user.model';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: ApiError;
  meta?: ApiMeta;
  timestamp: Date;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  validationErrors?: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ApiMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: ApiMeta;
}

// Common API response types
export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface FileUploadResponse {
  id: string;
  filename: string;
  originalName: string;
  size: number;
  mimetype: string;
  url: string;
  uploadedAt: Date;
}

export interface ExportResponse {
  id: string;
  type: string;
  status: 'processing' | 'completed' | 'failed';
  downloadUrl?: string;
  filename?: string;
  createdAt: Date;
  completedAt?: Date;
}

// Request types
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FilterParams {
  search?: string;
  filters?: Record<string, any>;
  dateRange?: {
    start?: Date;
    end?: Date;
  };
}