export enum SentimentLabel {
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
  NEUTRAL = 'neutral',
  MIXED = 'mixed'
}

export interface SentimentAnalysis {
  id: string;
  responseId: string;
  questionId: string;
  studentId: string;
  quizId: string;
  
  // Text analysis
  text: string;
  cleanedText: string;
  
  // Sentiment scores (0-1)
  positiveScore: number;
  negativeScore: number;
  neutralScore: number;
  mixedScore: number;
  
  // Primary sentiment
  sentiment: SentimentLabel;
  confidence: number; // 0-1
  
  // Emotion detection
  emotions?: {
    joy: number;
    sadness: number;
    anger: number;
    fear: number;
    surprise: number;
  };
  
  // Key phrases/topics
  keyPhrases: string[];
  topics: string[];
  
  // Sentiment intensity
  intensity: number; // 0-1
  
  // Flagging
  isFlagged: boolean;
  flagReason?: string;
  requiresAttention: boolean;
  
  // Metadata
  analyzedAt: Date;
  analysisModel: string;
  processingTime: number; // in milliseconds
}

export interface SentimentSummary {
  totalResponses: number;
  sentimentDistribution: Record<SentimentLabel, number>;
  averageSentimentScore: number;
  flaggedResponses: number;
  commonTopics: Array<{
    topic: string;
    count: number;
    averageSentiment: number;
  }>;
  trendOverTime: Array<{
    date: string;
    averageSentiment: number;
    responseCount: number;
  }>;
}