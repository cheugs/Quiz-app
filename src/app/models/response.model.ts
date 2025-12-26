import { Quiz } from './quiz.model';
import { Student } from './student.model';
import { Question, QuestionType } from './question.model';

export enum ResponseStatus {
  IN_PROGRESS = 'in_progress',
  SUBMITTED = 'submitted',
  GRADED = 'graded',
  OVERDUE = 'overdue',
  INVALID = 'invalid'
}

export enum SubmissionMethod {
  ONLINE = 'online',
  OFFLINE = 'offline',
  API = 'api'
}

export interface QuizResponse {
  id: string;
  quizId: string;
  quiz?: Quiz; // Populated from API
  studentId: string;
  student?: Student; // Populated from API
  
  // Response details
  startedAt: Date;
  submittedAt?: Date;
  timeSpent?: number; // in seconds
  
  // Answers
  answers: QuestionAnswer[];
  
  // Grading
  score?: number;
  totalPoints?: number;
  percentage?: number;
  passed?: boolean;
  
  // Status
  status: ResponseStatus;
  submissionMethod: SubmissionMethod;
  isOfflineSync: boolean;
  
  // Device info
  deviceInfo?: {
    userAgent: string;
    platform: string;
    ipAddress?: string;
  };
  
  // Validation
  isValid: boolean;
  validationErrors?: string[];
  
  // Sentiment analysis (for open-ended)
  sentimentScore?: number;
  sentimentLabel?: string;
  
  createdAt: Date;
  updatedAt: Date;
}

export interface QuestionAnswer {
  questionId: string;
  question?: Question; // Populated from API
  questionText: string;
  questionType: QuestionType;
  points: number;
  
  // Answer based on type
  selectedOptionIds?: string[]; // For multiple choice
  textAnswer?: string; // For short answer/essay
  ratingValue?: number; // For rating scale
  matchingPairs?: Record<string, string>; // For matching
  fillBlankAnswers?: Record<string, string>; // For fill in blank
  
  // Grading
  isCorrect?: boolean;
  pointsAwarded?: number;
  feedback?: string;
  gradedBy?: string;
  gradedAt?: Date;
  
  // Time tracking
  timeSpent: number; // in seconds
}