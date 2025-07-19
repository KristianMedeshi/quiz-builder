'use client';

import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { createQuiz } from '../../services/api';
import { QuestionType, Quiz } from '@/types';
import CheckboxOptions from '@/components/CheckboxOptions';
import BackButton from '@/components/BackButton';
import { useMutation } from '@tanstack/react-query';

export default function CreateQuizPage() {
  const { register, control, handleSubmit, watch, setValue } = useForm<Quiz>({
    defaultValues: {
      title: '',
      questions: [{ text: '', type: 'BOOLEAN' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const router = useRouter();


  const createQuizMutation = useMutation({
    mutationFn: createQuiz,
    onSuccess: () => {
      router.push('/');
    },
    onError: () => {
      alert('Failed to create quiz');
    },
  });

  const onSubmit: SubmitHandler<Quiz> = (data) => {
    createQuizMutation.mutate(data);
  };

  const resetQuestionTypeFields = (index: number) => {
    setValue(`questions.${index}.correctBoolean`, undefined);
    setValue(`questions.${index}.correctAnswer`, '');
    setValue(`questions.${index}.options`, []);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <BackButton/>
      <div className="bg-white/70 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Create New Quiz
            </h1>
            <p className="text-xl text-gray-600">Design engaging questions for your audience</p>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Quiz Details</h2>
                <p className="text-gray-600">Give your quiz a compelling title</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-gray-700 font-semibold text-lg">Quiz Title</label>
              <input
                {...register('title', { required: true })}
                placeholder="Enter an engaging quiz title..."
                className="w-full border-2 border-gray-200 rounded-xl px-6 py-4 text-lg focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white/50 backdrop-blur-sm"
              />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Questions</h2>
                  <p className="text-gray-600">{fields.length} question{fields.length === 1 ? '' : 's'} added</p>
                </div>
              </div>
              
              <button
                type="button"
                onClick={() =>
                  append({ text: '', type: 'BOOLEAN', correctBoolean: undefined, correctAnswer: '', options: [] })
                }
                className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <svg className="w-5 h-5 transform group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Question
              </button>
            </div>

            <div className="space-y-6">
              {fields.map((field, index) => {
                const type = watch(`questions.${index}.type`);

                return (
                  <div
                    key={field.id}
                    className="group bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:border-indigo-200 hover:shadow-lg transition-all duration-500"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-lg flex items-center justify-center font-bold text-lg">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">Question {index + 1}</h3>
                          <p className="text-sm text-gray-500 capitalize">{type.toLowerCase()} question</p>
                        </div>
                      </div>
                      
                      <button
                        type="button"
                        className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
                        onClick={() => remove(index)}
                        aria-label={`Remove Question ${index + 1}`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-gray-700 font-semibold">Question Text</label>
                        <input
                          {...register(`questions.${index}.text` as const, { required: true })}
                          placeholder="Enter your question..."
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white/70"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-gray-700 font-semibold">Question Type</label>
                        <select
                          {...register(`questions.${index}.type` as const)}
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white/70"
                          onChange={(e) => {
                            const newType = e.target.value as QuestionType;
                            setValue(`questions.${index}.type`, newType);
                            resetQuestionTypeFields(index);
                          }}
                        >
                          <option value="BOOLEAN">Boolean (True/False)</option>
                          <option value="INPUT">Input (Short text)</option>
                          <option value="CHECKBOX">Checkbox (Multiple choice)</option>
                        </select>
                      </div>

                      {type === 'BOOLEAN' && (
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                          <label className="text-gray-700 font-semibold mb-3 block">Correct Answer</label>
                          <select
                            onChange={(e) =>
                              setValue(`questions.${index}.correctBoolean`, e.target.value === 'true')
                            }
                            defaultValue=""
                            className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white"
                          >
                            <option value="">Select the correct answer...</option>
                            <option value="true">True</option>
                            <option value="false">False</option>
                          </select>
                        </div>
                      )}

                      {type === 'INPUT' && (
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                          <label className="text-gray-700 font-semibold mb-3 block">Correct Answer</label>
                          <input
                            onChange={(e) => setValue(`questions.${index}.correctAnswer`, e.target.value)}
                            defaultValue={watch(`questions.${index}.correctAnswer`) || ''}
                            placeholder="Enter the correct answer..."
                            className="w-full border-2 border-green-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all duration-300 bg-white"
                          />
                        </div>
                      )}

                      {type === 'CHECKBOX' && (
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                          <CheckboxOptions nestIndex={index} control={control} register={register} />
                        </div>
                      )}
                    </div>

                    <div className="absolute -top-1 -right-1 w-12 h-12 bg-gradient-to-br from-indigo-100/30 to-purple-100/30 rounded-full blur-lg group-hover:blur-xl transition-all duration-500"></div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center pt-8">
            <button
              type="submit"
              className="group flex items-center gap-4 px-12 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <svg className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Create Quiz
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-teal-700 rounded-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left -z-10"></div>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}