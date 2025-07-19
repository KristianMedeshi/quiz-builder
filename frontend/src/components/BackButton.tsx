import { useRouter } from "next/navigation"

export default function BackButton() {
  const router = useRouter();

  return (
    <div className="bg-white/70 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <button
          onClick={() => router.back()}
          className="group inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-indigo-300 rounded-xl font-semibold text-gray-700 hover:text-indigo-600 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>
      </div>
    </div>
  )
}