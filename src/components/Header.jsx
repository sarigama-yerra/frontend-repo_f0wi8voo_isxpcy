import { Rocket, CheckCircle2 } from 'lucide-react'

export default function Header() {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-white to-cyan-100" />
      <div className="relative z-10 py-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg">
            <Rocket size={20} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Resume Tune-Up
          </h1>
        </div>
        <p className="text-gray-600 max-w-2xl">
          Paste your resume or upload a PDF, pick the role you want, and get a personalized checklist to optimize for applicant tracking systems and recruiters.
        </p>
        <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
          <span className="inline-flex items-center gap-2"><CheckCircle2 className="text-green-600" size={16}/> ATS-friendly tips</span>
          <span className="inline-flex items-center gap-2"><CheckCircle2 className="text-green-600" size={16}/> Skill gap highlights</span>
          <span className="inline-flex items-center gap-2"><CheckCircle2 className="text-green-600" size={16}/> Actionable checklist</span>
        </div>
      </div>
    </header>
  )
}
