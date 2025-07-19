export type QuestionType = 'BOOLEAN' | 'INPUT' | 'CHECKBOX';

export interface Option {
  text: string;
  isCorrect?: boolean;
}

export interface Question {
  id?: number;
  text: string;
  type: QuestionType;
  correctBoolean?: boolean;
  correctAnswer?: string;
  options?: Option[];
}

export interface Quiz {
  id?: number;
  title: string;
  questions: Question[];
}