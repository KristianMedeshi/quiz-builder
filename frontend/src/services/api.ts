import { Quiz } from '@/types';
import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface QuizSummary {
  id: number;
  title: string;
  _count: {
    questions: number;
  }
}

export interface DeleteResponse {
  message?: string;
}

export const createQuiz = (quizData: Quiz): Promise<Quiz> =>
  axios.post<Quiz>(`${API_BASE_URL}/quizzes`, quizData).then((res: AxiosResponse<Quiz>) => res.data);

export const getAllQuizzes = (): Promise<QuizSummary[]> =>
  axios.get<QuizSummary[]>(`${API_BASE_URL}/quizzes`).then((res: AxiosResponse<QuizSummary[]>) => res.data);

export const getQuizById = (id: number | string): Promise<Quiz> =>
  axios.get<Quiz>(`${API_BASE_URL}/quizzes/${id}`).then((res: AxiosResponse<Quiz>) => res.data);

export const deleteQuiz = (id: number | string): Promise<DeleteResponse> =>
  axios.delete<DeleteResponse>(`${API_BASE_URL}/quizzes/${id}`).then((res: AxiosResponse<DeleteResponse>) => res.data);
