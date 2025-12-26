import { Course } from './course.model';

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  TRUE_FALSE = 'true_false',
  SHORT_ANSWER = 'short_answer',
  ESSAY = 'essay',
  MATCHING = 'matching',
  FILL_BLANK = 'fill_blank',
  RATING_SCALE = 'rating_scale'
}

export enum DifficultyLevel {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  
  // Options for multiple choice/true-false
  options?: QuestionOption[];
  correctOptionIds?: string[]; // For multiple correct answers
  
  // For short answer/essay
  correctAnswer?: string;
  answerKey?: string; // For matching/fill blank
  
  // For rating scale
  ratingScale?: {
    min: number;
    max: number;
    labels?: string[];
  };
  
  // Metadata
  points: number;
  difficulty: DifficultyLevel;
  topic?: string;
  tags: string[];
  
  // Course association
  courseId: string;
  course?: Course; // Populated from API
  
  // Usage tracking
  usedInQuizIds: string[];
  usageCount: number;
  
  // Versioning
  version: number;
  previousVersionId?: string;
  
  // Auditing
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  lastUsedAt?: Date;
  
  // Explanation (for review)
  explanation?: string;
  
  // Media
  imageUrl?: string;
  audioUrl?: string;
  videoUrl?: string;
}

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
  order: number;
  explanation?: string;
}

export interface QuestionBankFilter {
  search?: string;
  courseIds?: string[];
  questionTypes?: QuestionType[];
  difficultyLevels?: DifficultyLevel[];
  tags?: string[];
  createdAfter?: Date;
  usedInQuiz?: boolean;
}