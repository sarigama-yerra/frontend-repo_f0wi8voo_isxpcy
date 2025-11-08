import { useState } from 'react'
import Header from './components/Header'
import ResumeInput from './components/ResumeInput'
import JobSelector from './components/JobSelector'
import Checklist from './components/Checklist'

function App() {
  const [job, setJob] = useState('Software Engineer')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const analyze = async ({ text, jobTitle, file, mode }) => {
    setLoading(true)
    try {
      const jt = jobTitle || job
      let data
      if (mode === 'file' && file) {
        const form = new FormData()
        form.append('job_title', jt)
        form.append('file', file)
        const res = await fetch(`${baseUrl}/analyze/upload`, { method: 'POST', body: form })
        data = await res.json()
      } else if (mode === 'both' && file) {
        // Combine file text with pasted text by sending text first, then merge client-side
        const form = new FormData()
        form.append('job_title', jt)
        form.append('file', file)
        const res1 = await fetch(`${baseUrl}/analyze/upload`, { method: 'POST', body: form })
        const uploadData = await res1.json()
        const res2 = await fetch(`${baseUrl}/analyze/text`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, job_title: jt, skills: [] }),
        })
        const textData = await res2.json()
        // Prefer broader checklist and union skills
        data = {
          ...uploadData,
          matched_skills: Array.from(new Set([...(uploadData.matched_skills||[]), ...(textData.matched_skills||[])])),
          missing_skills: Array.from(new Set([...(uploadData.missing_skills||[]), ...(textData.missing_skills||[])])),
          checklist: Array.from(new Set([...(uploadData.checklist||[]), ...(textData.checklist||[])])),
        }
      } else {
        const res = await fetch(`${baseUrl}/analyze/text`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, job_title: jt, skills: [] }),
        })
        data = await res.json()
      }
      setResult(data)
    } catch (e) {
      console.error(e)
      alert('Something went wrong while analyzing. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header />

        <div className="grid lg:grid-cols-3 gap-6 mt-2">
          <div className="lg:col-span-2 space-y-6">
            <ResumeInput onAnalyze={analyze} />
          </div>
          <div className="space-y-6">
            <JobSelector value={job} onChange={(v) => setJob(v)} />
            <Checklist result={result} loading={loading} />
          </div>
        </div>

        <footer className="mt-8 text-center text-xs text-gray-500">
          Built for you — make your resume shine for the role you want.
        </footer>
      </div>
    </div>
  )
}

export default App
