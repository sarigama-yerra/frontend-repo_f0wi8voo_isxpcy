import { Briefcase } from 'lucide-react'

const presets = [
  'Software Engineer',
  'Data Scientist',
  'Product Manager',
  'UX Designer',
]

export default function JobSelector({ value, onChange }) {
  return (
    <section className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-4 sm:p-6 border-b bg-gradient-to-r from-cyan-50 to-emerald-50 flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center">
          <Briefcase size={18} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Desired Job</h2>
          <p className="text-xs text-gray-500">Pick a preset or type your own.</p>
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {presets.map((p) => (
            <button
              key={p}
              onClick={() => onChange(p)}
              className={`px-3 py-1.5 rounded-full border text-sm ${value === p ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white hover:bg-emerald-50 border-emerald-200 text-emerald-700'}`}
            >
              {p}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g., Machine Learning Engineer"
          className="w-full rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>
    </section>
  )
}
