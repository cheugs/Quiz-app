import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { 
  Student, 
  StudentStatus, 
  VerificationStatus,
  StudentActivity 
} from '../../models/student.model';
import { Class } from '../../models/class.model';
import { Course } from '../../models/course.model';

interface StudentFilter {
  search?: string;
  classId?: string;
  academicYearId?: string;
  status?: StudentStatus[];
  verificationStatus?: VerificationStatus[];
  department?: string;
  registrationDate?: {
    start?: Date;
    end?: Date;
  };
}

@Injectable({
  providedIn: 'root'
})
export class StudentManagementService {
  private http = inject(HttpClient);
  private apiUrl = '/api/students';

  // State management with signals
  private students = signal<Student[]>([]);
  private isLoading = signal(false);
  private selectedStudent = signal<Student | null>(null);
  private classes = signal<Class[]>([]);
  private courses = signal<Course[]>([]);
  private studentActivities = signal<StudentActivity[]>([]);

  // Public computed signals
  readonly students$ = computed(() => this.students());
  readonly isLoading$ = computed(() => this.isLoading());
  readonly selectedStudent$ = computed(() => this.selectedStudent());
  readonly classes$ = computed(() => this.classes());
  readonly courses$ = computed(() => this.courses());
  readonly studentActivities$ = computed(() => this.studentActivities());

  constructor() {
    this.loadInitialData();
  }

  /**
   * Load initial data for student management
   */
  private loadInitialData(): void {
    this.loadStudents();
    this.loadClasses();
    this.loadCourses();
    this.loadStudentActivities();
  }

  /**
   * Load all students
   */
  loadStudents(): void {
    this.isLoading.set(true);
    
    // Mock data - replace with actual API call
    const mockStudents: Student[] = [
      {
        id: '1',
        studentId: 'S20240001',
        email: 'john.doe@university.edu',
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: new Date('2000-05-15'),
        gender: 'male',
        phoneNumber: '+1234567890',
        currentClassId: '1',
        department: 'Computer Science',
        academicYearId: '2024',
        enrollmentDate: new Date('2024-01-15'),
        status: StudentStatus.ACTIVE,
        verificationStatus: VerificationStatus.VERIFIED,
        isActive: true,
        lastLoginAt: new Date('2024-03-10'),
        passwordResetRequired: false,
        address: '123 Main St, City, Country',
        emergencyContact: 'Jane Doe',
        emergencyPhone: '+0987654321',
        totalQuizzesTaken: 24,
        averageScore: 85.5,
        lastQuizTakenAt: new Date('2024-03-09'),
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-03-10')
      },
      {
        id: '2',
        studentId: 'S20240002',
        email: 'jane.smith@university.edu',
        firstName: 'Jane',
        lastName: 'Smith',
        dateOfBirth: new Date('2001-03-22'),
        gender: 'female',
        phoneNumber: '+1234567891',
        currentClassId: '1',
        department: 'Computer Science',
        academicYearId: '2024',
        enrollmentDate: new Date('2024-01-15'),
        status: StudentStatus.ACTIVE,
        verificationStatus: VerificationStatus.VERIFIED,
        isActive: true,
        lastLoginAt: new Date('2024-03-09'),
        passwordResetRequired: false,
        totalQuizzesTaken: 22,
        averageScore: 88.2,
        lastQuizTakenAt: new Date('2024-03-08'),
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-03-09')
      },
      {
        id: '3',
        studentId: 'S20240003',
        email: 'robert.johnson@university.edu',
        firstName: 'Robert',
        lastName: 'Johnson',
        dateOfBirth: new Date('2000-11-30'),
        gender: 'male',
        phoneNumber: '+1234567892',
        currentClassId: '2',
        department: 'Mathematics',
        academicYearId: '2024',
        enrollmentDate: new Date('2024-01-15'),
        status: StudentStatus.ACTIVE,
        verificationStatus: VerificationStatus.PENDING,
        isActive: true,
        lastLoginAt: new Date('2024-03-05'),
        passwordResetRequired: true,
        totalQuizzesTaken: 18,
        averageScore: 76.8,
        lastQuizTakenAt: new Date('2024-03-04'),
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-03-05')
      },
      {
        id: '4',
        studentId: 'S20240004',
        email: 'emily.williams@university.edu',
        firstName: 'Emily',
        lastName: 'Williams',
        dateOfBirth: new Date('2001-07-18'),
        gender: 'female',
        phoneNumber: '+1234567893',
        currentClassId: '2',
        department: 'Mathematics',
        academicYearId: '2024',
        enrollmentDate: new Date('2024-01-15'),
        status: StudentStatus.ACTIVE,
        verificationStatus: VerificationStatus.VERIFIED,
        isActive: true,
        lastLoginAt: new Date('2024-03-08'),
        passwordResetRequired: false,
        totalQuizzesTaken: 20,
        averageScore: 91.3,
        lastQuizTakenAt: new Date('2024-03-07'),
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-03-08')
      },
      {
        id: '5',
        studentId: 'S20240005',
        email: 'michael.brown@university.edu',
        firstName: 'Michael',
        lastName: 'Brown',
        dateOfBirth: new Date('2000-12-05'),
        gender: 'male',
        phoneNumber: '+1234567894',
        currentClassId: '3',
        department: 'Physics',
        academicYearId: '2024',
        enrollmentDate: new Date('2024-01-15'),
        status: StudentStatus.SUSPENDED,
        verificationStatus: VerificationStatus.VERIFIED,
        isActive: false,
        lastLoginAt: new Date('2024-02-15'),
        passwordResetRequired: false,
        totalQuizzesTaken: 12,
        averageScore: 68.4,
        lastQuizTakenAt: new Date('2024-02-14'),
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-02-15')
      },
      {
        id: '6',
        studentId: 'S20240006',
        email: 'sarah.davis@university.edu',
        firstName: 'Sarah',
        lastName: 'Davis',
        dateOfBirth: new Date('2001-01-25'),
        gender: 'female',
        phoneNumber: '+1234567895',
        currentClassId: '3',
        department: 'Physics',
        academicYearId: '2024',
        enrollmentDate: new Date('2024-01-15'),
        status: StudentStatus.ACTIVE,
        verificationStatus: VerificationStatus.UNVERIFIED,
        isActive: true,
        passwordResetRequired: true,
        totalQuizzesTaken: 15,
        averageScore: 79.2,
        lastQuizTakenAt: new Date('2024-03-06'),
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-03-06')
      }
    ];

    setTimeout(() => {
      this.students.set(mockStudents);
      this.isLoading.set(false);
    }, 1000);
  }

  /**
   * Load classes
   */
  private loadClasses(): void {
    const mockClasses: Class[] = [
      {
        id: '1',
        name: 'L3 Informatique Groupe A',
        code: 'L3-INFO-A',
        level: 'L3',
        department: 'Computer Science',
        departmentCode: 'CS',
        academicYearId: '2024',
        maxStudents: 50,
        currentStudentCount: 45,
        academicYearStart: new Date('2024-01-15'),
        academicYearEnd: new Date('2024-05-30'),
        courseIds: ['1', '2', '4'],
        coordinatorId: 'coord1',
        isActive: true,
        isFull: false,
        averageQuizParticipation: 92.3,
        totalQuizzesTaken: 5,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        createdBy: 'admin1'
      },
      {
        id: '2',
        name: 'L3 Mathématiques Groupe A',
        code: 'L3-MATH-A',
        level: 'L3',
        department: 'Mathematics',
        departmentCode: 'MATH',
        academicYearId: '2024',
        maxStudents: 40,
        currentStudentCount: 38,
        academicYearStart: new Date('2024-01-15'),
        academicYearEnd: new Date('2024-05-30'),
        courseIds: ['2', '5'],
        coordinatorId: 'coord2',
        isActive: true,
        isFull: false,
        averageQuizParticipation: 89.7,
        totalQuizzesTaken: 4,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        createdBy: 'admin1'
      },
      {
        id: '3',
        name: 'L3 Physique Groupe A',
        code: 'L3-PHYS-A',
        level: 'L3',
        department: 'Physics',
        departmentCode: 'PHYS',
        academicYearId: '2024',
        maxStudents: 35,
        currentStudentCount: 30,
        academicYearStart: new Date('2024-01-15'),
        academicYearEnd: new Date('2024-05-30'),
        courseIds: ['3', '6'],
        coordinatorId: 'coord3',
        isActive: true,
        isFull: false,
        averageQuizParticipation: 87.5,
        totalQuizzesTaken: 3,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        createdBy: 'admin1'
      }
    ];

    this.classes.set(mockClasses);
  }

  /**
   * Load courses
   */
  private loadCourses(): void {
    const mockCourses: Course[] = [
      {
        id: '1',
        code: 'CS101',
        name: 'Computer Science 101',
        description: 'Introduction to Computer Science',
        credits: 3,
        department: 'Computer Science',
        departmentCode: 'CS',
        academicYearId: '2024',
        semesterNumber: 1,
        classIds: ['1', '2'],
        instructorIds: ['inst1'],
        studentCount: 245,
        quizCount: 5,
        averageParticipationRate: 92.5,
        isActive: true,
        hasPrerequisites: false,
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-05-30'),
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        createdBy: 'admin1'
      },
      {
        id: '2',
        code: 'MATH201',
        name: 'Mathematics 201',
        description: 'Advanced Mathematics',
        credits: 4,
        department: 'Mathematics',
        departmentCode: 'MATH',
        academicYearId: '2024',
        semesterNumber: 2,
        classIds: ['1', '2', '3'],
        instructorIds: ['inst2'],
        studentCount: 189,
        quizCount: 3,
        averageParticipationRate: 89.7,
        isActive: true,
        hasPrerequisites: true,
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-05-30'),
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        createdBy: 'admin1'
      }
    ];

    this.courses.set(mockCourses);
  }

  /**
   * Load student activities
   */
  private loadStudentActivities(): void {
    const mockActivities: StudentActivity[] = [
      {
        studentId: '1',
        quizId: '1',
        quizTitle: 'Mid-Term Evaluation - CS101',
        completedAt: new Date('2024-03-09'),
        score: 92,
        timeSpent: 45
      },
      {
        studentId: '1',
        quizId: '2',
        quizTitle: 'Practice Quiz - Math',
        completedAt: new Date('2024-03-07'),
        score: 88,
        timeSpent: 35
      },
      {
        studentId: '2',
        quizId: '1',
        quizTitle: 'Mid-Term Evaluation - CS101',
        completedAt: new Date('2024-03-08'),
        score: 94,
        timeSpent: 50
      }
    ];

    this.studentActivities.set(mockActivities);
  }

  /**
   * Get student activities by student ID
   */
  getStudentActivities(studentId: string): StudentActivity[] {
    return this.studentActivities().filter(activity => activity.studentId === studentId);
  }

  /**
   * Get class name by ID
   */
  getClassName(classId: string): string {
    const cls = this.classes().find(c => c.id === classId);
    return cls ? cls.name : 'Unknown Class';
  }

  /**
   * Filter students based on criteria
   */
  filterStudents(filters: StudentFilter): Student[] {
    let filteredStudents = this.students();

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredStudents = filteredStudents.filter(student =>
        student.firstName.toLowerCase().includes(searchLower) ||
        student.lastName.toLowerCase().includes(searchLower) ||
        student.email.toLowerCase().includes(searchLower) ||
        student.studentId.toLowerCase().includes(searchLower)
      );
    }

    if (filters.classId) {
      filteredStudents = filteredStudents.filter(student => student.currentClassId === filters.classId);
    }

    if (filters.status?.length) {
      filteredStudents = filteredStudents.filter(student => filters.status!.includes(student.status));
    }

    if (filters.verificationStatus?.length) {
      filteredStudents = filteredStudents.filter(student => 
        filters.verificationStatus!.includes(student.verificationStatus)
      );
    }

    if (filters.department) {
      filteredStudents = filteredStudents.filter(student => student.department === filters.department);
    }

    if (filters.registrationDate?.start && filters.registrationDate?.end) {
      filteredStudents = filteredStudents.filter(student =>
        student.enrollmentDate >= filters.registrationDate!.start! &&
        student.enrollmentDate <= filters.registrationDate!.end!
      );
    }

    return filteredStudents;
  }

  /**
   * Create a new student
   */
  createStudent(studentData: Partial<Student>): Observable<Student> {
    this.isLoading.set(true);
    
    const newStudent: Student = {
      id: Date.now().toString(),
      studentId: this.generateStudentId(),
      email: studentData.email || '',
      firstName: studentData.firstName || '',
      lastName: studentData.lastName || '',
      dateOfBirth: studentData.dateOfBirth,
      gender: studentData.gender,
      phoneNumber: studentData.phoneNumber,
      currentClassId: studentData.currentClassId || '',
      department: studentData.department || '',
      academicYearId: studentData.academicYearId || '2024',
      enrollmentDate: studentData.enrollmentDate || new Date(),
      graduationDate: studentData.graduationDate,
      status: studentData.status || StudentStatus.ACTIVE,
      verificationStatus: studentData.verificationStatus || VerificationStatus.PENDING,
      isActive: studentData.isActive ?? true,
      lastLoginAt: undefined,
      passwordResetRequired: studentData.passwordResetRequired ?? true,
      address: studentData.address,
      emergencyContact: studentData.emergencyContact,
      emergencyPhone: studentData.emergencyPhone,
      totalQuizzesTaken: 0,
      averageScore: 0,
      lastQuizTakenAt: undefined,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return of(newStudent).pipe(
      tap(student => {
        this.students.update(students => [...students, student]);
        this.isLoading.set(false);
      })
    );
  }

  /**
   * Update an existing student
   */
  updateStudent(id: string, studentData: Partial<Student>): Observable<Student> {
    this.isLoading.set(true);
    
    const existingStudent = this.students().find(s => s.id === id);
    if (!existingStudent) {
      throw new Error('Student not found');
    }

    const updatedStudent: Student = {
      ...existingStudent,
      ...studentData,
      updatedAt: new Date()
    };

    return of(updatedStudent).pipe(
      tap(student => {
        this.students.update(students => 
          students.map(s => s.id === id ? updatedStudent : s)
        );
        this.isLoading.set(false);
      })
    );
  }

  /**
   * Delete a student
   */
  deleteStudent(id: string): Observable<void> {
    this.isLoading.set(true);
    
    return of(void 0).pipe(
      tap(() => {
        this.students.update(students => students.filter(s => s.id !== id));
        this.isLoading.set(false);
      })
    );
  }

  /**
   * Verify student account
   */
  verifyStudent(id: string): Observable<Student> {
    this.isLoading.set(true);
    
    const studentToVerify = this.students().find(s => s.id === id);
    if (!studentToVerify) {
      throw new Error('Student not found');
    }

    const verifiedStudent: Student = {
      ...studentToVerify,
      verificationStatus: VerificationStatus.VERIFIED,
      updatedAt: new Date()
    };

    return of(verifiedStudent).pipe(
      tap(student => {
        this.students.update(students => 
          students.map(s => s.id === id ? verifiedStudent : s)
        );
        this.isLoading.set(false);
      })
    );
  }

  /**
   * Reset student password
   */
  resetStudentPassword(id: string): Observable<Student> {
    this.isLoading.set(true);
    
    const studentToReset = this.students().find(s => s.id === id);
    if (!studentToReset) {
      throw new Error('Student not found');
    }

    const resetStudent: Student = {
      ...studentToReset,
      passwordResetRequired: true,
      updatedAt: new Date()
    };

    return of(resetStudent).pipe(
      tap(student => {
        this.students.update(students => 
          students.map(s => s.id === id ? resetStudent : s)
        );
        this.isLoading.set(false);
      })
    );
  }

  /**
   * Get departments from students
   */
  getDepartments(): string[] {
    const departments = this.students()
      .map(student => student.department)
      .filter((value, index, self) => self.indexOf(value) === index);
    
    return departments.sort();
  }

  /**
   * Generate student ID
   */
  private generateStudentId(): string {
    const year = new Date().getFullYear();
    const count = this.students().length + 1;
    return `S${year}${count.toString().padStart(4, '0')}`;
  }

  /**
   * Get status badge color
   */
  getStatusColor(status: StudentStatus): string {
    switch (status) {
      case StudentStatus.ACTIVE: return '#10b981'; // green
      case StudentStatus.GRADUATED: return '#3b82f6'; // blue
      case StudentStatus.SUSPENDED: return '#ef4444'; // red
      case StudentStatus.DROPPED: return '#6b7280'; // gray
      default: return '#6b7280';
    }
  }

  /**
   * Get verification status badge color
   */
  getVerificationColor(status: VerificationStatus): string {
    switch (status) {
      case VerificationStatus.VERIFIED: return '#10b981'; // green
      case VerificationStatus.PENDING: return '#f59e0b'; // amber
      case VerificationStatus.UNVERIFIED: return '#ef4444'; // red
      default: return '#6b7280';
    }
  }

  /**
   * Get student statistics
   */
  getStudentStats() {
    const students = this.students();
    return {
      total: students.length,
      active: students.filter(s => s.status === StudentStatus.ACTIVE && s.isActive).length,
      verified: students.filter(s => s.verificationStatus === VerificationStatus.VERIFIED).length,
      pendingVerification: students.filter(s => s.verificationStatus === VerificationStatus.PENDING).length,
      suspended: students.filter(s => s.status === StudentStatus.SUSPENDED).length,
      averageQuizzes: students.reduce((sum, s) => sum + s.totalQuizzesTaken, 0) / students.length,
      averageScore: students.reduce((sum, s) => sum + (s.averageScore || 0), 0) / students.length
    };
  }
}