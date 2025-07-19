import { Quiz } from "@/types";
import { Control, useFieldArray, UseFormRegister } from "react-hook-form";

interface CheckboxOptionsProps {
  nestIndex: number;
  control: Control<Quiz>;
  register: UseFormRegister<Quiz>;
}

export default function CheckboxOptions({ nestIndex, control, register }: CheckboxOptionsProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${nestIndex}.options`,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800">Multiple Choice Options</h3>
          <p className="text-sm text-gray-600">{fields.length} option{fields.length === 1 ? '' : 's'} available</p>
        </div>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div 
            key={field.id} 
            className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 border-2 border-gray-200/50 hover:border-purple-300 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center font-semibold text-gray-700 text-sm">
                {String.fromCharCode(65 + index)}
              </div>
              
              <div className="flex-grow">
                <input
                  {...register(`questions.${nestIndex}.options.${index}.text`)}
                  placeholder={`Enter option ${String.fromCharCode(65 + index)}...`}
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 bg-white/70"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="group/checkbox flex items-center gap-2.5 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      {...register(`questions.${nestIndex}.options.${index}.isCorrect`)}
                      className="sr-only peer"
                    />
                    <div className="w-6 h-6 bg-white border-2 border-gray-300 rounded-md peer-checked:bg-gradient-to-br peer-checked:from-emerald-500 peer-checked:to-green-500 peer-checked:border-emerald-500 peer-focus:ring-4 peer-focus:ring-emerald-100 transition-all duration-300">
                      <svg className="w-4 h-4 text-white absolute top-0.5 left-0.5 opacity-0 peer-checked:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 group-hover/checkbox:text-emerald-600 transition-colors duration-200">
                    Correct
                  </span>
                </label>

                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
                  aria-label={`Remove option ${String.fromCharCode(65 + index)}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="absolute -top-1 -left-1 w-8 h-8 bg-gradient-to-br from-purple-100/30 to-pink-100/30 rounded-full blur-md group-hover:blur-lg transition-all duration-500 pointer-events-none"></div>
          </div>
        ))}
      </div>

      {fields.length === 0 && (
        <div className="text-center py-8 px-4 bg-gray-50/50 rounded-xl border-2 border-dashed border-gray-300">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">No options added yet</p>
          <p className="text-gray-400 text-sm">Click the button below to add your first option</p>
        </div>
      )}

      <div className="flex justify-center pt-2">
        <button
          type="button"
          onClick={() => append({ text: '', isCorrect: false })}
          className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
        >
          <svg className="w-5 h-5 transform hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Option
        </button>
      </div>
    </div>
  );
}