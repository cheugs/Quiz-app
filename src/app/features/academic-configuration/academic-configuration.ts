// src/app/features/academic-configuration/academic-configuration.component.ts
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AcademicYear, AcademicYearSummary } from '../../models/academic-year.model';
import { Semester, SemesterType, EvaluationPeriod } from '../../models/semester.model';
import { EvaluationType } from '../../models/evaluation-type.model';
import { Class } from '../../models/class.model';
import { NotificationService } from '../../core/services/notification';

@Component({
  selector: 'app-academic-configuration',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './academic-configuration.html',
  styleUrls: ['./academic-configuration.scss']
})
export class AcademicConfigurationComponent implements OnInit {
  private fb = inject(FormBuilder);
  private notificationService = inject(NotificationService);

  // Data signals
  academicYears = signal<AcademicYear[]>([]);
  semesters = signal<Semester[]>([]);
  evaluationTypes = signal<EvaluationType[]>([]);
  classes = signal<Class[]>([]);
  
  // Current selections
  selectedAcademicYear = signal<AcademicYear | null>(null);
  selectedSemester = signal<Semester | null>(null);
  selectedEvaluationType = signal<EvaluationType | null>(null);
  selectedClass = signal<Class | null>(null);

  // Forms
  academicYearForm!: FormGroup;
  semesterForm!: FormGroup;
  evaluationTypeForm!: FormGroup;
  classForm!: FormGroup;

  // UI states
  isLoading = signal(true);
  isAddingAcademicYear = signal(false);
  isAddingSemester = signal(false);
  isAddingEvaluationType = signal(false);
  isAddingClass = signal(false);
  activeTab = signal('academic-years'); // 'academic-years', 'semesters', 'evaluation-types', 'classes'

  // Mock data for demonstration
  mockAcademicYears: AcademicYear[] = [
    {
      id: '1',
      name: '2024-2025',
      code: 'AY2425',
      startDate: new Date('2024-09-01'),
      endDate: new Date('2025-07-31'),
      isCurrent: true,
      status: 'active',
      totalStudents: 2456,
      totalCourses: 48,
      totalClasses: 32,
      totalQuizzes: 84,
      semesterIds: ['1', '2'],
      defaultEvaluationSettings: {
        midTermDuration: 60,
        finalExamDuration: 120,
        passingScore: 50
      },
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-08-01'),
      createdBy: 'admin1'
    },
    {
      id: '2',
      name: '2023-2024',
      code: 'AY2324',
      startDate: new Date('2023-09-01'),
      endDate: new Date('2024-07-31'),
      isCurrent: false,
      status: 'completed',
      totalStudents: 2350,
      totalCourses: 46,
      totalClasses: 30,
      totalQuizzes: 78,
      semesterIds: [],
      defaultEvaluationSettings: {
        midTermDuration: 60,
        finalExamDuration: 120,
        passingScore: 50
      },
      createdAt: new Date('2023-01-15'),
      updatedAt: new Date('2024-07-31'),
      createdBy: 'admin1'
    }
  ];

  mockSemesters: Semester[] = [
    {
      id: '1',
      name: 'Fall Semester 2024',
      code: 'S1-2024',
      type: SemesterType.FALL,
      number: 1,
      startDate: new Date('2024-09-01'),
      endDate: new Date('2024-12-20'),
      registrationStart: new Date('2024-08-01'),
      registrationEnd: new Date('2024-08-31'),
      academicYearId: '1',
      isCurrent: true,
      status: 'active',
      evaluationPeriods: [
        {
          id: '1',
          semesterId: '1',
          type: 'mid_term',
          name: 'Mid-Term Evaluation',
          startDate: new Date('2024-10-15'),
          endDate: new Date('2024-10-30'),
          registrationDeadline: new Date('2024-10-10'),
          isActive: true,
          allowedEvaluationTypes: ['mid_term']
        }
      ],
      enrolledStudents: 2456,
      activeCourses: 48,
      completedQuizzes: 42,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-08-01')
    },
    {
      id: '2',
      name: 'Spring Semester 2024',
      code: 'S2-2024',
      type: SemesterType.SPRING,
      number: 2,
      startDate: new Date('2025-01-15'),
      endDate: new Date('2025-05-20'),
      registrationStart: new Date('2024-12-01'),
      registrationEnd: new Date('2025-01-10'),
      academicYearId: '1',
      isCurrent: false,
      status: 'upcoming',
      evaluationPeriods: [],
      enrolledStudents: 0,
      activeCourses: 0,
      completedQuizzes: 0,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-08-01')
    }
  ];

  mockEvaluationTypes: EvaluationType[] = [
    {
      id: '1',
      name: 'Mid-Term Evaluation',
      code: 'MID_TERM',
      description: 'Mid-term assessment for courses. Duration and question types vary by subject and class.',
      defaultDuration: 60,
      defaultPassingScore: 50,
      defaultMaxAttempts: 1,
      defaultQuestionCount: 30,
      allowedDaysOfWeek: [1, 2, 3, 4, 5], // Mon-Fri
      minAdvanceNotice: 24,
      maxDuration: 90,
      weight: 30,
      isGraded: true,
      includeInTranscript: true,
      requiredQuestionTypes: [], // Removed fixed types
      allowedForClasses: ['1', '2', '3'],
      requiresProctoring: false,
      isActive: true,
      isDefault: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-08-01'),
      createdBy: 'admin1'
    },
    {
      id: '2',
      name: 'Final Exam',
      code: 'FINAL_EXAM',
      description: 'End of semester final examination. Duration and format vary based on course requirements.',
      defaultDuration: 120,
      defaultPassingScore: 60,
      defaultMaxAttempts: 1,
      defaultQuestionCount: 50,
      allowedDaysOfWeek: [1, 2, 3, 4, 5],
      minAdvanceNotice: 48,
      maxDuration: 180,
      weight: 40,
      isGraded: true,
      includeInTranscript: true,
      requiredQuestionTypes: [], // Removed fixed types
      allowedForClasses: ['1', '2', '3'],
      requiresProctoring: true,
      isActive: true,
      isDefault: false,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-08-01'),
      createdBy: 'admin1'
    },
    {
      id: '3',
      name: 'Practice Quiz',
      code: 'PRACTICE',
      description: 'Practice quizzes for self-assessment. Flexible format based on instructor preferences.',
      defaultDuration: 30,
      defaultPassingScore: 40,
      defaultMaxAttempts: 3,
      defaultQuestionCount: 20,
      allowedDaysOfWeek: [1, 2, 3, 4, 5, 6, 7],
      minAdvanceNotice: 12,
      maxDuration: 60,
      weight: 0,
      isGraded: false,
      includeInTranscript: false,
      requiredQuestionTypes: [], // Removed fixed types
      allowedForClasses: ['1', '2', '3'],
      requiresProctoring: false,
      isActive: true,
      isDefault: false,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-08-01'),
      createdBy: 'admin1'
    }
  ];

  mockClasses: Class[] = [
    {
      id: '1',
      name: 'L3 Informatique Groupe A',
      code: 'L3-INFO-A',
      level: 'L3',
      department: 'Computer Science',
      departmentCode: 'CS',
      academicYearId: '1',
      maxStudents: 45,
      currentStudentCount: 42,
      academicYearStart: new Date('2024-09-01'),
      academicYearEnd: new Date('2025-07-31'),
      courseIds: ['1', '2'],
      coordinatorId: 'admin1',
      isActive: true,
      isFull: false,
      averageQuizParticipation: 85.4,
      totalQuizzesTaken: 24,
      createdAt: new Date('2024-08-01'),
      updatedAt: new Date('2024-09-15'),
      createdBy: 'admin1'
    },
    {
      id: '2',
      name: 'M1 Mathematics',
      code: 'M1-MATH',
      level: 'M1',
      department: 'Mathematics',
      departmentCode: 'MATH',
      academicYearId: '1',
      maxStudents: 35,
      currentStudentCount: 32,
      academicYearStart: new Date('2024-09-01'),
      academicYearEnd: new Date('2025-07-31'),
      courseIds: ['3'],
      coordinatorId: 'admin2',
      isActive: true,
      isFull: false,
      averageQuizParticipation: 92.1,
      totalQuizzesTaken: 18,
      createdAt: new Date('2024-08-01'),
      updatedAt: new Date('2024-09-15'),
      createdBy: 'admin1'
    }
  ];

  ngOnInit(): void {
    this.initForms();
    this.loadData();
  }

  initForms(): void {
    this.academicYearForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{4}$/)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      isCurrent: [false]
    });

    this.semesterForm = this.fb.group({
      name: ['', Validators.required],
      type: [SemesterType.FALL, Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      academicYearId: ['', Validators.required],
      isCurrent: [false]
    });

    this.evaluationTypeForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', [Validators.required, Validators.pattern(/^[A-Z_]+$/)]],
      description: [''],
      weight: [30, [Validators.required, Validators.min(0), Validators.max(100)]],
      isGraded: [true],
      includeInTranscript: [false],
      requiresProctoring: [false],
      isDefault: [false]
    });

    this.classForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      level: ['', Validators.required],
      department: ['', Validators.required],
      maxStudents: [45, [Validators.required, Validators.min(1), Validators.max(100)]],
      academicYearId: ['', Validators.required]
    });
  }

  loadData(): void {
    this.isLoading.set(true);
    
    // Simulate API call delay
    setTimeout(() => {
      this.academicYears.set(this.mockAcademicYears);
      this.semesters.set(this.mockSemesters);
      this.evaluationTypes.set(this.mockEvaluationTypes);
      this.classes.set(this.mockClasses);
      
      // Set current academic year if exists
      const currentYear = this.mockAcademicYears.find(ay => ay.isCurrent);
      if (currentYear) {
        this.selectedAcademicYear.set(currentYear);
      }
      
      this.isLoading.set(false);
    }, 1000);
  }

  // Academic Year Methods
  addAcademicYear(): void {
    if (this.academicYearForm.invalid) {
      this.notificationService.showError('Please fill in all required fields correctly');
      return;
    }

    const newYear: AcademicYear = {
      id: Date.now().toString(),
      name: this.academicYearForm.value.name,
      code: `AY${this.academicYearForm.value.name.substring(2,4)}${this.academicYearForm.value.name.substring(7,9)}`,
      startDate: new Date(this.academicYearForm.value.startDate),
      endDate: new Date(this.academicYearForm.value.endDate),
      isCurrent: this.academicYearForm.value.isCurrent,
      status: 'upcoming',
      totalStudents: 0,
      totalCourses: 0,
      totalClasses: 0,
      totalQuizzes: 0,
      semesterIds: [],
      defaultEvaluationSettings: {
        midTermDuration: 60,
        finalExamDuration: 120,
        passingScore: 50
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'admin1'
    };

    this.academicYears.update(years => [newYear, ...years]);
    
    // If this is set as current, update other years
    if (newYear.isCurrent) {
      this.academicYears.update(years => 
        years.map(year => ({
          ...year,
          isCurrent: year.id === newYear.id
        }))
      );
    }

    this.academicYearForm.reset();
    this.isAddingAcademicYear.set(false);
    this.notificationService.showSuccess('Academic year added successfully');
  }

  setCurrentAcademicYear(year: AcademicYear): void {
    this.academicYears.update(years => 
      years.map(ay => ({
        ...ay,
        isCurrent: ay.id === year.id
      }))
    );
    this.selectedAcademicYear.set(year);
    this.notificationService.showSuccess(`${year.name} set as current academic year`);
  }

  // Semester Methods
  addSemester(): void {
    if (this.semesterForm.invalid) {
      this.notificationService.showError('Please fill in all required fields correctly');
      return;
    }

    const newSemester: Semester = {
      id: Date.now().toString(),
      name: this.semesterForm.value.name,
      code: `S${this.semesterForm.value.type === 'fall' ? '1' : '2'}-${new Date().getFullYear()}`,
      type: this.semesterForm.value.type,
      number: this.semesterForm.value.type === 'fall' ? 1 : 2,
      startDate: new Date(this.semesterForm.value.startDate),
      endDate: new Date(this.semesterForm.value.endDate),
      registrationStart: new Date(new Date(this.semesterForm.value.startDate).getTime() - 30 * 24 * 60 * 60 * 1000),
      registrationEnd: new Date(new Date(this.semesterForm.value.startDate).getTime() - 7 * 24 * 60 * 60 * 1000),
      academicYearId: this.semesterForm.value.academicYearId,
      isCurrent: this.semesterForm.value.isCurrent,
      status: 'upcoming',
      evaluationPeriods: [],
      enrolledStudents: 0,
      activeCourses: 0,
      completedQuizzes: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.semesters.update(semesters => [newSemester, ...semesters]);
    this.semesterForm.reset();
    this.isAddingSemester.set(false);
    this.notificationService.showSuccess('Semester added successfully');
  }

  // Evaluation Type Methods
  addEvaluationType(): void {
    if (this.evaluationTypeForm.invalid) {
      this.notificationService.showError('Please fill in all required fields correctly');
      return;
    }

    const newEvaluationType: EvaluationType = {
      id: Date.now().toString(),
      name: this.evaluationTypeForm.value.name,
      code: this.evaluationTypeForm.value.code,
      description: this.evaluationTypeForm.value.description,
      defaultDuration: 60,
      defaultPassingScore: 50,
      defaultMaxAttempts: 1,
      defaultQuestionCount: 30,
      allowedDaysOfWeek: [1, 2, 3, 4, 5],
      minAdvanceNotice: 24,
      maxDuration: 120,
      weight: this.evaluationTypeForm.value.weight,
      isGraded: this.evaluationTypeForm.value.isGraded,
      includeInTranscript: this.evaluationTypeForm.value.includeInTranscript,
      requiredQuestionTypes: [], // No fixed question types
      allowedForClasses: [],
      requiresProctoring: this.evaluationTypeForm.value.requiresProctoring,
      isActive: true,
      isDefault: this.evaluationTypeForm.value.isDefault,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'admin1'
    };

    this.evaluationTypes.update(types => [newEvaluationType, ...types]);
    this.evaluationTypeForm.reset();
    this.isAddingEvaluationType.set(false);
    this.notificationService.showSuccess('Evaluation type added successfully');
  }

  // Class Methods
  addClass(): void {
    if (this.classForm.invalid) {
      this.notificationService.showError('Please fill in all required fields correctly');
      return;
    }

    const newClass: Class = {
      id: Date.now().toString(),
      name: this.classForm.value.name,
      code: this.classForm.value.code,
      level: this.classForm.value.level,
      department: this.classForm.value.department,
      departmentCode: this.classForm.value.department.substring(0, 3).toUpperCase(),
      academicYearId: this.classForm.value.academicYearId,
      maxStudents: this.classForm.value.maxStudents,
      currentStudentCount: 0,
      academicYearStart: new Date(),
      academicYearEnd: new Date(),
      courseIds: [],
      isActive: true,
      isFull: false,
      averageQuizParticipation: 0,
      totalQuizzesTaken: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'admin1'
    };

    this.classes.update(classes => [newClass, ...classes]);
    this.classForm.reset();
    this.isAddingClass.set(false);
    this.notificationService.showSuccess('Class added successfully');
  }

  // Utility Methods
  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  getAcademicYearProgress(year: AcademicYear): number {
    const totalDays = (year.endDate.getTime() - year.startDate.getTime()) / (1000 * 60 * 60 * 24);
    const daysPassed = (new Date().getTime() - year.startDate.getTime()) / (1000 * 60 * 60 * 24);
    return Math.min(100, Math.max(0, (daysPassed / totalDays) * 100));
  }

  getStatusColor(status: string): string {
    switch(status) {
      case 'active': return '#6b8e7f'; // Sage green
      case 'upcoming': return '#2d2d2d'; // Primary dark
      case 'completed': return '#888'; // Text gray
      default: return '#888';
    }
  }

  getSemesterTypeColor(type: SemesterType): string {
    switch(type) {
      case SemesterType.FALL: return '#6b8e7f'; // Sage green
      case SemesterType.SPRING: return '#4a5f52'; // Darker sage
      case SemesterType.SUMMER: return '#2d2d2d'; // Primary dark
      case SemesterType.WINTER: return '#888'; // Text gray
      default: return '#888';
    }
  }

  getEvaluationTypeColor(code: string): string {
    switch(code) {
      case 'MID_TERM': return '#6b8e7f'; // Sage green
      case 'FINAL_EXAM': return '#4a5f52'; // Darker sage
      case 'PRACTICE': return '#2d2d2d'; // Primary dark
      case 'ASSIGNMENT': return '#888'; // Text gray
      default: return '#6b8e7f';
    }
  }

  setActiveTab(tab: string): void {
    this.activeTab.set(tab);
  }

  // Toggle methods for card expansion
  toggleYearDetails(yearId: string): void {
    // Implementation for expanding year details
  }

  toggleSemesterDetails(semesterId: string): void {
    // Implementation for expanding semester details
  }

  toggleEvaluationTypeDetails(typeId: string): void {
    // Implementation for expanding evaluation type details
  }

  toggleClassDetails(classId: string): void {
    // Implementation for expanding class details
  }
}