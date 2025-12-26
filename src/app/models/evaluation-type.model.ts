export interface EvaluationType {
  id: string;
  name: string;
  code: string; // e.g., "MID_TERM", "FINAL_EXAM"
  description?: string;
  
  // Default settings
  defaultDuration: number; // in minutes
  defaultPassingScore: number;
  defaultMaxAttempts: number;
  defaultQuestionCount: number;
  
  // Timing rules
  allowedDaysOfWeek: number[]; // 0 = Sunday, 1 = Monday, etc.
  minAdvanceNotice: number; // in hours
  maxDuration: number; // in minutes
  
  // Grading
  weight: number; // Percentage of final grade
  isGraded: boolean;
  includeInTranscript: boolean;
  
  // Question requirements
  requiredQuestionTypes: string[];
  minQuestionsPerType?: Record<string, number>;
  
  // Access rules
  allowedForClasses: string[];
  requiresProctoring: boolean;
  
  // Status
  isActive: boolean;
  isDefault: boolean;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}