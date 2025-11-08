import { CheckCircle2, XCircle } from 'lucide-react'

export default function Checklist({ result, loading }) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-3 bg-gray-200 rounded w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-gray-600">
        Your personalized checklist will appear here after analysis.
      </div>
    )
  }

  return (
    <section className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-4 sm:p-6 border-b bg-gradient-to-r from-violet-50 to-indigo-50">
        <h2 className="text-lg font-semibold text-gray-900 capitalize">Checklist for {result.job_title}</h2>
        <p className="text-xs text-gray-500">Matched skills: {result.matched_skills.join(', ') || '—'} | Missing: {result.missing_skills.join(', ') || '—'}</p>
      </div>
      <div className="p-4 sm:p-6">
        <ul className="space-y-3">
          {result.checklist.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <CheckCircle2 className="text-emerald-600 mt-0.5" size={18} />
              <span className="text-gray-800">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
