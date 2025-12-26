// src/app/core/services/course-management.ts - REMOVE DUPLICATED METHODS
// Keep only the service code, remove the component methods from the bottom

import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Course } from '../../models/course.model';
import { Class } from '../../models/class.model';
import { User } from '../../models/user.model';
import { ApiResponse, PaginatedResponse } from '../../models/api-response.model';

export interface CourseFilter {
  search?: string;
  department?: string;
  academicYearId?: string;
  semesterId?: string;
  isActive?: boolean;
  coordinatorId?: string;
}

export interface CourseFormData {
  code: string;
  name: string;
  description?: string;
  credits: number;
  department: string;
  departmentCode: string;
  academicYearId: string;
  semesterId?: string;
  semesterNumber: number;
  classIds: string[];
  coordinatorId?: string;
  instructorIds: string[];
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  prerequisiteCourseIds?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CourseManagementService {
  private apiUrl = '/api/courses';
  
  // Mock data
  private mockCourses: Course[] = [
    {
      id: '1',
      code: 'CS101',
      name: 'Introduction to Computer Science',
      description: 'Fundamentals of computer science and programming',
      credits: 3,
      department: 'Computer Science',
      departmentCode: 'CS',
      academicYearId: '2024',
      semesterId: '1',
      semesterNumber: 1,
      classIds: ['1', '2'],
      coordinatorId: '1',
      instructorIds: ['1', '2'],
      studentCount: 85,
      quizCount: 4,
      averageParticipationRate: 92,
      isActive: true,
      hasPrerequisites: false,
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-05-15'),
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      createdBy: 'admin1'
    },
    {
      id: '2',
      code: 'MATH201',
      name: 'Advanced Mathematics',
      description: 'Advanced topics in mathematics including calculus and linear algebra',
      credits: 4,
      department: 'Mathematics',
      departmentCode: 'MATH',
      academicYearId: '2024',
      semesterId: '1',
      semesterNumber: 1,
      classIds: ['3'],
      coordinatorId: '2',
      instructorIds: ['3'],
      studentCount: 42,
      quizCount: 3,
      averageParticipationRate: 88,
      isActive: true,
      hasPrerequisites: true,
      prerequisiteCourseIds: ['1'],
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-05-15'),
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      createdBy: 'admin1'
    },
    {
      id: '3',
      code: 'PHY101',
      name: 'Physics Fundamentals',
      description: 'Basic principles of physics',
      credits: 3,
      department: 'Physics',
      departmentCode: 'PHY',
      academicYearId: '2024',
      semesterId: '2',
      semesterNumber: 2,
      classIds: ['1', '2', '3'],
      coordinatorId: '3',
      instructorIds: ['1'],
      studentCount: 78,
      quizCount: 5,
      averageParticipationRate: 85,
      isActive: true,
      hasPrerequisites: false,
      startDate: new Date('2024-06-15'),
      endDate: new Date('2024-08-15'),
      createdAt: new Date('2024-05-01'),
      updatedAt: new Date('2024-05-01'),
      createdBy: 'admin1'
    },
    {
      id: '4',
      code: 'CHEM101',
      name: 'Chemistry Basics',
      description: 'Introduction to chemical principles',
      credits: 3,
      department: 'Chemistry',
      departmentCode: 'CHEM',
      academicYearId: '2023',
      semesterId: '1',
      semesterNumber: 1,
      classIds: ['2'],
      coordinatorId: '4',
      instructorIds: ['4'],
      studentCount: 65,
      quizCount: 3,
      averageParticipationRate: 90,
      isActive: false,
      hasPrerequisites: false,
      startDate: new Date('2023-01-15'),
      endDate: new Date('2023-05-15'),
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-01-01'),
      createdBy: 'admin1'
    },
    {
      id: '5',
      code: 'ENG101',
      name: 'Engineering Principles',
      description: 'Fundamentals of engineering',
      credits: 4,
      department: 'Engineering',
      departmentCode: 'ENG',
      academicYearId: '2024',
      semesterId: '1',
      semesterNumber: 1,
      classIds: ['1'],
      coordinatorId: '5',
      instructorIds: ['5'],
      studentCount: 55,
      quizCount: 4,
      averageParticipationRate: 87,
      isActive: true,
      hasPrerequisites: true,
      prerequisiteCourseIds: ['2'],
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-05-15'),
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      createdBy: 'admin1'
    },
    {
      id: '6',
      code: 'BUS101',
      name: 'Business Administration',
      description: 'Introduction to business management',
      credits: 3,
      department: 'Business',
      departmentCode: 'BUS',
      academicYearId: '2024',
      semesterId: '2',
      semesterNumber: 2,
      classIds: ['3'],
      coordinatorId: '6',
      instructorIds: ['6'],
      studentCount: 48,
      quizCount: 3,
      averageParticipationRate: 83,
      isActive: true,
      hasPrerequisites: false,
      startDate: new Date('2024-06-15'),
      endDate: new Date('2024-08-15'),
      createdAt: new Date('2024-05-01'),
      updatedAt: new Date('2024-05-01'),
      createdBy: 'admin1'
    }
  ];
  
  // Signals for reactive state management
  private courses = signal<Course[]>(this.mockCourses);
  private selectedCourse = signal<Course | null>(null);
  private loading = signal<boolean>(false);
  private error = signal<string | null>(null);
  private totalCount = signal<number>(this.mockCourses.length);
  
  // Computed signals
  public readonly courses$ = computed(() => this.courses());
  public readonly selectedCourse$ = computed(() => this.selectedCourse());
  public readonly loading$ = computed(() => this.loading());
  public readonly error$ = computed(() => this.error());
  public readonly totalCount$ = computed(() => this.totalCount());
  
  // Filter state
  private currentFilters = signal<CourseFilter>({});
  private currentPage = signal<number>(1);
  private pageSize = signal<number>(10);

  constructor(private http: HttpClient) {
    // Load initial data
    this.loadCourses();
  }

  /**
   * Load courses with current filters
   */
  loadCourses(): void {
    this.loading.set(true);
    this.error.set(null);
    
    // Simulate API delay
    setTimeout(() => {
      try {
        let filteredCourses = [...this.mockCourses];
        const filters = this.currentFilters();
        
        // Apply search filter
        if (filters.search) {
          const search = filters.search.toLowerCase();
          filteredCourses = filteredCourses.filter(course =>
            course.code.toLowerCase().includes(search) ||
            course.name.toLowerCase().includes(search) ||
            course.department.toLowerCase().includes(search)
          );
        }
        
        // Apply department filter
        if (filters.department) {
          filteredCourses = filteredCourses.filter(course => course.department === filters.department);
        }
        
        // Apply academic year filter
        if (filters.academicYearId) {
          filteredCourses = filteredCourses.filter(course => course.academicYearId === filters.academicYearId);
        }
        
        // Apply semester filter
        if (filters.semesterId) {
          filteredCourses = filteredCourses.filter(course => course.semesterId === filters.semesterId);
        }
        
        // Apply status filter
        if (filters.isActive !== undefined) {
          filteredCourses = filteredCourses.filter(course => course.isActive === filters.isActive);
        }
        
        this.courses.set(filteredCourses);
        this.totalCount.set(filteredCourses.length);
      } catch (err) {
        this.error.set('Failed to load courses');
        console.error('Error loading courses:', err);
      } finally {
        this.loading.set(false);
      }
    }, 500); // Simulate network delay
  }

  /**
   * Get course by ID
   */
  getCourseById(id: string): Observable<ApiResponse<Course>> {
    const course = this.mockCourses.find(c => c.id === id);
    return of({
      success: !!course,
      data: course || undefined,
      message: course ? 'Course found' : 'Course not found',
      timestamp: new Date()
    }).pipe(delay(300));
  }

  /**
   * Create new course
   */
  createCourse(courseData: CourseFormData): Observable<ApiResponse<Course>> {
    return new Observable(observer => {
      setTimeout(() => {
        try {
          const newCourse: Course = {
            id: (this.mockCourses.length + 1).toString(),
            ...courseData,
            studentCount: 0,
            quizCount: 0,
            averageParticipationRate: 0,
            hasPrerequisites: !!courseData.prerequisiteCourseIds?.length,
            createdAt: new Date(),
            updatedAt: new Date(),
            createdBy: 'admin'
          };
          
          this.mockCourses.push(newCourse);
          this.courses.set([...this.mockCourses]);
          this.totalCount.set(this.mockCourses.length);
          
          observer.next({
            success: true,
            data: newCourse,
            message: 'Course created successfully',
            timestamp: new Date()
          });
          observer.complete();
        } catch (error) {
          observer.error({
            success: false,
            message: 'Failed to create course',
            timestamp: new Date()
          });
        }
      }, 500);
    });
  }

  /**
   * Update existing course
   */
  updateCourse(id: string, courseData: Partial<CourseFormData>): Observable<ApiResponse<Course>> {
    return new Observable(observer => {
      setTimeout(() => {
        try {
          const index = this.mockCourses.findIndex(c => c.id === id);
          if (index === -1) {
            observer.next({
              success: false,
              message: 'Course not found',
              timestamp: new Date()
            });
            return;
          }
          
          const updatedCourse = {
            ...this.mockCourses[index],
            ...courseData,
            updatedAt: new Date()
          };
          
          this.mockCourses[index] = updatedCourse;
          this.courses.set([...this.mockCourses]);
          
          // Update selected course if it's the one being edited
          if (this.selectedCourse()?.id === id) {
            this.selectedCourse.set(updatedCourse);
          }
          
          observer.next({
            success: true,
            data: updatedCourse,
            message: 'Course updated successfully',
            timestamp: new Date()
          });
          observer.complete();
        } catch (error) {
          observer.error({
            success: false,
            message: 'Failed to update course',
            timestamp: new Date()
          });
        }
      }, 500);
    });
  }

  /**
   * Delete course
   */
  deleteCourse(id: string): Observable<ApiResponse<void>> {
    return new Observable(observer => {
      setTimeout(() => {
        try {
          const index = this.mockCourses.findIndex(c => c.id === id);
          if (index === -1) {
            observer.next({
              success: false,
              message: 'Course not found',
              timestamp: new Date()
            });
            return;
          }
          
          this.mockCourses.splice(index, 1);
          this.courses.set([...this.mockCourses]);
          this.totalCount.set(this.mockCourses.length);
          
          // Clear selected course if it's the one being deleted
          if (this.selectedCourse()?.id === id) {
            this.selectedCourse.set(null);
          }
          
          observer.next({
            success: true,
            message: 'Course deleted successfully',
            timestamp: new Date()
          });
          observer.complete();
        } catch (error) {
          observer.error({
            success: false,
            message: 'Failed to delete course',
            timestamp: new Date()
          });
        }
      }, 500);
    });
  }

  /**
   * Bulk import courses from CSV/Excel
   */
  importCourses(file: File): Observable<ApiResponse<{ success: number; failed: number; errors: string[] }>> {
    return new Observable(observer => {
      setTimeout(() => {
        // Simulate import process
        observer.next({
          success: true,
          data: {
            success: 3,
            failed: 0,
            errors: []
          },
          message: 'Import completed successfully',
          timestamp: new Date()
        });
        observer.complete();
      }, 1000);
    });
  }

  /**
   * Export courses to CSV/Excel
   */
  exportCourses(filters: CourseFilter): Observable<Blob> {
    return new Observable(observer => {
      setTimeout(() => {
        // Create a mock CSV file
        const csvContent = 'Course Code,Course Name,Department,Status\n' +
          this.mockCourses.map(c => `${c.code},${c.name},${c.department},${c.isActive ? 'Active' : 'Inactive'}`).join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        observer.next(blob);
        observer.complete();
      }, 500);
    });
  }

  /**
   * Get available classes for course assignment
   */
  getAvailableClasses(): Observable<ApiResponse<Class[]>> {
    return of({
      success: true,
      data: [],
      timestamp: new Date()
    }).pipe(delay(300));
  }

  /**
   * Get available instructors for course assignment
   */
  getAvailableInstructors(): Observable<ApiResponse<User[]>> {
    return of({
      success: true,
      data: [],
      timestamp: new Date()
    }).pipe(delay(300));
  }

  /**
   * Assign classes to course
   */
  assignClassesToCourse(courseId: string, classIds: string[]): Observable<ApiResponse<Course>> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          success: true,
          data: undefined,
          message: 'Classes assigned successfully',
          timestamp: new Date()
        });
        observer.complete();
      }, 500);
    });
  }

  /**
   * Remove classes from course
   */
  removeClassesFromCourse(courseId: string, classIds: string[]): Observable<ApiResponse<Course>> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          success: true,
          data: undefined,
          message: 'Classes removed successfully',
          timestamp: new Date()
        });
        observer.complete();
      }, 500);
    });
  }

  /**
   * Update filters
   */
  updateFilters(filters: CourseFilter): void {
    this.currentFilters.set(filters);
    this.currentPage.set(1);
    this.loadCourses();
  }

  /**
   * Update pagination
   */
  updatePagination(page: number, pageSize: number): void {
    this.currentPage.set(page);
    this.pageSize.set(pageSize);
    this.loadCourses();
  }

  /**
   * Select course
   */
  selectCourse(course: Course | null): void {
    this.selectedCourse.set(course);
  }

  /**
   * Clear selected course
   */
  clearSelectedCourse(): void {
    this.selectedCourse.set(null);
  }

  /**
   * Clear error
   */
  clearError(): void {
    this.error.set(null);
  }

  /**
   * Refresh courses
   */
  refreshCourses(): void {
    this.loadCourses();
  }

  /**
   * Get filtered courses count
   */
  getFilteredCount(): number {
    return this.courses().length;
  }
}